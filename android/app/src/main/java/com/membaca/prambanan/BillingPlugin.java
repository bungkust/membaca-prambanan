package com.membaca.prambanan;

import android.app.Activity;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.AcknowledgePurchaseResponseListener;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.ProductDetailsResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesResponseListener;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "Billing")
public class BillingPlugin extends Plugin implements PurchasesUpdatedListener {
    
    private static final String PLUGIN_ID = "Billing";

    private static final String TAG = "BillingPlugin";
    private static final String PREMIUM_PRODUCT_ID = "premium_unlock";
    
    private BillingClient billingClient;
    private PluginCall purchaseCall;
    private boolean isServiceConnected = false;

    @Override
    public void load() {
        super.load();
        initializeBilling();
    }

    @PluginMethod
    public void initialize(PluginCall call) {
        if (billingClient != null && isServiceConnected) {
            JSObject result = new JSObject();
            result.put("success", true);
            result.put("message", "Billing already initialized");
            call.resolve(result);
            return;
        }
        
        initializeBilling();
        JSObject result = new JSObject();
        result.put("success", true);
        call.resolve(result);
    }

    private void initializeBilling() {
        if (billingClient == null) {
            billingClient = BillingClient.newBuilder(getContext())
                    .setListener(this)
                    .enablePendingPurchases()
                    .build();
        }

        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                int responseCode = billingResult.getResponseCode();
                if (responseCode == BillingClient.BillingResponseCode.OK) {
                    isServiceConnected = true;
                    Log.d(TAG, "Billing service connected");
                } else {
                    isServiceConnected = false;
                    Log.e(TAG, "Billing service connection failed: " + billingResult.getDebugMessage());
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                isServiceConnected = false;
                Log.d(TAG, "Billing service disconnected");
                // Try to reconnect
                initializeBilling();
            }
        });
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject result = new JSObject();
        result.put("available", isServiceConnected);
        call.resolve(result);
    }

    @PluginMethod
    public void queryProducts(PluginCall call) {
        if (!isServiceConnected) {
            call.reject("Billing service not connected");
            return;
        }

        List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
        productList.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(PREMIUM_PRODUCT_ID)
                .setProductType(BillingClient.ProductType.INAPP)
                .build());

        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(productList)
                .build();

        billingClient.queryProductDetailsAsync(params, new ProductDetailsResponseListener() {
            @Override
            public void onProductDetailsResponse(BillingResult billingResult, List<ProductDetails> productDetailsList) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    JSObject result = new JSObject();
                    result.put("success", true);
                    
                    if (!productDetailsList.isEmpty()) {
                        ProductDetails productDetails = productDetailsList.get(0);
                        JSObject product = new JSObject();
                        product.put("productId", productDetails.getProductId());
                        product.put("title", productDetails.getTitle());
                        product.put("description", productDetails.getDescription());
                        
                        // Get price
                        String price = productDetails.getOneTimePurchaseOfferDetails() != null 
                            ? productDetails.getOneTimePurchaseOfferDetails().getFormattedPrice()
                            : "N/A";
                        product.put("price", price);
                        
                        result.put("product", product);
                    }
                    
                    call.resolve(result);
                } else {
                    call.reject("Failed to query products: " + billingResult.getDebugMessage());
                }
            }
        });
    }

    @PluginMethod
    public void purchase(PluginCall call) {
        if (!isServiceConnected) {
            call.reject("Billing service not connected");
            return;
        }

        purchaseCall = call;

        // Query product details first
        List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
        productList.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(PREMIUM_PRODUCT_ID)
                .setProductType(BillingClient.ProductType.INAPP)
                .build());

        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(productList)
                .build();

        billingClient.queryProductDetailsAsync(params, new ProductDetailsResponseListener() {
            @Override
            public void onProductDetailsResponse(BillingResult billingResult, List<ProductDetails> productDetailsList) {
                if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK || productDetailsList.isEmpty()) {
                    if (purchaseCall != null) {
                        purchaseCall.reject("Failed to get product details: " + billingResult.getDebugMessage());
                        purchaseCall = null;
                    }
                    return;
                }

                ProductDetails productDetails = productDetailsList.get(0);
                Activity activity = getActivity();

                if (activity == null) {
                    if (purchaseCall != null) {
                        purchaseCall.reject("Activity is null");
                        purchaseCall = null;
                    }
                    return;
                }

                // Launch purchase flow
                BillingFlowParams.Builder flowParamsBuilder = BillingFlowParams.newBuilder()
                        .setProductDetailsParamsList(
                                List.of(BillingFlowParams.ProductDetailsParams.newBuilder()
                                        .setProductDetails(productDetails)
                                        .build())
                        );

                BillingResult launchResult = billingClient.launchBillingFlow(activity, flowParamsBuilder.build());
                
                if (launchResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    if (purchaseCall != null) {
                        purchaseCall.reject("Failed to launch billing flow: " + launchResult.getDebugMessage());
                        purchaseCall = null;
                    }
                }
                // Purchase result will be handled in onPurchasesUpdated
            }
        });
    }

    @PluginMethod
    public void restorePurchases(PluginCall call) {
        if (!isServiceConnected) {
            call.reject("Billing service not connected");
            return;
        }

        QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
                .setProductType(BillingClient.ProductType.INAPP)
                .build();

        billingClient.queryPurchasesAsync(params, new PurchasesResponseListener() {
            @Override
            public void onQueryPurchasesResponse(BillingResult billingResult, List<Purchase> purchases) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    JSObject result = new JSObject();
                    
                    // Find premium purchase
                    for (Purchase purchase : purchases) {
                        if (purchase.getProducts().contains(PREMIUM_PRODUCT_ID)) {
                            result.put("success", true);
                            result.put("purchaseToken", purchase.getPurchaseToken());
                            result.put("orderId", purchase.getOrderId());
                            result.put("purchaseTime", purchase.getPurchaseTime());
                            call.resolve(result);
                            return;
                        }
                    }
                    
                    // No purchase found
                    result.put("success", false);
                    result.put("error", "No purchases found");
                    call.resolve(result);
                } else {
                    call.reject("Failed to query purchases: " + billingResult.getDebugMessage());
                }
            }
        });
    }

    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        int responseCode = billingResult.getResponseCode();
        
        if (responseCode == BillingClient.BillingResponseCode.OK && purchases != null) {
            for (Purchase purchase : purchases) {
                if (purchase.getProducts().contains(PREMIUM_PRODUCT_ID)) {
                    handlePurchase(purchase);
                }
            }
        } else if (responseCode == BillingClient.BillingResponseCode.USER_CANCELED) {
            if (purchaseCall != null) {
                purchaseCall.reject("User canceled the purchase");
                purchaseCall = null;
            }
        } else {
            if (purchaseCall != null) {
                purchaseCall.reject("Purchase failed: " + billingResult.getDebugMessage());
                purchaseCall = null;
            }
        }
    }

    private void handlePurchase(Purchase purchase) {
        // Acknowledge purchase (required for non-consumable products)
        if (!purchase.isAcknowledged()) {
            AcknowledgePurchaseParams acknowledgeParams = AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchase.getPurchaseToken())
                    .build();

            AcknowledgePurchaseResponseListener acknowledgeListener = new AcknowledgePurchaseResponseListener() {
                @Override
                public void onAcknowledgePurchaseResponse(BillingResult billingResult) {
                    if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                        Log.d(TAG, "Purchase acknowledged successfully");
                    } else {
                        Log.e(TAG, "Failed to acknowledge purchase: " + billingResult.getDebugMessage());
                    }
                }
            };

            billingClient.acknowledgePurchase(acknowledgeParams, acknowledgeListener);
        }

        // Return purchase result to JavaScript
        if (purchaseCall != null) {
            JSObject result = new JSObject();
            result.put("success", true);
            result.put("purchaseToken", purchase.getPurchaseToken());
            result.put("orderId", purchase.getOrderId());
            result.put("purchaseTime", purchase.getPurchaseTime());
            purchaseCall.resolve(result);
            purchaseCall = null;
        }
    }

    @Override
    public void handleOnDestroy() {
        if (billingClient != null) {
            billingClient.endConnection();
            billingClient = null;
        }
        super.handleOnDestroy();
    }
}


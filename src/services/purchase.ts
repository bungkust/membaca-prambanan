import { logger } from '@/utils/logger';
import { isNative } from '@/utils/platform';
import { setPremiumStatus } from './premium';
import { PREMIUM_PRODUCT_ID } from '@/types/premium';
import * as androidBilling from './billing-android';
import * as webBilling from './billing-web';

/**
 * Unified Purchase Service
 * 
 * Routes to platform-specific billing services:
 * - Android: Google Play Billing
 * - Web: Payment gateway or simulation
 */

export interface PurchaseResult {
  success: boolean;
  purchaseToken?: string;
  orderId?: string;
  error?: string;
}

/**
 * Initialize billing for current platform
 * Should be called when app starts (especially for Android)
 */
export async function initializeBilling(): Promise<boolean> {
  try {
    if (isNative()) {
      logger.log('Initializing Android billing...');
      const result = await androidBilling.initializeBilling();
      if (result) {
        // Query products to verify connection
        await androidBilling.queryProducts();
      }
      return result;
    } else {
      // Web billing doesn't need initialization
      return true;
    }
  } catch (error) {
    logger.error('Failed to initialize billing:', error);
    return false;
  }
}

/**
 * Purchase premium unlock
 * Routes to platform-specific billing
 */
export async function purchasePremium(): Promise<PurchaseResult> {
  try {
    logger.log('Purchase premium called, platform:', isNative() ? 'android' : 'web');
    let result: PurchaseResult;
    
    if (isNative()) {
      // Android: Google Play Billing
      logger.log('Using Android billing service');
      result = await androidBilling.purchasePremium();
    } else {
      // Web: Payment gateway or simulation
      logger.log('Using web billing service');
      result = await webBilling.purchasePremium();
    }
    
    logger.log('Purchase result:', result);
    
    // If purchase successful, update premium status
    if (result.success && result.purchaseToken) {
      const premiumStatus = {
        isPremium: true,
        purchaseDate: Date.now(),
        productId: PREMIUM_PRODUCT_ID,
        purchaseToken: result.purchaseToken,
        platform: isNative() ? 'android' : 'web' as 'android' | 'web'
      };
      
      setPremiumStatus(premiumStatus);
      logger.log('Premium status updated:', premiumStatus);
    } else {
      logger.warn('Purchase not successful, not updating premium status');
    }
    
    return result;
  } catch (error) {
    logger.error('Purchase failed with exception:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Purchase error: ${errorMessage}`
    };
  }
}

/**
 * Verify purchase
 * Routes to platform-specific verification
 */
export async function verifyPurchase(purchaseToken: string): Promise<boolean> {
  try {
    if (isNative()) {
      return await androidBilling.verifyPurchase(purchaseToken);
    } else {
      return await webBilling.verifyPurchase(purchaseToken);
    }
  } catch (error) {
    logger.error('Purchase verification failed:', error);
    return false;
  }
}

/**
 * Restore purchases
 * Routes to platform-specific restore
 */
export async function restorePurchases(): Promise<PurchaseResult> {
  try {
    let result: PurchaseResult;
    
    if (isNative()) {
      // Android: Query Play Store
      result = await androidBilling.restorePurchases();
    } else {
      // Web: Check localStorage
      result = await webBilling.restorePurchases();
    }
    
    // If restore successful, update premium status
    if (result.success && result.purchaseToken) {
      setPremiumStatus({
        isPremium: true,
        purchaseDate: Date.now(),
        productId: PREMIUM_PRODUCT_ID,
        purchaseToken: result.purchaseToken,
        platform: isNative() ? 'android' : 'web'
      });
      
      logger.log('Premium restored successfully');
    }
    
    return result;
  } catch (error) {
    logger.error('Restore purchases failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Check if billing is available
 */
export async function isBillingAvailable(): Promise<boolean> {
  if (isNative()) {
    return await androidBilling.isBillingAvailable();
  } else {
    return webBilling.isBillingAvailable();
  }
}


import { logger } from '@/utils/logger';
import { PREMIUM_PRODUCT_ID } from '@/types/premium';
import { Capacitor } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

/**
 * Android Billing Service
 * 
 * This service handles Google Play Billing integration for Android
 * using the native BillingPlugin Capacitor plugin.
 */

export interface PurchaseResult {
  success: boolean;
  purchaseToken?: string;
  orderId?: string;
  error?: string;
}

// Billing plugin interface
interface BillingPlugin {
  initialize(): Promise<{ success: boolean; message?: string }>;
  isAvailable(): Promise<{ available: boolean }>;
  queryProducts(): Promise<{ success: boolean; product?: any }>;
  purchase(): Promise<PurchaseResult>;
  restorePurchases(): Promise<PurchaseResult>;
}

// Get billing plugin instance
const getBillingPlugin = (): BillingPlugin | null => {
  try {
    if (Capacitor.isNativePlatform()) {
      const plugins = Capacitor.Plugins as any;
      if (plugins && plugins.Billing) {
        return plugins.Billing as BillingPlugin;
      } else {
        logger.warn('Billing plugin not found in Capacitor.Plugins. Available plugins:', Object.keys(plugins || {}));
        return null;
      }
    }
    return null;
  } catch (error) {
    logger.error('Error getting billing plugin:', error);
    return null;
  }
};

/**
 * Initialize Google Play Billing
 * This should be called when the app starts
 */
export async function initializeBilling(): Promise<boolean> {
  try {
    const plugin = getBillingPlugin();
    if (!plugin) {
      logger.warn('Billing plugin not available (not on native platform or plugin not registered)');
      return false;
    }

    try {
      const result = await plugin.initialize();
      logger.log('Billing initialized:', result);
      return result.success;
    } catch (initError) {
      logger.error('Billing initialization error:', initError);
      // Return false but don't throw - app can still work without billing
      return false;
    }
  } catch (error) {
    logger.error('Failed to initialize billing:', error);
    return false;
  }
}

/**
 * Query available products
 */
export async function queryProducts(): Promise<boolean> {
  try {
    const plugin = getBillingPlugin();
    if (!plugin) {
      logger.warn('Billing plugin not available');
      return false;
    }

    const result = await plugin.queryProducts();
    if (result.success && result.product) {
      logger.log('Product details:', result.product);
      return true;
    }
    return false;
  } catch (error) {
    logger.error('Failed to query products:', error);
    return false;
  }
}

/**
 * Launch purchase flow for premium unlock
 */
export async function purchasePremium(): Promise<PurchaseResult> {
  try {
    const plugin = getBillingPlugin();
    if (!plugin) {
      logger.warn('Billing plugin not available');
      return {
        success: false,
        error: 'Billing tidak tersedia. Pastikan aplikasi diinstall dari Google Play Store atau gunakan versi web.'
      };
    }

    // Check if billing is available
    try {
      const available = await plugin.isAvailable();
      if (!available || !available.available) {
        return {
          success: false,
          error: 'Layanan billing belum terhubung. Pastikan koneksi internet aktif dan coba lagi.'
        };
      }
    } catch (error) {
      logger.warn('Failed to check billing availability:', error);
      // Continue anyway, let the purchase flow handle it
    }

    logger.log('Launching purchase flow...');
    const result = await plugin.purchase();
    
    if (result.success) {
      logger.log('Purchase successful:', result);
    } else {
      logger.warn('Purchase failed:', result.error);
    }
    
    return result;
  } catch (error) {
    logger.error('Purchase failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Gagal memulai pembelian: ${errorMessage}. Pastikan aplikasi terhubung ke internet dan coba lagi.`
    };
  }
}

/**
 * Verify purchase with Google Play
 * This should verify the purchase token server-side for security
 */
export async function verifyPurchase(purchaseToken: string): Promise<boolean> {
  try {
    // TODO: Verify purchase with Google Play API
    // This should ideally be done server-side
    logger.log('Verify purchase - requires server-side implementation');
    return false;
  } catch (error) {
    logger.error('Purchase verification failed:', error);
    return false;
  }
}

/**
 * Restore purchases
 * Query Play Store for existing purchases
 */
export async function restorePurchases(): Promise<PurchaseResult> {
  try {
    const plugin = getBillingPlugin();
    if (!plugin) {
      logger.warn('Billing plugin not available');
      return {
        success: false,
        error: 'Billing not available on this platform'
      };
    }

    logger.log('Restoring purchases...');
    const result = await plugin.restorePurchases();
    
    if (result.success) {
      logger.log('Purchase restored:', result);
    } else {
      logger.log('No purchases found to restore');
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
  try {
    const plugin = getBillingPlugin();
    if (!plugin) {
      return false;
    }

    const result = await plugin.isAvailable();
    return result.available;
  } catch (error) {
    logger.error('Failed to check billing availability:', error);
    return false;
  }
}


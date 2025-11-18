import { Capacitor } from '@capacitor/core';
import { logger } from './logger';

// Cache platform detection for performance
let _isNative: boolean | null = null;
let _platform: string | null = null;
let _isValidated: boolean = false;

/**
 * Validate that Capacitor is properly initialized
 */
const validateCapacitor = (): boolean => {
  try {
    // Check if Capacitor object exists and has required methods
    if (typeof Capacitor === 'undefined' || !Capacitor) {
      return false;
    }
    if (typeof Capacitor.isNativePlatform !== 'function') {
      return false;
    }
    if (typeof Capacitor.getPlatform !== 'function') {
      return false;
    }
    return true;
  } catch (error) {
    logger.warn('Capacitor validation failed:', error);
    return false;
  }
};

/**
 * Reset platform detection cache (useful for testing or re-initialization)
 */
export const resetPlatformCache = (): void => {
  _isNative = null;
  _platform = null;
  _isValidated = false;
  logger.debug('Platform cache reset');
};

/**
 * Check if running in native Capacitor environment (memoized)
 */
export const isNative = (): boolean => {
  if (_isNative === null) {
    // Validate Capacitor before using it
    if (!_isValidated) {
      _isValidated = validateCapacitor();
    }
    
    if (!_isValidated) {
      // Capacitor not available or not properly initialized
      _isNative = false;
      logger.debug('Capacitor not available, defaulting to web platform');
      return _isNative;
    }
    
    try {
      _isNative = Capacitor.isNativePlatform();
      logger.debug('Platform detection:', { isNative: _isNative });
    } catch (error) {
      // Fallback if Capacitor not initialized
      logger.warn('Error detecting native platform, defaulting to web:', error);
      _isNative = false;
    }
  }
  return _isNative;
};

/**
 * Get current platform name (memoized)
 */
const getPlatformInternal = (): string => {
  if (_platform === null) {
    // Validate Capacitor before using it
    if (!_isValidated) {
      _isValidated = validateCapacitor();
    }
    
    if (!_isValidated) {
      // Capacitor not available, default to web
      _platform = 'web';
      return _platform;
    }
    
    try {
      _platform = Capacitor.getPlatform();
      logger.debug('Platform name:', _platform);
    } catch (error) {
      logger.warn('Error getting platform name, defaulting to web:', error);
      _platform = 'web';
    }
  }
  return _platform;
};

/**
 * Check if running on Android platform
 */
export const isAndroid = (): boolean => {
  return getPlatformInternal() === 'android';
};

/**
 * Check if running on iOS platform
 */
export const isIOS = (): boolean => {
  return getPlatformInternal() === 'ios';
};

/**
 * Check if running in web browser
 */
export const isWeb = (): boolean => {
  return getPlatformInternal() === 'web';
};

/**
 * Get current platform name
 */
export const getPlatform = (): string => {
  return getPlatformInternal();
};


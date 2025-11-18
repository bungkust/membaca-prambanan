import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { logger } from './logger';

// Cache plugin availability check
let _pluginAvailable: boolean | null = null;

/**
 * Check if TextToSpeech plugin is available
 */
const isPluginAvailable = (): boolean => {
  if (_pluginAvailable === null) {
    try {
      // Check if TextToSpeech object exists and has required methods
      _pluginAvailable = typeof TextToSpeech !== 'undefined' && 
                        TextToSpeech !== null &&
                        typeof TextToSpeech.speak === 'function' &&
                        typeof TextToSpeech.stop === 'function';
      
      if (!_pluginAvailable) {
        logger.warn('TextToSpeech plugin not available');
      }
    } catch (error) {
      logger.warn('Error checking TextToSpeech plugin availability:', error);
      _pluginAvailable = false;
    }
  }
  return _pluginAvailable;
};

/**
 * Native TTS wrapper for Capacitor
 * Provides async TTS functionality for Android/iOS
 * Falls back gracefully if plugin is not available
 */
export const speakNative = async (
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    language?: string;
  }
): Promise<void> => {
  // Check plugin availability first
  if (!isPluginAvailable()) {
    const error = new Error('TextToSpeech plugin not available');
    logger.error('Native TTS plugin not available, cannot speak:', text);
    throw error;
  }

  try {
    await TextToSpeech.speak({
      text,
      lang: options?.language || 'id-ID',
      rate: options?.rate || 0.8,
      pitch: options?.pitch || 1.1,
      volume: options?.volume || 0.9,
    });
  } catch (error) {
    logger.error('Native TTS error:', error);
    throw error;
  }
};

/**
 * Stop native TTS
 * Falls back gracefully if plugin is not available
 */
export const stopNativeSpeech = async (): Promise<void> => {
  // Check plugin availability first
  if (!isPluginAvailable()) {
    logger.debug('TextToSpeech plugin not available, cannot stop speech');
    return;
  }

  try {
    await TextToSpeech.stop();
  } catch (error) {
    logger.error('Stop native TTS error:', error);
    // Don't throw, just log - stopping is best effort
  }
};


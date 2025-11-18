import { isNative } from './platform';
import { speakNative, stopNativeSpeech } from './tts-native';
import { logger } from './logger';

let currentSpeech: SpeechSynthesisUtterance | null = null;

/**
 * Get voices with retry mechanism (handles race condition when voices not loaded yet)
 * Properly cleans up event listeners to prevent memory leaks
 */
const getVoicesWithRetry = (maxRetries = 3, delay = 100): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let voicesChangedHandler: (() => void) | null = null;
    let isResolved = false;
    
    const cleanup = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (voicesChangedHandler !== null) {
        window.speechSynthesis.onvoiceschanged = null;
        voicesChangedHandler = null;
      }
    };
    
    const resolveOnce = (voices: SpeechSynthesisVoice[]) => {
      if (!isResolved) {
        isResolved = true;
        cleanup();
        resolve(voices);
      }
    };
    
    const tryGetVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 || attempts >= maxRetries) {
        resolveOnce(voices);
        return;
      }
      
      attempts++;
      timeoutId = setTimeout(tryGetVoices, delay);
    };
    
    // If voices are already loaded, return immediately
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolveOnce(voices);
      return;
    }
    
    // Wait for voices to load with proper cleanup
    voicesChangedHandler = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      if (loadedVoices.length > 0) {
        resolveOnce(loadedVoices);
      }
    };
    window.speechSynthesis.onvoiceschanged = voicesChangedHandler;
    
    // Fallback timeout
    timeoutId = setTimeout(() => {
      resolveOnce(window.speechSynthesis.getVoices());
    }, delay * maxRetries);
    
    tryGetVoices();
  });
};

/**
 * Speak text using TTS with retry mechanism
 * Uses native TTS on Capacitor platforms, Web Speech API on web
 * @param text - Text to speak
 * @param preferredVoice - Voice preference (web only, ignored on native)
 * @param retries - Number of retry attempts (default: 1)
 * @returns Promise that resolves when speech starts
 */
export const speak = async (text: string, preferredVoice?: string, retries = 1): Promise<void> => {
  // Validate input
  if (!text || text.trim().length === 0) {
    logger.warn('Empty text provided to speak()');
    return;
  }

  // Platform detection: use native TTS if on Capacitor
  if (isNative()) {
    try {
      await speakNative(text, {
        rate: 0.8,
        pitch: 1.1,
        volume: 0.9,
        language: 'id-ID'
      });
      return;
    } catch (error) {
      logger.error('Native TTS failed, falling back to web:', error);
      // Fall through to web TTS as fallback
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return speak(text, preferredVoice, retries - 1);
      }
    }
  }

  // Web Speech API (web platform or fallback)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      // Stop any ongoing speech
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      currentSpeech = new SpeechSynthesisUtterance(text);

      // Enhanced Indonesian language support
      currentSpeech.lang = 'id-ID';

      // Get voices with retry mechanism to handle loading race condition
      const voices = await getVoicesWithRetry();

      if (preferredVoice && preferredVoice !== 'auto') {
        // Use the specifically selected voice
        const selectedVoice = voices.find(voice => voice.name === preferredVoice);
        if (selectedVoice) {
          currentSpeech.voice = selectedVoice;
        }
      } else {
        // Auto-select best Indonesian voice
        const indonesianVoices = voices.filter(voice =>
          voice.lang.startsWith('id') || // Indonesian
          voice.lang.startsWith('ms') || // Malay (similar to Indonesian)
          voice.name.toLowerCase().includes('indonesia') ||
          voice.name.toLowerCase().includes('malay')
        );

        // Prefer female voice for children's content
        const femaleIndonesianVoices = indonesianVoices.filter(voice =>
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('zira') || // Microsoft Zira
          voice.name.toLowerCase().includes('hazel')   // Microsoft Hazel
        );

        // Use preferred voice if available, fallback to first Indonesian voice
        if (femaleIndonesianVoices.length > 0) {
          currentSpeech.voice = femaleIndonesianVoices[0];
        } else if (indonesianVoices.length > 0) {
          currentSpeech.voice = indonesianVoices[0];
        }
      }

      // Optimized settings for children's Indonesian content
      currentSpeech.rate = 0.8;  // Slightly slower for clarity
      currentSpeech.pitch = 1.1; // Slightly higher pitch for friendliness
      currentSpeech.volume = 0.9; // Good volume level

      window.speechSynthesis.speak(currentSpeech);
    } catch (error) {
      logger.error('Web Speech API error:', error);
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return speak(text, preferredVoice, retries - 1);
      }
      throw error;
    }
  } else {
    logger.warn('TTS not available on this platform');
    throw new Error('TTS not available');
  }
};

/**
 * Stop current speech
 * Works on both native and web platforms
 */
export const stopSpeech = async (): Promise<void> => {
  if (isNative()) {
    await stopNativeSpeech();
  } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }
};

/**
 * Get available Indonesian voices (web only)
 * Returns empty array on native platforms
 */
export const getIndonesianVoices = (): SpeechSynthesisVoice[] => {
  if (isNative()) {
    // Native TTS doesn't expose voice selection
    return [];
  }
  
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    return voices.filter(voice =>
      voice.lang.startsWith('id') ||
      voice.lang.startsWith('ms') ||
      voice.name.toLowerCase().includes('indonesia')
    );
  }
  return [];
};

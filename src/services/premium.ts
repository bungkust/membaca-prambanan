import { PremiumStatus, TrialStatus, TrialStatuses, PREMIUM_STORAGE_KEY, TRIAL_STORAGE_KEY, PREMIUM_QUIZ_TYPES, TRIAL_LIMIT_PER_QUIZ, isPremiumQuizType, QuizId } from '@/types/premium';
import { logger } from '@/utils/logger';
import { isNative } from '@/utils/platform';

/**
 * Check if user has premium
 */
export function isPremium(): boolean {
  // Temporarily unlock everything for freemium release
  return true;
  
  /* Original implementation
  try {
    const stored = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!stored) return false;
    
    const status: PremiumStatus = JSON.parse(stored);
    return status.isPremium === true;
  } catch (error) {
    logger.error('Error checking premium status:', error);
    return false;
  }
  */
}

/**
 * Get premium status
 */
export function getPremiumStatus(): PremiumStatus {
  try {
    const stored = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!stored) {
      return { isPremium: false };
    }
    return JSON.parse(stored);
  } catch (error) {
    logger.error('Error getting premium status:', error);
    return { isPremium: false };
  }
}

/**
 * Set premium status (after successful purchase)
 */
export function setPremiumStatus(status: PremiumStatus): void {
  try {
    localStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(status));
    logger.log('Premium status updated:', status);
  } catch (error) {
    logger.error('Error setting premium status:', error);
  }
}

/**
 * Initialize premium check (check with Play Billing on native)
 */
export async function initializePremium(): Promise<PremiumStatus> {
  if (isNative()) {
    // TODO: Check with Google Play Billing
    // For now, return stored status
    return getPremiumStatus();
  }
  
  // Web: Check stored status
  return getPremiumStatus();
}

/**
 * Restore purchases (for native and web)
 */
export async function restorePurchases(): Promise<boolean> {
  if (isNative()) {
    // TODO: Implement Google Play Billing restore
    logger.log('Restore purchases - native (not implemented yet)');
    // For now, check stored status as fallback
    const status = getPremiumStatus();
    return status.isPremium;
  }
  
  // Web: Check stored status from localStorage
  const status = getPremiumStatus();
  return status.isPremium;
}

/**
 * Get trial statuses for all premium quiz types
 */
export function getTrialStatuses(): TrialStatuses {
  try {
    const stored = localStorage.getItem(TRIAL_STORAGE_KEY);
    if (!stored) {
      return {};
    }
    return JSON.parse(stored);
  } catch (error) {
    logger.error('Error getting trial statuses:', error);
    return {};
  }
}

/**
 * Get trial count for specific quiz type
 */
export function getTrialCount(quizType: string): number {
  if (!isPremiumQuizType(quizType)) {
    return 0; // Not a premium quiz type
  }
  
  const statuses = getTrialStatuses();
  const status = statuses[quizType];
  return status?.count || 0;
}

/**
 * Increment trial count for a quiz type
 */
export function incrementTrialCount(quizType: string): void {
  if (!isPremiumQuizType(quizType)) {
    logger.warn(`Cannot increment trial for non-premium quiz type: ${quizType}`);
    return;
  }
  
  if (isPremium()) {
    logger.debug('User is premium, no need to track trial');
    return;
  }
  
  try {
    const statuses = getTrialStatuses();
    const currentCount = statuses[quizType]?.count || 0;
    
    statuses[quizType] = {
      quizType: quizType as QuizId,
      count: currentCount + 1,
      lastUsed: Date.now(),
    };
    
    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(statuses));
    logger.log(`Trial count incremented for ${quizType}: ${currentCount + 1}/${TRIAL_LIMIT_PER_QUIZ}`);
  } catch (error) {
    logger.error('Error incrementing trial count:', error);
  }
}

/**
 * Check if user can play premium quiz (trial available or premium)
 */
export function canPlayPremiumQuiz(quizType: string): boolean {
  if (!isPremiumQuizType(quizType)) {
    return true; // Free quiz types are always playable
  }
  
  if (isPremium()) {
    return true; // Premium users can play all
  }
  
  const trialCount = getTrialCount(quizType);
  return trialCount < TRIAL_LIMIT_PER_QUIZ;
}

/**
 * Get remaining trial sessions for a quiz type
 */
export function getRemainingTrialSessions(quizType: string): number {
  if (!isPremiumQuizType(quizType)) {
    return 0; // Not a premium quiz type
  }
  
  if (isPremium()) {
    return -1; // Unlimited for premium users
  }
  
  const trialCount = getTrialCount(quizType);
  return Math.max(0, TRIAL_LIMIT_PER_QUIZ - trialCount);
}

/**
 * Check if trial is exhausted for a quiz type
 */
export function isTrialExhausted(quizType: string): boolean {
  if (!isPremiumQuizType(quizType)) {
    return false; // Not a premium quiz type
  }
  
  if (isPremium()) {
    return false; // Premium users don't have trials
  }
  
  const trialCount = getTrialCount(quizType);
  return trialCount >= TRIAL_LIMIT_PER_QUIZ;
}

/**
 * Reset trial counts (for testing or admin purposes)
 */
export function resetTrialCounts(): void {
  try {
    localStorage.removeItem(TRIAL_STORAGE_KEY);
    logger.log('Trial counts reset');
  } catch (error) {
    logger.error('Error resetting trial counts:', error);
  }
}


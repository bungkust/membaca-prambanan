import { QuizId } from '@/features/quiz';

/**
 * Premium status stored in localStorage
 */
export interface PremiumStatus {
  isPremium: boolean;
  purchaseDate?: number; // Timestamp when purchased
  productId?: string; // Product ID from Play Store
  purchaseToken?: string; // Purchase token for verification (Android)
  platform?: 'android' | 'web'; // Platform where purchase was made
}

/**
 * Trial status per quiz type
 */
export interface TrialStatus {
  quizType: QuizId;
  count: number; // Number of sessions used
  lastUsed?: number; // Timestamp of last trial use
}

/**
 * All trial statuses
 */
export interface TrialStatuses {
  [quizType: string]: TrialStatus;
}

/**
 * Premium product configuration
 */
export const PREMIUM_PRODUCT_ID = 'premium_unlock';
export const PREMIUM_PRICE_IDR = 29999;

/**
 * Free version limits
 */
export const FREE_LIMITS = {
  MAX_QUESTIONS_PER_SESSION: 50, // Increased from 10
  MAX_TIMER_OPTIONS: [0, 5, 10, 15, 20], // All options available
  MAX_VISIBLE_HISTORY: 50, // Increased from 5
  VOICE_SELECTION: true, // Enable for all
  EXPORT_PROGRESS: true, // Enable for all
} as const;

/**
 * Premium features
 */
export const PREMIUM_FEATURES = {
  UNLIMITED_QUESTIONS: true,
  ADVANCED_TIMER: true, // 15s, 20s, custom
  CUSTOM_VOICE: true,
  EXPORT_PROGRESS: true,
  FUTURE_UPDATES: true,
  UNLIMITED_SESSIONS: true,
  FULL_HISTORY_ACCESS: true,
} as const;

/**
 * Quiz type categories
 * Free quiz types: unlimited sessions
 * Premium quiz types: 2 session trial per type
 */
export const FREE_QUIZ_TYPES: QuizId[] = [
  'suku_kata',
  'awal_kata',
  'akhir_kata',
  'lengkapi_suku_kata_belakang',
  'lengkapi_suku_kata_depan',
  'mengenal_suku_kata',
];

export const PREMIUM_QUIZ_TYPES: QuizId[] = [
  // Temporarily all quizzes are free
  // 'lengkapi_suku_kata_belakang',
  // 'lengkapi_suku_kata_depan',
  // 'mengenal_suku_kata',
];

/**
 * Trial limit per premium quiz type
 */
export const TRIAL_LIMIT_PER_QUIZ = 2;

/**
 * Storage keys
 */
export const PREMIUM_STORAGE_KEY = 'premium_status';
export const TRIAL_STORAGE_KEY = 'trial_statuses';

/**
 * Check if a quiz type is free
 */
export function isFreeQuizType(quizType: string): quizType is QuizId {
  return FREE_QUIZ_TYPES.includes(quizType as QuizId);
}

/**
 * Check if a quiz type is premium
 */
export function isPremiumQuizType(quizType: string): quizType is QuizId {
  return PREMIUM_QUIZ_TYPES.includes(quizType as QuizId);
}


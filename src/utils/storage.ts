import { z } from 'zod';
import { Settings, SessionHistory, AppState, Question, WrongAnswer } from '@/types/quiz';
import { logger } from './logger';

// Zod schemas for validation
const QuestionSchema = z.object({
  id: z.string(),
  type: z.string(),
  prompt: z.string().optional(),
  display: z.string(),
  ttsText: z.string(),
  answer: z.string(),
  choices: z.array(z.string()),
  level: z.string().optional(),
  image: z.string().optional(),
  word: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const WrongAnswerSchema = z.object({
  question: QuestionSchema,
  userAnswer: z.string(),
});

const SettingsSchema = z.object({
  questionsPerSession: z.number().min(1).max(100),
  rememberAcrossSessions: z.boolean(),
  timerSeconds: z.number().min(0).max(3600),
  selectedVoice: z.string().optional(),
});

const SessionHistorySchema = z.object({
  id: z.string(),
  quizType: z.string(),
  score: z.number().min(0),
  totalQuestions: z.number().min(1),
  timestamp: z.number(),
  wrongAnswers: z.array(WrongAnswerSchema),
  duration: z.number().min(0),
  stars: z.number().min(0).optional(),
});

const AppStateSchema = z.object({
  currentSession: z.array(QuestionSchema),
  currentQuestionIndex: z.number().min(0),
  score: z.number().min(0),
  wrongAnswers: z.array(WrongAnswerSchema),
  seenIds: z.custom<Set<string>>((val) => val instanceof Set),
  sessionHistory: z.array(SessionHistorySchema),
  currentSessionStart: z.number().nullable(),
  currentStars: z.number().min(0).optional(),
});

/**
 * Parse and validate data from localStorage with schema validation
 */
export function safeParseWithValidation<T>(
  raw: string | null,
  schema: z.ZodSchema<T>,
  fallback: T
): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    const result = schema.safeParse(parsed);
    if (result.success) {
      return result.data;
    } else {
      logger.warn('Schema validation failed:', result.error.errors);
      return fallback;
    }
  } catch (error) {
    logger.warn('Parse error:', error);
    return fallback;
  }
}

/**
 * Backward compatible safeParse - uses validation if schema provided
 */
export function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Parse Settings with validation
 */
export function safeParseSettings(raw: string | null, fallback: Settings): Settings {
  return safeParseWithValidation(raw, SettingsSchema, fallback);
}

/**
 * Parse SessionHistory with validation
 */
export function safeParseSessionHistory(raw: string | null, fallback: SessionHistory[]): SessionHistory[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item, index) => {
        const result = SessionHistorySchema.safeParse(item);
        if (result.success) {
          return result.data;
        } else {
          logger.warn(`Invalid session history item at index ${index}:`, result.error.errors);
          return null;
        }
      }).filter((item): item is SessionHistory => item !== null);
    }
    return fallback;
  } catch (error) {
    logger.warn('Parse error:', error);
    return fallback;
  }
}

/**
 * Parse AppState with validation
 * Note: seenIds Set needs special handling
 */
export function safeParseAppState(raw: string | null, fallback: AppState): AppState {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    // Convert seenIds array back to Set
    if (parsed.seenIds && Array.isArray(parsed.seenIds)) {
      parsed.seenIds = new Set(parsed.seenIds);
    }
    const result = AppStateSchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    } else {
      logger.warn('AppState validation failed:', result.error.errors);
      return fallback;
    }
  } catch (error) {
    logger.warn('Parse error:', error);
    return fallback;
  }
}

/**
 * LRU eviction: Remove oldest session history items when quota is exceeded
 */
function evictOldestHistory(maxItems: number = 50): void {
  try {
    const history = safeParseSessionHistory(localStorage.getItem('sessionHistory'), []);
    if (history.length > maxItems) {
      // Sort by timestamp (oldest first) and keep only the most recent
      const sorted = [...history].sort((a, b) => a.timestamp - b.timestamp);
      const kept = sorted.slice(-maxItems);
      localStorage.setItem('sessionHistory', JSON.stringify(kept));
      logger.warn(`Evicted ${history.length - maxItems} old session history items`);
    }
  } catch (error) {
    logger.error('Failed to evict history:', error);
    // Last resort: clear history if eviction fails
    localStorage.removeItem('sessionHistory');
  }
}

/**
 * Save to localStorage with error handling and quota management
 */
export function safeSet(key: string, value: unknown) {
  try {
    // Convert Set to Array for JSON serialization
    let serializableValue = value;
    if (value && typeof value === 'object' && 'seenIds' in value && value.seenIds instanceof Set) {
      serializableValue = {
        ...value,
        seenIds: Array.from(value.seenIds)
      };
    }
    localStorage.setItem(key, JSON.stringify(serializableValue));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      logger.error('localStorage quota exceeded for key:', key);
      
      // Try LRU eviction for session history
      if (key === 'sessionHistory' || (Array.isArray(value) && value.length > 50)) {
        evictOldestHistory(50);
        // Retry once after eviction
        try {
          localStorage.setItem(key, JSON.stringify(serializableValue));
          logger.log('Successfully saved after eviction');
        } catch (retryError) {
          logger.error('Still failed after eviction, clearing history');
          if (key === 'sessionHistory') {
            localStorage.removeItem('sessionHistory');
          }
          throw retryError;
        }
      } else {
        throw error;
      }
    } else {
      logger.warn('Failed to save to localStorage:', error);
    }
  }
}


import { Question } from "@/types/quiz";
import { shuffleArray as _shuffleArray } from './utils/shuffleArray';
import { logger } from "@/utils/logger";

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  return _shuffleArray(array);
}

// Re-export generator utilities for convenience
export * from './utils/generators';

/**
 * Validates if a question object is properly formed
 */
export function isValidQuestion(q: unknown): q is Question {
  if (!q || typeof q !== 'object') return false;
  
  const question = q as Partial<Question>;
  
  // Check required fields
  if (!question.id || typeof question.id !== 'string') return false;
  if (!question.answer || typeof question.answer !== 'string') return false;
  if (!Array.isArray(question.choices) || question.choices.length === 0) return false;
  if (typeof question.display === 'undefined') return false;
  if (typeof question.ttsText === 'undefined') return false;
  
  // Validate that answer is in choices
  if (!question.choices.includes(question.answer)) {
    logger.warn(`Question ${question.id} has answer "${question.answer}" not in choices:`, question.choices);
    return false;
  }
  
  return true;
}

/**
 * Filters and selects questions based on count and seen IDs
 */
export function filterAndSelectQuestions(
  allQuestions: Question[],
  count: number,
  seenIds: Set<string>
): Question[] {
  // Basic validation to drop malformed entries
  const validQuestions = allQuestions.filter(isValidQuestion);

  // Filter out seen questions if remember setting is enabled
  const availableQuestions = validQuestions.filter(q => !seenIds.has(q.id));

  // If not enough unseen questions, use all questions
  const questionsToUse = availableQuestions.length >= count 
    ? availableQuestions 
    : validQuestions;

  // Shuffle and select requested count
  const shuffled = shuffleArray(questionsToUse);
  return shuffled.slice(0, count);
}


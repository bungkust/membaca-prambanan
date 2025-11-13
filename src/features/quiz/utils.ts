import { Question } from "@/types/quiz";
import { shuffleArray as _shuffleArray } from './utils/shuffleArray';

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
export function isValidQuestion(q: any): q is Question {
  return (
    q &&
    typeof q.id === 'string' &&
    typeof q.answer === 'string' &&
    Array.isArray(q.choices) &&
    q.choices.length > 0 &&
    typeof q.display !== 'undefined'
  );
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


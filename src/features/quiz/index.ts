import { Question } from "@/types/quiz";
import { QUIZ_REGISTRY, getQuizDefinition, getAllQuizMetadata, QuizId } from './registry';
import { logger } from '@/utils/logger';

/**
 * Backward compatible function - generates questions for a quiz type
 * @deprecated Use getQuizDefinition(quizType).generateQuestions() for better type safety
 */
export function generateQuizQuestions(
  quizType: string,
  count: number,
  seenIds: Set<string>
): Question[] {
  const quiz = getQuizDefinition(quizType);
  if (!quiz || !quiz.generateQuestions) {
    logger.warn(`Quiz type "${quizType}" not found or does not generate questions`);
    return [];
  }
  return quiz.generateQuestions(count, seenIds);
}

// Export registry functions for UI components
export { getAllQuizMetadata, getQuizDefinition, QUIZ_REGISTRY };
export type { QuizId };

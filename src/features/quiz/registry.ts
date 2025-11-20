import { QuizDefinition, QuizMetadata } from './types';
import { logger } from '../../utils/logger';
import { getQuizDefinition as getSukuKata } from './sukuKata';
import { getQuizDefinition as getAwalKata } from './awalKata';
import { getQuizDefinition as getAkhirKata } from './akhirKata';
import { getQuizDefinition as getLengkapiSukuKataBelakang } from './lengkapiSukuKataBelakang';
import { getQuizDefinition as getLengkapiSukuKataDepan } from './lengkapiSukuKataDepan';
import { getQuizDefinition as getMengenalSukuKata } from './mengenalSukuKata';

/**
 * Quiz registry - single source of truth for all quiz types
 * To add a new quiz: import it and add to this object
 */
export const QUIZ_REGISTRY = {
  suku_kata: getSukuKata(),
  awal_kata: getAwalKata(),
  akhir_kata: getAkhirKata(),
  lengkapi_suku_kata_belakang: getLengkapiSukuKataBelakang(),
  lengkapi_suku_kata_depan: getLengkapiSukuKataDepan(),
  mengenal_suku_kata: getMengenalSukuKata(),
} as const;

/**
 * Type-safe quiz ID - auto-generated from registry keys
 */
export type QuizId = keyof typeof QUIZ_REGISTRY;

/**
 * Get quiz definition by ID
 */
export function getQuizDefinition(id: string): QuizDefinition | undefined {
  if (!isValidQuizId(id)) {
    logger.warn(`Quiz type "${id}" not found in registry`);
    return undefined;
  }
  return QUIZ_REGISTRY[id];
}

/**
 * Get all quiz metadata for UI display
 */
export function getAllQuizMetadata(): QuizMetadata[] {
  return Object.values(QUIZ_REGISTRY).map(q => q.metadata);
}

/**
 * Get all registered quiz IDs
 */
export function getQuizIds(): QuizId[] {
  return Object.keys(QUIZ_REGISTRY) as QuizId[];
}

/**
 * Check if quiz is a special type (doesn't generate questions)
 */
export function isSpecialQuiz(id: string): boolean {
  const quiz = getQuizDefinition(id);
  return quiz?.metadata.isSpecial === true;
}

/**
 * Validate if quiz ID exists in registry
 */
export function isValidQuizId(id: string): id is QuizId {
  return id in QUIZ_REGISTRY;
}


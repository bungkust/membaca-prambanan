import { QuizDefinition } from '../types';
import { metadata } from './metadata';
import { generateLengkapiSukuKataDepanQuestions } from './generator';
import { filterAndSelectQuestions } from '../utils';

const lengkapiSukuKataBelakangQuiz: QuizDefinition = {
  metadata,
  generateQuestions: (count: number, seenIds: Set<string>) => {
    const allQuestions = generateLengkapiSukuKataDepanQuestions();
    return filterAndSelectQuestions(allQuestions, count, seenIds);
  },
};

export function getQuizDefinition(): QuizDefinition {
  return lengkapiSukuKataBelakangQuiz;
}

export default lengkapiSukuKataBelakangQuiz;


import { QuizId } from '@/features/quiz';

/**
 * Question type includes QuizId from registry plus 'read_syllable' for backward compatibility
 * 'read_syllable' is used by suku_kata quiz
 */
export type QuestionType = QuizId | 'read_syllable';

export interface Question {
  id: string;
  type: QuestionType;
  prompt?: string;
  display: string;
  ttsText: string;
  answer: string;
  choices: string[];
  level?: string;
  image?: string;
  word?: string;
  tags?: string[];
}

export interface Settings {
  questionsPerSession: number;
  rememberAcrossSessions: boolean;
  timerSeconds: number;
  selectedVoice?: string; // TTS voice preference
}

export interface WrongAnswer {
  question: Question;
  userAnswer: string;
}

export interface SessionHistory {
  id: string;
  quizType: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
  wrongAnswers: WrongAnswer[];
  duration: number;
  stars?: number; // Stars earned in this session
}

export interface AppState {
  currentSession: Question[];
  currentQuestionIndex: number;
  score: number;
  wrongAnswers: WrongAnswer[];
  seenIds: Set<string>;
  sessionHistory: SessionHistory[];
  currentSessionStart: number | null;
  currentStars?: number; // Stars earned in current session
}

export interface Question {
  id: string;
  type: 'read_syllable' | 'awal_kata' | 'akhir_kata' | 'tengah_kata' | 'lengkapi_suku_kata' | 'lengkapi_suku_kata_belakang';
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
}

export interface AppState {
  currentSession: Question[];
  currentQuestionIndex: number;
  score: number;
  wrongAnswers: WrongAnswer[];
  seenIds: Set<string>;
  sessionHistory: SessionHistory[];
  currentSessionStart: number | null;
}

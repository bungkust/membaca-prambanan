import { Question } from "@/types/quiz";
import { generateQuizQuestions } from "./index";

export function generateQuestions(count: number, seenIds: Set<string>): Question[] {
  return generateQuizQuestions('awal_kata', count, seenIds);
}


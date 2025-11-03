import { Question } from "@/types/quiz";
import * as Legacy from "@/utils/quizData";

export function generateQuizQuestions(
  quizType: string,
  count: number,
  seenIds: Set<string>
): Question[] {
  // Delegate to legacy implementation to preserve behavior.
  return Legacy.generateQuizQuestions(quizType, count, seenIds);
}

export { generateQuestions as generateSukuKata } from "./sukuKata";
export { generateQuestions as generateAwalKata } from "./awalKata";
export { generateQuestions as generateAkhirKata } from "./akhirKata";
export { generateQuestions as generateTengahSukuKata } from "./tengahSukuKata";
export { generateQuestions as generateLengkapiSukuKata } from "./lengkapiSukuKata";
export { generateQuestions as generateLengkapiSukuKataBelakang } from "./lengkapiSukuKataBelakang";


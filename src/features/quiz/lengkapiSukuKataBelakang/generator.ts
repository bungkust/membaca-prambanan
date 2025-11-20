import { Question } from "@/types/quiz";
import { shuffleArray } from '../utils';
import { lengkapiSukuKataBelakangData } from "./data";

export function generateLengkapiSukuKataBelakangQuestions(): Question[] {
  return lengkapiSukuKataBelakangData
    .filter(item => item.id && item.display && item.answer && item.choices && Array.isArray(item.choices))
    .map(item => {
      // Double-check choices is an array before using it
      const choices = Array.isArray(item.choices) ? item.choices : [];
      return {
        id: item.id!,
        type: 'lengkapi_suku_kata_belakang' as const,
        prompt: 'Lengkapi kata belakang dengan suku kata yang tepat',
        display: item.display!,
        ttsText: item.id!,
        answer: item.answer!,
        choices: shuffleArray(choices),
        image: item.image,
        word: item.id!,
        level: 'mudah' as const,
        tags: ['lengkapi_suku_kata_belakang'] as const
      };
    });
}


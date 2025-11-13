import { Question } from "@/types/quiz";
import { shuffleArray } from '../utils';
import { awalKataData } from './data';

export function generateAwalKataQuestions(): Question[] {
  return awalKataData.map(item => ({
    id: item.id.toLowerCase(),
    type: 'awal_kata' as const,
    prompt: 'Tebak huruf awal dari kata yang didengar',
    display: '_' + item.id.slice(1).toLowerCase(),
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    tags: ['awal_kata']
  }));
}


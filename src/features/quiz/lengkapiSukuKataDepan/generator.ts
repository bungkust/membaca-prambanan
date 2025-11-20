import { Question } from "@/types/quiz";
import { shuffleArray } from '../utils';
import { lengkapiSukuKataDepanData } from './data';

export function generateLengkapiSukuKataDepanQuestions(): Question[] {
  return lengkapiSukuKataDepanData.map(item => ({
    id: item.id + '_belakang',
    type: 'lengkapi_suku_kata_depan' as const,
    prompt: 'Lengkapi bagian depan kata dengan suku kata yang tepat',
    display: item.display,
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    level: 'mudah',
    tags: ['lengkapi_suku_kata_depan']
  }));
}


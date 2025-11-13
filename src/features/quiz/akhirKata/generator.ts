import { Question } from "@/types/quiz";
import { shuffleArray } from '../utils';
import { awalKataData } from '../awalKata/data';

// Generate akhirKataData from awalKataData (sekarang untuk huruf awal)
const generateAkhirKataData = () => {
  return awalKataData.slice(0, 150).map(item => {
    const firstChar = item.id[0].toUpperCase();
    // Create unique choices by avoiding duplicates
    // Create a larger pool of potential distractors
    const allDistractors = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // Filter out the correct answer
    const availableDistractors = allDistractors.filter(opt => opt !== firstChar);
    // Shuffle and select 2 random distractors
    const shuffledDistractors = [...availableDistractors];
    for (let i = shuffledDistractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDistractors[i], shuffledDistractors[j]] = [shuffledDistractors[j], shuffledDistractors[i]];
    }
    const selectedDistractors = shuffledDistractors.slice(0, 2);
    // Combine correct answer with distractors and shuffle again
    const choices = [firstChar, ...selectedDistractors];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return {
      id: item.id,
      image: item.image,
      answer: firstChar,
      choices: choices
    };
  });
};

export function generateAkhirKataQuestions(): Question[] {
  const akhirKataData = generateAkhirKataData();
  return akhirKataData.map(item => ({
    id: item.id.toLowerCase() + '_akhir',
    type: 'akhir_kata' as const,
    prompt: 'Tebak huruf awal dari kata yang didengar',
    display: '_' + item.id.slice(1).toLowerCase(),
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    tags: ['akhir_kata']
  }));
}


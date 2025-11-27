import { Question } from "@/types/quiz";
import { shuffleArray } from '../utils';
import { awalKataData } from '../awalKata/data';

// Generate akhirKataData from awalKataData (untuk huruf akhir)
const generateAkhirKataData = () => {
  return awalKataData.slice(0, 150).map(item => {
    const lastChar = item.id[item.id.length - 1].toLowerCase();
    // Create unique choices by avoiding duplicates
    const allDistractors = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    // Filter out the correct answer
    const availableDistractors = allDistractors.filter(opt => opt !== lastChar);
    // Shuffle and select 2 random distractors using utility function
    const shuffledDistractors = shuffleArray(availableDistractors);
    const selectedDistractors = shuffledDistractors.slice(0, 2);
    // Combine correct answer with distractors and shuffle
    const choices = shuffleArray([lastChar, ...selectedDistractors]);
    return {
      id: item.id,
      image: item.image,
      answer: lastChar,
      choices: choices
    };
  });
};

export function generateAkhirKataQuestions(): Question[] {
  const akhirKataData = generateAkhirKataData();
  return akhirKataData.map(item => ({
    id: item.id.toLowerCase() + '_akhir',
    type: 'akhir_kata' as const,
    prompt: 'Tebak huruf akhir dari kata yang didengar',
    display: item.id.slice(0, -1).toLowerCase() + '_',
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    tags: ['akhir_kata']
  }));
}


import { Question } from "@/types/quiz";
import { shuffleArray } from '../utils';

/**
 * Generate Suku Kata questions (105 questions: 21 consonants × 5 vowels)
 */
export function generateSukaKataQuestions(): Question[] {
  const consonants = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
  const vowels = ['a','i','u','e','o'];
  const questions: Question[] = [];
  
  consonants.forEach(consonant => {
    vowels.forEach((vowel, vIndex) => {
      const syllable = consonant + vowel;
      const level = vIndex < 3 ? 'mudah' : (vIndex === 3 ? 'sedang' : 'sulit');
      const otherVowels = vowels.filter(v => v !== vowel).slice(0, 2);
      const wrongChoices = otherVowels.map(v => consonant + v);
      const allChoices = shuffleArray([syllable, ...wrongChoices]);
      
      questions.push({
        id: `${consonant.toLowerCase()}-${syllable.toLowerCase()}`,
        type: "read_syllable",
        prompt: "Tebak suku kata yang didengar",
        display: syllable,
        ttsText: syllable,
        answer: syllable,
        choices: allChoices,
        level: level,
        tags: ["konsonan+vokal", consonant, vowel.toUpperCase()]
      });
    });
  });
  
  return questions;
}


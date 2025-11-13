import { Question } from "@/types/quiz";
import { shuffleArray } from './shuffleArray';

/**
 * Generic quiz data item interface
 * Semua quiz data harus mengikuti interface ini
 */
export interface BaseQuizItem {
  id: string;
  answer: string;
  choices: string[];
  image?: string;
  display?: string;
  ttsText?: string;
  prompt?: string;
  level?: 'mudah' | 'sedang' | 'sulit';
  tags?: string[];
  word?: string;
}

/**
 * Configuration for creating quiz generator
 */
export interface QuizGeneratorConfig {
  quizType: string;
  defaultPrompt: string;
  getDisplay?: (item: BaseQuizItem) => string;
  getTtsText?: (item: BaseQuizItem) => string;
  getImage?: (item: BaseQuizItem) => string | undefined;
  getLevel?: (item: BaseQuizItem, index: number) => 'mudah' | 'sedang' | 'sulit';
  getTags?: (item: BaseQuizItem) => string[];
  transformItem?: (item: BaseQuizItem) => Partial<Question>;
}

/**
 * Creates a simple quiz generator from data array
 * Perfect for: Bahasa, Matematika, IPA, IPS, dll
 * 
 * @example
 * // Untuk quiz matematika sederhana
 * const generateMathQuestions = createQuizGenerator(
 *   mathData,
 *   {
 *     quizType: 'matematika_penjumlahan',
 *     defaultPrompt: 'Berapa hasil penjumlahan?',
 *     getDisplay: (item) => item.display || item.id,
 *     getTtsText: (item) => item.ttsText || item.display || item.id
 *   }
 * );
 */
export function createQuizGenerator<T extends BaseQuizItem>(
  data: T[],
  config: QuizGeneratorConfig
): () => Question[] {
  return (): Question[] => {
    return data.map((item, index) => {
      const display = config.getDisplay 
        ? config.getDisplay(item) 
        : item.display || item.id;
      
      const ttsText = config.getTtsText 
        ? config.getTtsText(item) 
        : item.ttsText || item.display || item.id;
      
      const image = config.getImage 
        ? config.getImage(item) 
        : item.image;
      
      const level = config.getLevel 
        ? config.getLevel(item, index) 
        : item.level || 'mudah';
      
      const tags = config.getTags 
        ? config.getTags(item) 
        : item.tags || [config.quizType];
      
      const baseQuestion: Question = {
        id: item.id.toLowerCase().replace(/\s+/g, '_'),
        type: config.quizType as any,
        prompt: item.prompt || config.defaultPrompt,
        display,
        ttsText,
        answer: item.answer,
        choices: shuffleArray(item.choices),
        level,
        image,
        tags,
        word: item.word || item.id
      };

      // Apply custom transformations if provided
      if (config.transformItem) {
        return { ...baseQuestion, ...config.transformItem(item) };
      }

      return baseQuestion;
    });
  };
}

/**
 * Helper untuk quiz matematika (angka)
 * Otomatis handle TTS untuk angka
 */
export function createMathQuizGenerator<T extends BaseQuizItem>(
  data: T[],
  quizType: string,
  prompt: string = 'Pilih jawaban yang benar'
): () => Question[] {
  return createQuizGenerator(data, {
    quizType,
    defaultPrompt: prompt,
    getDisplay: (item) => item.display || item.id,
    getTtsText: (item) => {
      // Convert numbers to Indonesian text for TTS
      const num = parseInt(item.id);
      if (!isNaN(num)) {
        return num.toString();
      }
      return item.ttsText || item.display || item.id;
    }
  });
}

/**
 * Helper untuk quiz bahasa (teks)
 * Optimized untuk quiz bahasa Indonesia
 */
export function createLanguageQuizGenerator<T extends BaseQuizItem>(
  data: T[],
  quizType: string,
  prompt: string = 'Pilih jawaban yang benar'
): () => Question[] {
  return createQuizGenerator(data, {
    quizType,
    defaultPrompt: prompt,
    getDisplay: (item) => item.display || item.id,
    getTtsText: (item) => item.ttsText || item.display || item.id
  });
}


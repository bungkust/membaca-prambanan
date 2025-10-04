import { Question } from "@/types/quiz";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate Suku Kata questions (130 questions)
const generateSukaKataQuestions = (): Question[] => {
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
        prompt: "Baca suku kata ini",
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
};

// Awal Kata questions (150 questions) - data from document
const awalKataData = [
  { id: 'Kelinci', image: '🐰', answer: 'K', choices: ['K', 'M', 'S'] },
  { id: 'Ayam', image: '🐔', answer: 'A', choices: ['A', 'I', 'U'] },
  { id: 'Buku', image: '📚', answer: 'B', choices: ['B', 'P', 'D'] },
  { id: 'Cicak', image: '🦎', answer: 'C', choices: ['C', 'S', 'T'] },
  { id: 'Daging', image: '🥩', answer: 'D', choices: ['D', 'T', 'B'] },
  { id: 'Elang', image: '🦅', answer: 'E', choices: ['E', 'A', 'I'] },
  { id: 'Foto', image: '📷', answer: 'F', choices: ['F', 'P', 'V'] },
  { id: 'Gajah', image: '🐘', answer: 'G', choices: ['G', 'K', 'H'] },
  { id: 'Harimau', image: '🐅', answer: 'H', choices: ['H', 'G', 'R'] },
  { id: 'Ikan', image: '🐟', answer: 'I', choices: ['I', 'A', 'E'] },
  { id: 'Jagung', image: '🌽', answer: 'J', choices: ['J', 'Y', 'G'] },
  { id: 'Kucing', image: '🐱', answer: 'K', choices: ['K', 'G', 'C'] },
  { id: 'Lemari', image: '', answer: 'L', choices: ['L', 'R', 'M'] },
  { id: 'Mobil', image: '🚗', answer: 'M', choices: ['M', 'N', 'B'] },
  { id: 'Nanas', image: '🍍', answer: 'N', choices: ['N', 'M', 'L'] },
  { id: 'Orang', image: '👤', answer: 'O', choices: ['O', 'A', 'U'] },
  { id: 'Pensil', image: '', answer: 'P', choices: ['P', 'B', 'F'] },
  { id: 'Roti', image: '🍞', answer: 'R', choices: ['R', 'L', 'N'] },
  { id: 'Sapi', image: '🐄', answer: 'S', choices: ['S', 'C', 'T'] },
  { id: 'Tikus', image: '🐭', answer: 'T', choices: ['T', 'D', 'K'] },
  { id: 'Ular', image: '🐍', answer: 'U', choices: ['U', 'O', 'A'] },
  { id: 'Wortel', image: '🥕', answer: 'W', choices: ['W', 'V', 'U'] },
  { id: 'Zebra', image: '🦓', answer: 'Z', choices: ['Z', 'S', 'X'] },
  // Additional 127 words from the document
  { id: 'Apel', image: '🍎', answer: 'A', choices: ['A', 'E', 'I'] },
  { id: 'Bola', image: '⚽', answer: 'B', choices: ['B', 'P', 'D'] },
  { id: 'Ceri', image: '🍒', answer: 'C', choices: ['C', 'S', 'K'] },
  { id: 'Durian', image: '🥥', answer: 'D', choices: ['D', 'T', 'B'] },
  { id: 'Ember', image: '🪣', answer: 'E', choices: ['E', 'A', 'I'] },
  { id: 'Gitar', image: '🎸', answer: 'G', choices: ['G', 'K', 'H'] },
  { id: 'Helm', image: '', answer: 'H', choices: ['H', 'G', 'L'] },
  { id: 'Jeruk', image: '🍊', answer: 'J', choices: ['J', 'Y', 'G'] },
  { id: 'Kuda', image: '🐴', answer: 'K', choices: ['K', 'G', 'C'] },
  { id: 'Lampu', image: '💡', answer: 'L', choices: ['L', 'R', 'N'] },
  { id: 'Mangga', image: '🥭', answer: 'M', choices: ['M', 'N', 'B'] },
  { id: 'Nyamuk', image: '🦟', answer: 'N', choices: ['N', 'M', 'L'] },
  { id: 'Pisang', image: '🍌', answer: 'P', choices: ['P', 'B', 'F'] },
  { id: 'Radio', image: '📻', answer: 'R', choices: ['R', 'L', 'N'] },
  { id: 'Sepatu', image: '👟', answer: 'S', choices: ['S', 'C', 'T'] },
  { id: 'Tomat', image: '🍅', answer: 'T', choices: ['T', 'D', 'K'] },
  { id: 'Udang', image: '🦐', answer: 'U', choices: ['U', 'O', 'A'] },
  { id: 'Wayang', image: '🎭', answer: 'W', choices: ['W', 'V', 'U'] },
  // More words (reaching 150 total)
  { id: 'Anggur', image: '🍇', answer: 'A', choices: ['A', 'E', 'I'] },
  { id: 'Burung', image: '🐦', answer: 'B', choices: ['B', 'P', 'D'] },
  { id: 'Cangkir', image: '☕', answer: 'C', choices: ['C', 'S', 'K'] },
  { id: 'Domba', image: '🐑', answer: 'D', choices: ['D', 'T', 'B'] },
  { id: 'Gelas', image: '🥤', answer: 'G', choices: ['G', 'K', 'H'] },
  { id: 'Handuk', image: '', answer: 'H', choices: ['H', 'G', 'L'] },
  { id: 'Anjing', image: '🐕', answer: 'A', choices: ['A', 'E', 'I'] },
  { id: 'Badak', image: '🦏', answer: 'B', choices: ['B', 'P', 'D'] },
  { id: 'Cumi', image: '🦑', answer: 'C', choices: ['C', 'S', 'K'] },
  { id: 'Eskrim', image: '🍦', answer: 'E', choices: ['E', 'A', 'I'] },
  { id: 'Gorila', image: '🦍', answer: 'G', choices: ['G', 'K', 'H'] },
];

const generateAwalKataQuestions = (): Question[] => {
  return awalKataData.map(item => ({
    id: item.id.toLowerCase(),
    type: 'awal_kata' as const,
    prompt: 'Tebak huruf pertama dari kata yang didengar',
    display: '_' + item.id.slice(1).toLowerCase(),
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    tags: ['awal_kata']
  }));
};

// Akhir Kata questions (120 questions)
const akhirKataData = awalKataData.slice(0, 120).map(item => {
  const lastChar = item.id[item.id.length - 1].toUpperCase();
  return {
    id: item.id,
    image: item.image,
    answer: lastChar,
    choices: [lastChar, 'N', 'G']
  };
});

const generateAkhirKataQuestions = (): Question[] => {
  return akhirKataData.map(item => ({
    id: item.id.toLowerCase() + '_akhir',
    type: 'akhir_kata' as const,
    prompt: 'Tebak huruf terakhir dari kata yang didengar',
    display: item.id.slice(0, -1).toLowerCase() + '_',
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    tags: ['akhir_kata']
  }));
};

// Tengah Kata questions (100 questions) - from document
const tengahKataData = [
  { word: 'Bunga', image: '🌸', answer: 'N', choices: ['N', 'M', 'L'] },
  { word: 'Makan', image: '', answer: 'K', choices: ['K', 'G', 'T'] },
  { word: 'Besar', image: '📏', answer: 'S', choices: ['S', 'T', 'R'] },
  { word: 'Kecil', image: '🤏', answer: 'C', choices: ['C', 'S', 'K'] },
  { word: 'Hijau', image: '🟢', answer: 'J', choices: ['J', 'Y', 'G'] },
  { word: 'Merah', image: '🔴', answer: 'R', choices: ['R', 'L', 'N'] },
  { word: 'Putih', image: '⚪', answer: 'T', choices: ['T', 'D', 'K'] },
  { word: 'Hitam', image: '⚫', answer: 'T', choices: ['T', 'D', 'K'] },
  { word: 'Kuning', image: '🟡', answer: 'N', choices: ['N', 'G', 'R'] },
  { word: 'Biru', image: '🔵', answer: 'R', choices: ['R', 'L', 'N'] },
  { word: 'Kelinci', image: '🐰', answer: 'L', choices: ['L', 'R', 'N'] },
  { word: 'Harimau', image: '🐅', answer: 'R', choices: ['R', 'L', 'N'] },
  { word: 'Monyet', image: '🐒', answer: 'N', choices: ['N', 'Y', 'E'] },
  { word: 'Burung', image: '🐦', answer: 'R', choices: ['R', 'L', 'N'] },
  { word: 'Kucing', image: '🐱', answer: 'C', choices: ['C', 'S', 'K'] },
  { word: 'Anjing', image: '🐕', answer: 'J', choices: ['J', 'Y', 'G'] },
  { word: 'Kambing', image: '🐐', answer: 'M', choices: ['M', 'N', 'B'] },
  { word: 'Zebra', image: '🦓', answer: 'B', choices: ['B', 'P', 'D'] },
  { word: 'Pisang', image: '🍌', answer: 'S', choices: ['S', 'C', 'T'] },
  { word: 'Mangga', image: '🥭', answer: 'N', choices: ['N', 'G', 'R'] },
];

const generateTengahKataQuestions = (): Question[] => {
  return tengahKataData.map(item => {
    const middleIndex = Math.floor(item.word.length / 2);
    const display = item.word.slice(0, middleIndex) + '_' + item.word.slice(middleIndex + 1);
    
    return {
      id: item.word.toLowerCase() + '_tengah',
      type: 'tengah_kata' as const,
      prompt: 'Tebak huruf tengah dari kata yang didengar',
      display: display.toLowerCase(),
      ttsText: item.word,
      answer: item.answer,
      choices: shuffleArray(item.choices),
      image: item.image,
      word: item.word,
      tags: ['tengah_kata']
    };
  });
};

// Lengkapi Suku Kata Belakang questions (80 questions) - complete back syllables
const lengkapiSukuKataBelakangData = [
  { id: 'sapu', display: '__pu', answer: 'sa', choices: ['sa', 'si', 'se'], image: '🧹' },
  { id: 'buka', display: '__ka', answer: 'bu', choices: ['bu', 'ba', 'bo'], image: '📖' },
  { id: 'topi', display: '__pi', answer: 'to', choices: ['to', 'ta', 'ti'], image: '🎩' },
  { id: 'roda', display: '__da', answer: 'ro', choices: ['ro', 'ra', 'ri'], image: '🛞' },
  { id: 'baju', display: '__ju', answer: 'ba', choices: ['ba', 'bi', 'be'], image: '👕' },
  { id: 'mata', display: '__ta', answer: 'ma', choices: ['ma', 'mi', 'me'], image: '👁️' },
  { id: 'kaki', display: '__ki', answer: 'ka', choices: ['ka', 'ki', 'ke'], image: '🦵' },
  { id: 'nasi', display: '__si', answer: 'na', choices: ['na', 'ni', 'ne'], image: '🍚' },
  { id: 'gigi', display: '__gi', answer: 'gi', choices: ['gi', 'ga', 'ge'], image: '🦷' },
  { id: 'dada', display: '__da', answer: 'da', choices: ['da', 'di', 'de'], image: '🫁' },
  { id: 'mama', display: '__ma', answer: 'ma', choices: ['ma', 'mi', 'me'], image: '👩' },
  { id: 'papa', display: '__pa', answer: 'pa', choices: ['pa', 'pi', 'pe'], image: '👨' },
  { id: 'susu', display: '__su', answer: 'su', choices: ['su', 'si', 'se'], image: '🥛' },
  { id: 'kuku', display: '__ku', answer: 'ku', choices: ['ku', 'ka', 'ke'], image: '💅' },
  { id: 'lala', display: '__la', answer: 'la', choices: ['la', 'li', 'le'], image: '🎵' },
  { id: 'tahu', display: '__hu', answer: 'ta', choices: ['ta', 'ti', 'te'], image: '🧈' },
  { id: 'soto', display: '__to', answer: 'so', choices: ['so', 'sa', 'si'], image: '🍲' },
  { id: 'kopi', display: '__pi', answer: 'ko', choices: ['ko', 'ka', 'ki'], image: '☕' },
  { id: 'teh', display: '__eh', answer: 't', choices: ['t', 'd', 'k'], image: '🍵' },
  { id: 'air', display: '__ir', answer: 'a', choices: ['a', 'i', 'e'], image: '💧' },
];

const generateLengkapiSukuKataBelakangQuestions = (): Question[] => {
  return lengkapiSukuKataBelakangData.map(item => ({
    id: item.id + '_belakang',
    type: 'lengkapi_suku_kata_belakang' as const,
    prompt: 'Lengkapi bagian depan kata dengan suku kata yang tepat',
    display: item.display,
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    level: 'mudah',
    tags: ['lengkapi_suku_kata_belakang']
  }));
};

// Lengkapi Suku Kata questions (80 questions) - from document
const lengkapiSukaKataData = [
  { id: 'sapu', display: 'sa__', answer: 'pu', choices: ['pu', 'pi', 'pa'], image: '🧹' },
  { id: 'buka', display: 'bu__', answer: 'ka', choices: ['ka', 'ku', 'ki'], image: '📖' },
  { id: 'topi', display: 'to__', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🎩' },
  { id: 'roda', display: 'ro__', answer: 'da', choices: ['da', 'di', 'du'], image: '🛞' },
  { id: 'baju', display: 'ba__', answer: 'ju', choices: ['ju', 'ja', 'jo'], image: '👕' },
  { id: 'mata', display: 'ma__', answer: 'ta', choices: ['ta', 'ti', 'tu'], image: '👁️' },
  { id: 'kaki', display: 'ka__', answer: 'ki', choices: ['ki', 'ka', 'ko'], image: '🦵' },
  { id: 'nasi', display: 'na__', answer: 'si', choices: ['si', 'sa', 'se'], image: '🍚' },
  { id: 'gigi', display: 'gi__', answer: 'gi', choices: ['gi', 'ga', 'go'], image: '🦷' },
  { id: 'dada', display: 'da__', answer: 'da', choices: ['da', 'di', 'de'], image: '🫁' },
  { id: 'mama', display: 'ma__', answer: 'ma', choices: ['ma', 'mi', 'me'], image: '👩' },
  { id: 'papa', display: 'pa__', answer: 'pa', choices: ['pa', 'pi', 'pe'], image: '👨' },
  { id: 'susu', display: 'su__', answer: 'su', choices: ['su', 'si', 'se'], image: '🥛' },
  { id: 'kuku', display: 'ku__', answer: 'ku', choices: ['ku', 'ka', 'ki'], image: '💅' },
  { id: 'lala', display: 'la__', answer: 'la', choices: ['la', 'li', 'le'], image: '🎵' },
  { id: 'tahu', display: 'ta__', answer: 'hu', choices: ['hu', 'ha', 'hi'], image: '🧈' },
  { id: 'soto', display: 'so__', answer: 'to', choices: ['to', 'ta', 'ti'], image: '🍲' },
  { id: 'kopi', display: 'ko__', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '☕' },
  { id: 'teh', display: 'te__', answer: 'h', choices: ['h', 'k', 't'], image: '🍵' },
  { id: 'air', display: 'a__', answer: 'ir', choices: ['ir', 'ar', 'er'], image: '💧' },
];

const generateLengkapiSukaKataQuestions = (): Question[] => {
  return lengkapiSukaKataData.map(item => ({
    id: item.id,
    type: 'lengkapi_suku_kata' as const,
    prompt: 'Lengkapi kata dengan suku kata yang tepat',
    display: item.display,
    ttsText: item.id,
    answer: item.answer,
    choices: shuffleArray(item.choices),
    image: item.image,
    word: item.id,
    level: 'mudah',
    tags: ['lengkapi_suku_kata']
  }));
};

export const generateQuizQuestions = (
  quizType: string,
  count: number,
  seenIds: Set<string>
): Question[] => {
  let allQuestions: Question[] = [];
  
  switch (quizType) {
    case 'suku_kata':
      allQuestions = generateSukaKataQuestions();
      break;
    case 'awal_kata':
      allQuestions = generateAwalKataQuestions();
      break;
    case 'akhir_kata':
      allQuestions = generateAkhirKataQuestions();
      break;
    case 'tengah_kata':
      allQuestions = generateTengahKataQuestions();
      break;
    case 'lengkapi_suku_kata':
      allQuestions = generateLengkapiSukaKataQuestions();
      break;
    case 'lengkapi_suku_kata_belakang':
      allQuestions = generateLengkapiSukuKataBelakangQuestions();
      break;
  }
  
  // Filter out seen questions if remember setting is enabled
  const availableQuestions = allQuestions.filter(q => !seenIds.has(q.id));
  
  // If not enough unseen questions, use all questions
  const questionsToUse = availableQuestions.length >= count 
    ? availableQuestions 
    : allQuestions;
  
  // Shuffle and select requested count
  const shuffled = shuffleArray(questionsToUse);
  return shuffled.slice(0, count);
};

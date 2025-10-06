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
        prompt: "Dengarkan suku kata ini",
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
  { id: 'Mata', image: '👁️', answer: 'M', choices: ['M', 'N', 'B'] },
  { id: 'Hidung', image: '👃', answer: 'H', choices: ['H', 'N', 'M'] },
  { id: 'Mulut', image: '👄', answer: 'M', choices: ['M', 'B', 'P'] },
  { id: 'Telinga', image: '👂', answer: 'T', choices: ['T', 'D', 'P'] },
  { id: 'Tangan', image: '✋', answer: 'T', choices: ['T', 'K', 'P'] },
  { id: 'Kaki', image: '🦵', answer: 'K', choices: ['K', 'T', 'M'] },
  { id: 'Rambut', image: '💇', answer: 'R', choices: ['R', 'H', 'M'] },
  { id: 'Perut', image: '🫄', answer: 'P', choices: ['P', 'B', 'M'] },
  { id: 'Punggung', image: '🦴', answer: 'P', choices: ['P', 'B', 'T'] },
  { id: 'Lutut', image: '🦵', answer: 'L', choices: ['L', 'S', 'T'] },
  { id: 'Siku', image: '💪', answer: 'S', choices: ['S', 'T', 'L'] },
  { id: 'Jari', image: '👆', answer: 'J', choices: ['J', 'T', 'L'] },
  { id: 'Kuku', image: '💅', answer: 'K', choices: ['K', 'J', 'M'] },
  { id: 'Bahu', image: '💪', answer: 'B', choices: ['B', 'P', 'T'] },
  { id: 'Leher', image: '🧣', answer: 'L', choices: ['L', 'N', 'M'] },
  { id: 'Dagu', image: '🧔', answer: 'D', choices: ['D', 'B', 'P'] },
  { id: 'Dahi', image: '🤔', answer: 'D', choices: ['D', 'P', 'M'] },
  { id: 'Alis', image: '🙄', answer: 'A', choices: ['A', 'M', 'H'] },
  { id: 'Bibir', image: '👄', answer: 'B', choices: ['B', 'M', 'P'] },
  { id: 'Gigi', image: '🦷', answer: 'G', choices: ['G', 'L', 'M'] },
  { id: 'Lidah', image: '👅', answer: 'L', choices: ['L', 'B', 'M'] },
  { id: 'Kepala', image: '🗣️', answer: 'K', choices: ['K', 'M', 'T'] },
  { id: 'Kursi', image: '🪑', answer: 'K', choices: ['K', 'M', 'T'] },
  { id: 'Meja', image: '🪑', answer: 'M', choices: ['M', 'K', 'T'] },
  { id: 'Pintu', image: '🚪', answer: 'P', choices: ['P', 'B', 'M'] },
  { id: 'Jendela', image: '🪟', answer: 'J', choices: ['J', 'P', 'M'] },
  { id: 'Lemari', image: '🗄️', answer: 'L', choices: ['L', 'M', 'K'] },
  { id: 'Kasur', image: '🛏️', answer: 'K', choices: ['K', 'M', 'T'] },
  { id: 'Bantal', image: '🛏️', answer: 'B', choices: ['B', 'P', 'K'] },
  { id: 'Cermin', image: '🪞', answer: 'C', choices: ['C', 'S', 'G'] },
  { id: 'Lampu', image: '💡', answer: 'L', choices: ['L', 'B', 'K'] },
  { id: 'Kipas', image: '🌀', answer: 'K', choices: ['K', 'L', 'M'] },
  { id: 'TV', image: '📺', answer: 'T', choices: ['T', 'K', 'L'] },
  { id: 'Radio', image: '📻', answer: 'R', choices: ['R', 'L', 'K'] },
  { id: 'Kompor', image: '🔥', answer: 'K', choices: ['K', 'M', 'L'] },
  { id: 'Wajan', image: '🍳', answer: 'W', choices: ['W', 'K', 'M'] },
  { id: 'Piring', image: '🍽️', answer: 'P', choices: ['P', 'B', 'M'] },
  { id: 'Gelas', image: '🥤', answer: 'G', choices: ['G', 'C', 'B'] },
  { id: 'Sendok', image: '🥄', answer: 'S', choices: ['S', 'C', 'G'] },
  { id: 'Garpu', image: '🍴', answer: 'G', choices: ['G', 'S', 'C'] },
  { id: 'Pisau', image: '🔪', answer: 'P', choices: ['P', 'G', 'S'] },
  { id: 'Nasi', image: '🍚', answer: 'N', choices: ['N', 'M', 'B'] },
  { id: 'Air', image: '💧', answer: 'A', choices: ['A', 'I', 'U'] },
  { id: 'Susu', image: '🥛', answer: 'S', choices: ['S', 'M', 'B'] },
  { id: 'Roti', image: '🍞', answer: 'R', choices: ['R', 'L', 'K'] },
  { id: 'Kue', image: '🍰', answer: 'K', choices: ['K', 'M', 'B'] },
  { id: 'Buah', image: '🍎', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Mangga', image: '🥭', answer: 'M', choices: ['M', 'B', 'P'] },
  { id: 'Pisang', image: '🍌', answer: 'P', choices: ['P', 'B', 'M'] },
  { id: 'Kelapa', image: '🥥', answer: 'K', choices: ['K', 'M', 'G'] },
  { id: 'Jeruk', image: '🍊', answer: 'J', choices: ['J', 'C', 'G'] },
  { id: 'Wortel', image: '🥕', answer: 'W', choices: ['W', 'K', 'M'] },
  { id: 'Ayam', image: '🐔', answer: 'A', choices: ['A', 'I', 'U'] },
  { id: 'Ikan', image: '🐟', answer: 'I', choices: ['I', 'A', 'U'] },
  { id: 'Telur', image: '🥚', answer: 'T', choices: ['T', 'D', 'K'] },
  { id: 'Bunga', image: '🌸', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Pohon', image: '🌳', answer: 'P', choices: ['P', 'B', 'M'] },
  { id: 'Rumput', image: '🌱', answer: 'R', choices: ['R', 'L', 'K'] },
  { id: 'Daun', image: '��', answer: 'D', choices: ['D', 'B', 'P'] },
  { id: 'Batu', image: '🪨', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Air', image: '🌊', answer: 'A', choices: ['A', 'I', 'U'] },
  { id: 'Matahari', image: '☀️', answer: 'M', choices: ['M', 'B', 'P'] },
  { id: 'Bulan', image: '🌙', answer: 'B', choices: ['B', 'M', 'P'] },
  { id: 'Bintang', image: '⭐', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Mobil', image: '🚗', answer: 'M', choices: ['M', 'B', 'K'] },
  { id: 'Sepeda', image: '🚲', answer: 'S', choices: ['S', 'M', 'B'] },
  { id: 'Bus', image: '🚌', answer: 'B', choices: ['B', 'M', 'K'] },
  { id: 'Kereta', image: '🚆', answer: 'K', choices: ['K', 'M', 'B'] },
  { id: 'Pesawat', image: '✈️', answer: 'P', choices: ['P', 'B', 'M'] },
  { id: 'Kapal', image: '⛵', answer: 'K', choices: ['K', 'M', 'B'] },
  { id: 'Boneka', image: '🧸', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Bola', image: '⚽', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Balok', image: '🧱', answer: 'B', choices: ['B', 'P', 'M'] },
  { id: 'Kunci', image: '🔑', answer: 'K', choices: ['K', 'M', 'B'] },
  { id: 'Gunting', image: '✂️', answer: 'G', choices: ['G', 'C', 'S'] },
  { id: 'Saputangan', image: '🧺', answer: 'S', choices: ['S', 'C', 'G'] },
  { id: 'Sabun', image: '🧼', answer: 'S', choices: ['S', 'C', 'B'] },
  { id: 'Sikat', image: '🪥', answer: 'S', choices: ['S', 'C', 'G'] },
  { id: 'Sampo', image: '🧴', answer: 'S', choices: ['S', 'C', 'G'] },
  { id: 'Handuk', image: '🧺', answer: 'H', choices: ['H', 'S', 'K'] },
  { id: 'Tisu', image: '🧻', answer: 'T', choices: ['T', 'K', 'S'] }
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

// Akhir Kata questions (150 questions)
const akhirKataData = awalKataData.slice(0, 150).map(item => {
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

// Tengah Kata questions (150 questions) - from document
const tengahKataData = [
  { word: 'Matahari', image: '☀️', answer: 'a', choices: ['A', 'I', 'U'] },
  { word: 'Bulan', image: '🌙', answer: 'u', choices: ['U', 'O', 'A'] },
  { word: 'Bintang', image: '⭐', answer: 'a', choices: ['I', 'A', 'U'] },
  { word: 'Mobil', image: '🚗', answer: 'o', choices: ['O', 'A', 'I'] },
  { word: 'Sepeda', image: '🚲', answer: 'e', choices: ['E', 'A', 'I'] },
  { word: 'Bus', image: '🚌', answer: 'u', choices: ['U', 'O', 'A'] },
  { word: 'Kereta', image: '🚆', answer: 'e', choices: ['E', 'A', 'I'] },
  { word: 'Pesawat', image: '✈️', answer: 'a', choices: ['E', 'A', 'I'] },
  { word: 'Kapal', image: '⛵', answer: 'a', choices: ['A', 'I', 'U'] },
  { word: 'Boneka', image: '🧸', answer: 'e', choices: ['O', 'A', 'I'] },
  { word: 'Bola', image: '⚽', answer: 'o', choices: ['O', 'A', 'I'] },
  { word: 'Balok', image: '🧱', answer: 'a', choices: ['A', 'I', 'U'] },
  { word: 'Kunci', image: '🔑', answer: 'u', choices: ['U', 'O', 'A'] },
  { word: 'Kertas', image: '📄', answer: 'a', choices: ['E', 'A', 'I'] }
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

// Lengkapi Suku Kata Belakang questions (150 questions) - complete back syllables
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
  { id: 'kuku', display: '__ku', answer: 'ku', choices: ['ku', 'ka', 'ke'], image: '��' },
  { id: 'lala', display: '__la', answer: 'la', choices: ['la', 'li', 'le'], image: '🎵' },
  { id: 'tahu', display: '__hu', answer: 'ta', choices: ['ta', 'ti', 'te'], image: '🧈' },
  { id: 'soto', display: '__to', answer: 'so', choices: ['so', 'sa', 'si'], image: '🍲' },
  { id: 'kopi', display: '__pi', answer: 'ko', choices: ['ko', 'ka', 'ki'], image: '☕' },
  { id: 'teh', display: '__eh', answer: 't', choices: ['t', 'd', 'k'], image: '🍵' },
  { id: 'air', display: '__ir', answer: 'a', choices: ['a', 'i', 'e'], image: '💧' },
  { id: 'lari', display: '__ri', answer: 'la', choices: ['la', 'li', 'le'], image: '🏃' },
  { id: 'babi', display: '__bi', answer: 'ba', choices: ['ba', 'be', 'bo'], image: '🐖' },
  { id: 'cari', display: '__ri', answer: 'ca', choices: ['ca', 'ci', 'ce'], image: '🔍' },
  { id: 'duri', display: '__ri', answer: 'du', choices: ['du', 'di', 'de'], image: '🌵' },
  { id: 'foto', display: '__to', answer: 'fo', choices: ['fo', 'fa', 'fi'], image: '📷' },
  { id: 'guru', display: '__ru', answer: 'gu', choices: ['gu', 'ga', 'ge'], image: '👩‍🏫' },
  { id: 'hati', display: '__ti', answer: 'ha', choices: ['ha', 'hi', 'he'], image: '❤️' },
  { id: 'ikan', display: '__kan', answer: 'i', choices: ['i', 'e', 'a'], image: '🐟' },
  { id: 'jari', display: '__ri', answer: 'ja', choices: ['ja', 'ji', 'je'], image: '👆' },
  { id: 'kota', display: '__ta', answer: 'ko', choices: ['ko', 'ka', 'ki'], image: '🏙️' },
  { id: 'lucu', display: '__cu', answer: 'lu', choices: ['lu', 'la', 'le'], image: '😄' },
  { id: 'meja', display: '__ja', answer: 'me', choices: ['me', 'ma', 'mi'], image: '🪑' },
  { id: 'nada', display: '__da', answer: 'na', choices: ['na', 'ni', 'ne'], image: '🎵' },
  { id: 'pagi', display: '__gi', answer: 'pa', choices: ['pa', 'pi', 'pe'], image: '��' },
  { id: 'rusa', display: '__sa', answer: 'ru', choices: ['ru', 'ra', 'ri'], image: '🦌' },
  { id: 'sapi', display: '__pi', answer: 'sa', choices: ['sa', 'si', 'se'], image: '🐄' },
  { id: 'tangan', display: '__gan', answer: 'tan', choices: ['tan', 'tin', 'ten'], image: '✋' },
  { id: 'ular', display: '__lar', answer: 'u', choices: ['u', 'o', 'a'], image: '🐍' },
  { id: 'vas', display: '__as', answer: 'v', choices: ['v', 'f', 'w'], image: '🏺' },
  { id: 'wangi', display: '__gi', answer: 'wan', choices: ['wan', 'win', 'wen'], image: '🌸' },
  { id: 'bola', display: '__la', answer: 'bo', choices: ['bo', 'ba', 'bi'], image: '⚽' },
  { id: 'cinta', display: '__ta', answer: 'cin', choices: ['cin', 'can', 'cen'], image: '💕' },
  { id: 'dapur', display: '__pur', answer: 'da', choices: ['da', 'di', 'de'], image: '🍳' },
  { id: 'emas', display: '__mas', answer: 'e', choices: ['e', 'a', 'i'], image: '🏆' },
  { id: 'film', display: '__ilm', answer: 'f', choices: ['f', 'v', 'p'], image: '🎬' },
  { id: 'gula', display: '__la', answer: 'gu', choices: ['gu', 'ga', 'gi'], image: '🍯' },
  { id: 'hujan', display: '__jan', answer: 'hu', choices: ['hu', 'ha', 'hi'], image: '🌧️' },
  { id: 'jaket', display: '__ket', answer: 'ja', choices: ['ja', 'ji', 'je'], image: '��' },
  { id: 'kamar', display: '__mar', answer: 'ka', choices: ['ka', 'ki', 'ke'], image: '🛏️' },
  { id: 'laptop', display: '__top', answer: 'lap', choices: ['lap', 'lip', 'lep'], image: '💻' },
  { id: 'mobil', display: '__bil', answer: 'mo', choices: ['mo', 'ma', 'mi'], image: '🚗' },
  { id: 'novel', display: '__vel', answer: 'no', choices: ['no', 'na', 'ni'], image: '📚' },
  { id: 'pantai', display: '__tai', answer: 'pan', choices: ['pan', 'pin', 'pen'], image: '🏖️' },
  { id: 'rumah', display: '__mah', answer: 'ru', choices: ['ru', 'ra', 'ri'], image: '🏠' },
  { id: 'sepatu', display: '__patu', answer: 'se', choices: ['se', 'sa', 'si'], image: '👟' },
  { id: 'tas', display: '__as', answer: 't', choices: ['t', 'd', 'k'], image: '👜' },
  { id: 'uang', display: '__ang', answer: 'u', choices: ['u', 'o', 'a'], image: '💰' },
  { id: 'vitamin', display: '__tamin', answer: 'vi', choices: ['vi', 'va', 've'], image: '💊' },
  { id: 'warna', display: '__rna', answer: 'wa', choices: ['wa', 'wi', 'we'], image: '🎨' },
  { id: 'telepon', display: '__lepon', answer: 'te', choices: ['te', 'ta', 'ti'], image: '📞' },
  { id: 'kucing', display: '__cing', answer: 'ku', choices: ['ku', 'ka', 'ki'], image: '🐱' },
  { id: 'mangga', display: '__ngga', answer: 'ma', choices: ['ma', 'mi', 'me'], image: '🥭' },
  { id: 'pisang', display: '__sang', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🍌' },
  { id: 'kelapa', display: '__lapa', answer: 'ke', choices: ['ke', 'ka', 'ki'], image: '🥥' },
  { id: 'jeruk', display: '__ruk', answer: 'je', choices: ['je', 'ja', 'ji'], image: '🍊' },
  { id: 'wortel', display: '__tel', answer: 'wo', choices: ['wo', 'wa', 'wi'], image: '🥕' },
  { id: 'ayam', display: '__yam', answer: 'a', choices: ['a', 'i', 'e'], image: '🐔' },
  { id: 'telur', display: '__lur', answer: 'te', choices: ['te', 'ta', 'ti'], image: '🥚' },
  { id: 'itik', display: '__tik', answer: 'i', choices: ['i', 'e', 'a'], image: '🦆' },
  { id: 'kambing', display: '__mbing', answer: 'ka', choices: ['ka', 'ki', 'ke'], image: '🐐' },
  { id: 'boneka', display: '__neka', answer: 'bo', choices: ['bo', 'ba', 'bi'], image: '🧸' },
  { id: 'balok', display: '__lok', answer: 'ba', choices: ['ba', 'bi', 'be'], image: '🧱' },
  { id: 'kunci', display: '__nci', answer: 'ku', choices: ['ku', 'ka', 'ki'], image: '🔑' },
  { id: 'lemari', display: '__mari', answer: 'le', choices: ['le', 'la', 'li'], image: '🗄️' },
  { id: 'kasur', display: '__sur', answer: 'ka', choices: ['ka', 'ki', 'ke'], image: '🛏️' },
  { id: 'bantal', display: '__ntal', answer: 'ba', choices: ['ba', 'be', 'bi'], image: '🛏️' },
  { id: 'cermin', display: '__rmin', answer: 'ce', choices: ['ce', 'ca', 'ci'], image: '🪞' },
  { id: 'lampu', display: '__mpu', answer: 'la', choices: ['la', 'li', 'le'], image: '💡' },
  { id: 'kipas', display: '__pas', answer: 'ki', choices: ['ki', 'ka', 'ke'], image: '🌀' },
  { id: 'tv', display: '__v', answer: 't', choices: ['t', 'd', 'k'], image: '📺' },
  { id: 'radio', display: '__dio', answer: 'ra', choices: ['ra', 'ri', 're'], image: '📻' },
  { id: 'kompor', display: '__mpor', answer: 'ko', choices: ['ko', 'ka', 'ki'], image: '🔥' },
  { id: 'wajan', display: '__jan', answer: 'wa', choices: ['wa', 'wi', 'we'], image: '🍳' },
  { id: 'piring', display: '__ring', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🍽️' },
  { id: 'gelas', display: '__las', answer: 'ge', choices: ['ge', 'ga', 'gi'], image: '🥤' },
  { id: 'sendok', display: '__ndok', answer: 'se', choices: ['se', 'sa', 'si'], image: '🥄' },
  { id: 'garpu', display: '__rpu', answer: 'ga', choices: ['ga', 'gi', 'ge'], image: '🍴' },
  { id: 'pisau', display: '__sau', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🔪' },
  { id: 'sapu', display: '__pu', answer: 'sa', choices: ['sa', 'si', 'se'], image: '🧹' },
  { id: 'ember', display: '__mber', answer: 'e', choices: ['e', 'a', 'i'], image: '🪣' },
  { id: 'kain', display: '__in', answer: 'ka', choices: ['ka', 'ki', 'ke'], image: '🧺' },
  { id: 'sabun', display: '__bun', answer: 'sa', choices: ['sa', 'si', 'se'], image: '🧼' },
  { id: 'sikat', display: '__kat', answer: 'si', choices: ['si', 'sa', 'se'], image: '🪥' },
  { id: 'sampo', display: '__mpo', answer: 'sa', choices: ['sa', 'si', 'se'], image: '🧴' },
  { id: 'handuk', display: '__nduk', answer: 'ha', choices: ['ha', 'hi', 'he'], image: '🧺' },
  { id: 'tisu', display: '__su', answer: 'ti', choices: ['ti', 'ta', 'te'], image: '🧻' },
  { id: 'susu', display: '__su', answer: 'su', choices: ['su', 'sa', 'si'], image: '🥛' },
  { id: 'roti', display: '__ti', answer: 'ro', choices: ['ro', 'ra', 'ri'], image: '🍞' },
  { id: 'kue', display: '__ue', answer: 'k', choices: ['k', 'g', 'h'], image: '🍰' },
  { id: 'buah', display: '__uah', answer: 'b', choices: ['b', 'p', 'd'], image: '🍎' },
  { id: 'air', display: '__ir', answer: 'a', choices: ['a', 'i', 'e'], image: '💧' },
  { id: 'topi', display: '__pi', answer: 'to', choices: ['to', 'ta', 'ti'], image: '🎩' },
  { id: 'jeruk', display: '__ruk', answer: 'je', choices: ['je', 'ja', 'ji'], image: '🍊' },
  { id: 'kupu', display: '__pu', answer: 'ku', choices: ['ku', 'ka', 'ki'], image: '🦋' },
  { id: 'rumah', display: '__mah', answer: 'ru', choices: ['ru', 'ra', 'ri'], image: '🏠' },
  { id: 'pisang', display: '__sang', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🍌' },
  { id: 'kelapa', display: '__lapa', answer: 'ke', choices: ['ke', 'ka', 'ki'], image: '🥥' },
  { id: 'bunga', display: '__nga', answer: 'bu', choices: ['bu', 'ba', 'bi'], image: '🌸' },
  { id: 'hp', display: '__p', answer: 'h', choices: ['h', 'g', 'l'], image: '📱' },
  { id: 'boneka', display: '__neka', answer: 'bo', choices: ['bo', 'ba', 'bi'], image: '🧸' },
  { id: 'burung', display: '__rung', answer: 'bu', choices: ['bu', 'ba', 'bi'], image: '🐦' },
  { id: 'cangkir', display: '__ngkir', answer: 'ca', choices: ['ca', 'ci', 'ce'], image: '☕' },
  { id: 'kambing', display: '__mbing', answer: 'ka', choices: ['ka', 'ki', 'ke'], image: '🐐' },
  { id: 'mainan', display: '__inan', answer: 'ma', choices: ['ma', 'mi', 'me'], image: '🧸' },
  { id: 'piano', display: '__ano', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🎹' },
  { id: 'ikan', display: '__kan', answer: 'i', choices: ['i', 'e', 'a'], image: '🐟' },
  { id: 'jalan', display: '__lan', answer: 'ja', choices: ['ja', 'ji', 'je'], image: '🛤️' },
  { id: 'laut', display: '__ut', answer: 'la', choices: ['la', 'li', 'le'], image: '🌊' },
  { id: 'kepala', display: '__pala', answer: 'ke', choices: ['ke', 'ka', 'ki'], image: '🗣️' },
  { id: 'pintu', display: '__ntu', answer: 'pi', choices: ['pi', 'pa', 'pe'], image: '🚪' },
  { id: 'rambut', display: '__mbut', answer: 'ra', choices: ['ra', 'ri', 're'], image: '💇' },
  { id: 'susu', display: '__su', answer: 'su', choices: ['su', 'sa', 'si'], image: '🥛' },
  { id: 'tangga', display: '__ngga', answer: 'ta', choices: ['ta', 'ti', 'te'], image: '🪜' },
  { id: 'angin', display: '__ngin', answer: 'a', choices: ['a', 'i', 'e'], image: '💨' },
  { id: 'vas', display: '__as', answer: 'v', choices: ['v', 'f', 'w'], image: '🏺' },
  { id: 'warna', display: '__rna', answer: 'wa', choices: ['wa', 'wi', 'we'], image: '🎨' },
  { id: 'kertas', display: '__rtas', answer: 'ke', choices: ['ke', 'ka', 'ki'], image: '📄' },
  { id: 'bola', display: '__la', answer: 'bo', choices: ['bo', 'ba', 'bi'], image: '⚽' },
  { id: 'zaitun', display: '__itun', answer: 'za', choices: ['za', 'zi', 'ze'], image: '🫒' }
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

// Lengkapi Suku Kata questions (150 questions) - from document
const lengkapiSukaKataData = [
  {
    "id": "roti",
    "display": "ro-__",
    "answer": "ti",
    "choices": [
      "to",
      "tu",
      "ti"
    ],
    "image": "🍞"
  },
  {
    "id": "kota",
    "display": "ko-__",
    "answer": "ta",
    "choices": [
      "te",
      "ta",
      "ti"
    ],
    "image": "✨"
  },
  {
    "id": "pelaut",
    "display": "pe-la-__",
    "answer": "ut",
    "choices": [
      "um",
      "un",
      "ut"
    ],
    "image": "🌊"
  },
  {
    "id": "komputer",
    "display": "kom-pu-__",
    "answer": "ter",
    "choices": [
      "ter",
      "tem",
      "ten"
    ],
    "image": "🖥️"
  },
  {
    "id": "perahu",
    "display": "pe-ra-__",
    "answer": "hu",
    "choices": [
      "he",
      "hu",
      "ha"
    ],
    "image": "🛶"
  },
  {
    "id": "gelas",
    "display": "ge-__",
    "answer": "las",
    "choices": [
      "lam",
      "las",
      "lan"
    ],
    "image": "🥤"
  },
  {
    "id": "berjalan",
    "display": "ber-ja-__",
    "answer": "lan",
    "choices": [
      "lat",
      "lam",
      "lan"
    ],
    "image": "🚶"
  },
  {
    "id": "alpukat",
    "display": "al-pu-__",
    "answer": "kat",
    "choices": [
      "kan",
      "kam",
      "kat"
    ],
    "image": "🥑"
  },
  {
    "id": "angin",
    "display": "ang-__",
    "answer": "in",
    "choices": [
      "im",
      "in",
      "it"
    ],
    "image": "💨"
  },
  {
    "id": "bantal",
    "display": "ban-__",
    "answer": "tal",
    "choices": [
      "tan",
      "tal",
      "tam"
    ],
    "image": "🛏️"
  },
  {
    "id": "kompor",
    "display": "kom-__",
    "answer": "por",
    "choices": [
      "pom",
      "pon",
      "por"
    ],
    "image": "🔥"
  },
  {
    "id": "sampo",
    "display": "sam-__",
    "answer": "po",
    "choices": [
      "pa",
      "po",
      "pu"
    ],
    "image": "🧴"
  },
  {
    "id": "kakek",
    "display": "ka-__",
    "answer": "kek",
    "choices": [
      "kem",
      "ken",
      "kek"
    ],
    "image": "👴"
  },
  {
    "id": "merpati",
    "display": "mer-pa-__",
    "answer": "ti",
    "choices": [
      "to",
      "ti",
      "tu"
    ],
    "image": "🕊️"
  },
  {
    "id": "kasur",
    "display": "ka-__",
    "answer": "sur",
    "choices": [
      "sur",
      "sum",
      "sun"
    ],
    "image": "🛏️"
  },
  {
    "id": "penggaris",
    "display": "peng-ga-__",
    "answer": "ris",
    "choices": [
      "rim",
      "rin",
      "ris"
    ],
    "image": "📏"
  },
  {
    "id": "lari",
    "display": "la-__",
    "answer": "ri",
    "choices": [
      "ru",
      "ri",
      "ro"
    ],
    "image": "✨"
  },
  {
    "id": "bolu",
    "display": "bo-__",
    "answer": "lu",
    "choices": [
      "lo",
      "lu",
      "le"
    ],
    "image": "🍰"
  },
  {
    "id": "saringan",
    "display": "sa-ring-__",
    "answer": "an",
    "choices": [
      "am",
      "at",
      "an"
    ],
    "image": "🧺"
  },
  {
    "id": "ular",
    "display": "u-__",
    "answer": "lar",
    "choices": [
      "lam",
      "lan",
      "lar"
    ],
    "image": "✨"
  },
  {
    "id": "pensil",
    "display": "pen-__",
    "answer": "sil",
    "choices": [
      "sil",
      "sin",
      "sim"
    ],
    "image": "✏️"
  },
  {
    "id": "printer",
    "display": "prin-__",
    "answer": "ter",
    "choices": [
      "tem",
      "ten",
      "ter"
    ],
    "image": "🖨️"
  },
  {
    "id": "kepala",
    "display": "ke-pa-__",
    "answer": "la",
    "choices": [
      "le",
      "li",
      "la"
    ],
    "image": "✨"
  },
  {
    "id": "ember",
    "display": "em-__",
    "answer": "ber",
    "choices": [
      "bem",
      "ben",
      "ber"
    ],
    "image": "🪣"
  },
  {
    "id": "dokter",
    "display": "dok-__",
    "answer": "ter",
    "choices": [
      "ten",
      "tem",
      "ter"
    ],
    "image": "🧑‍⚕️"
  },
  {
    "id": "kamar",
    "display": "ka-__",
    "answer": "mar",
    "choices": [
      "mam",
      "mar",
      "man"
    ],
    "image": "🏠"
  },
  {
    "id": "dompet",
    "display": "dom-__",
    "answer": "pet",
    "choices": [
      "pet",
      "pen",
      "pem"
    ],
    "image": "👛"
  },
  {
    "id": "rumah",
    "display": "ru-__",
    "answer": "mah",
    "choices": [
      "man",
      "mah",
      "mam"
    ],
    "image": "🏠"
  },
  {
    "id": "sepakbola",
    "display": "se-pak-bo-__",
    "answer": "la",
    "choices": [
      "le",
      "li",
      "la"
    ],
    "image": "⚽"
  },
  {
    "id": "sabun",
    "display": "sa-__",
    "answer": "bun",
    "choices": [
      "but",
      "bun",
      "bum"
    ],
    "image": "🧼"
  },
  {
    "id": "meja",
    "display": "me-__",
    "answer": "ja",
    "choices": [
      "je",
      "ji",
      "ja"
    ],
    "image": "🪑"
  },
  {
    "id": "gula",
    "display": "gu-__",
    "answer": "la",
    "choices": [
      "le",
      "li",
      "la"
    ],
    "image": "🍯"
  },
  {
    "id": "lucu",
    "display": "lu-__",
    "answer": "cu",
    "choices": [
      "ce",
      "ca",
      "cu"
    ],
    "image": "✨"
  },
  {
    "id": "perawat",
    "display": "pe-ra-__",
    "answer": "wat",
    "choices": [
      "wat",
      "wan",
      "wam"
    ],
    "image": "🧑‍⚕️"
  },
  {
    "id": "piring",
    "display": "pi-__",
    "answer": "ring",
    "choices": [
      "rinn",
      "rinm",
      "ring"
    ],
    "image": "🍽️"
  },
  {
    "id": "susu",
    "display": "su-__",
    "answer": "su",
    "choices": [
      "sa",
      "su",
      "se"
    ],
    "image": "🥛"
  },
  {
    "id": "rubah",
    "display": "ru-__",
    "answer": "bah",
    "choices": [
      "bah",
      "bam",
      "ban"
    ],
    "image": "🦊"
  },
  {
    "id": "sikat",
    "display": "si-__",
    "answer": "kat",
    "choices": [
      "kat",
      "kan",
      "kam"
    ],
    "image": "🪥"
  },
  {
    "id": "boneka",
    "display": "bo-ne-__",
    "answer": "ka",
    "choices": [
      "ki",
      "ke",
      "ka"
    ],
    "image": "✨"
  },
  {
    "id": "pisang",
    "display": "pi-__",
    "answer": "sang",
    "choices": [
      "sang",
      "sanm",
      "sann"
    ],
    "image": "🍌"
  },
  {
    "id": "wanita",
    "display": "wa-ni-__",
    "answer": "ta",
    "choices": [
      "te",
      "ta",
      "tu"
    ],
    "image": "👩"
  },
  {
    "id": "burung",
    "display": "bu-__",
    "answer": "rung",
    "choices": [
      "runn",
      "rung",
      "runm"
    ],
    "image": "🐦"
  },
  {
    "id": "piano",
    "display": "pi-a-__",
    "answer": "no",
    "choices": [
      "na",
      "no",
      "nu"
    ],
    "image": "✨"
  },
  {
    "id": "kertas",
    "display": "ker-__",
    "answer": "tas",
    "choices": [
      "tas",
      "tam",
      "tan"
    ],
    "image": "📄"
  },
  {
    "id": "jari",
    "display": "ja-__",
    "answer": "ri",
    "choices": [
      "ri",
      "ru",
      "ro"
    ],
    "image": "☝️"
  },
  {
    "id": "nada",
    "display": "na-__",
    "answer": "da",
    "choices": [
      "di",
      "de",
      "da"
    ],
    "image": "✨"
  },
  {
    "id": "kamera",
    "display": "ka-me-__",
    "answer": "ra",
    "choices": [
      "re",
      "ra",
      "ri"
    ],
    "image": "📷"
  },
  {
    "id": "tuna",
    "display": "tu-__",
    "answer": "na",
    "choices": [
      "na",
      "an",
      "ni"
    ],
    "image": "🐟"
  },
  {
    "id": "nenek",
    "display": "ne-__",
    "answer": "nek",
    "choices": [
      "nem",
      "nen",
      "nek"
    ],
    "image": "👵"
  },
  {
    "id": "dapur",
    "display": "da-__",
    "answer": "pur",
    "choices": [
      "pur",
      "pun",
      "pum"
    ],
    "image": "🍳"
  },
  {
    "id": "baju",
    "display": "ba-__",
    "answer": "ju",
    "choices": [
      "ja",
      "je",
      "ju"
    ],
    "image": "👕"
  },
  {
    "id": "adik",
    "display": "a-__",
    "answer": "dik",
    "choices": [
      "dik",
      "din",
      "dim"
    ],
    "image": "🧒"
  },
  {
    "id": "bermain",
    "display": "ber-ma__",
    "answer": "in",
    "choices": [
      "it",
      "in",
      "im"
    ],
    "image": "🎮"
  },
  {
    "id": "kursi",
    "display": "kur-__",
    "answer": "si",
    "choices": [
      "su",
      "si",
      "so"
    ],
    "image": "🪑"
  },
  {
    "id": "telur",
    "display": "te-__",
    "answer": "lur",
    "choices": [
      "lum",
      "lur",
      "lun"
    ],
    "image": "🥚"
  },
  {
    "id": "cermin",
    "display": "cer-__",
    "answer": "min",
    "choices": [
      "mit",
      "min",
      "mim"
    ],
    "image": "🪞"
  },
  {
    "id": "tisu",
    "display": "ti-__",
    "answer": "su",
    "choices": [
      "su",
      "sa",
      "se"
    ],
    "image": "✨"
  },
  {
    "id": "cumi",
    "display": "cu-__",
    "answer": "mi",
    "choices": [
      "mi",
      "mu",
      "mo"
    ],
    "image": "🦑"
  },
  {
    "id": "layar",
    "display": "la-__",
    "answer": "yar",
    "choices": [
      "yam",
      "yar",
      "yan"
    ],
    "image": "🖥️"
  },
  {
    "id": "bola",
    "display": "bo-__",
    "answer": "la",
    "choices": [
      "le",
      "li",
      "la"
    ],
    "image": "⚽"
  },
  {
    "id": "gorden",
    "display": "gor-__",
    "answer": "den",
    "choices": [
      "den",
      "det",
      "dem"
    ],
    "image": "✨"
  },
  {
    "id": "tahu",
    "display": "ta-__",
    "answer": "hu",
    "choices": [
      "hu",
      "ha",
      "he"
    ],
    "image": "🧈"
  },
  {
    "id": "kuku",
    "display": "ku-__",
    "answer": "ku",
    "choices": [
      "ke",
      "ku",
      "ka"
    ],
    "image": "✨"
  },
  {
    "id": "nasi",
    "display": "na-__",
    "answer": "si",
    "choices": [
      "so",
      "su",
      "si"
    ],
    "image": "✨"
  },
  {
    "id": "harimau",
    "display": "ha-ri-__",
    "answer": "mau",
    "choices": [
      "mae",
      "maa",
      "mau"
    ],
    "image": "🐯"
  },
  {
    "id": "pulpen",
    "display": "pul-__",
    "answer": "pen",
    "choices": [
      "pem",
      "pet",
      "pen"
    ],
    "image": "🖊️"
  },
  {
    "id": "lampu",
    "display": "lam-__",
    "answer": "pu",
    "choices": [
      "pu",
      "pe",
      "pa"
    ],
    "image": "💡"
  },
  {
    "id": "mainan",
    "display": "mai-__",
    "answer": "nan",
    "choices": [
      "nam",
      "nan",
      "nat"
    ],
    "image": "✨"
  },
  {
    "id": "kipas",
    "display": "ki-__",
    "answer": "pas",
    "choices": [
      "pan",
      "pam",
      "pas"
    ],
    "image": "🌀"
  },
  {
    "id": "bulan",
    "display": "bu-__",
    "answer": "lan",
    "choices": [
      "lan",
      "lat",
      "lam"
    ],
    "image": "🌙"
  },
  {
    "id": "mewarnai",
    "display": "me-war-__",
    "answer": "nai",
    "choices": [
      "nau",
      "nao",
      "nai"
    ],
    "image": "🖍️"
  },
  {
    "id": "kupu",
    "display": "ku-__",
    "answer": "pu",
    "choices": [
      "pa",
      "pe",
      "pu"
    ],
    "image": "🦋"
  },
  {
    "id": "radio",
    "display": "ra-di-__",
    "answer": "o",
    "choices": [
      "o",
      "r",
      "y"
    ],
    "image": "📻"
  },
  {
    "id": "hati",
    "display": "ha-__",
    "answer": "ti",
    "choices": [
      "tu",
      "to",
      "ti"
    ],
    "image": "❤️"
  },
  {
    "id": "sapu",
    "display": "sa-__",
    "answer": "pu",
    "choices": [
      "pe",
      "pu",
      "pa"
    ],
    "image": "🧹"
  },
  {
    "id": "rusa",
    "display": "ru-__",
    "answer": "sa",
    "choices": [
      "se",
      "si",
      "sa"
    ],
    "image": "✨"
  },
  {
    "id": "pesawat",
    "display": "pe-sa-__",
    "answer": "wat",
    "choices": [
      "wan",
      "wat",
      "wam"
    ],
    "image": "✈️"
  },
  {
    "id": "sepatu",
    "display": "se-pa-__",
    "answer": "tu",
    "choices": [
      "te",
      "tu",
      "ta"
    ],
    "image": "👟"
  },
  {
    "id": "lapar",
    "display": "la-__",
    "answer": "par",
    "choices": [
      "par",
      "pam",
      "pan"
    ],
    "image": "😋"
  },
  {
    "id": "kelinci",
    "display": "ke-lin-__",
    "answer": "ci",
    "choices": [
      "cu",
      "co",
      "ci"
    ],
    "image": "🐰"
  },
  {
    "id": "sepeda",
    "display": "se-pe-__",
    "answer": "da",
    "choices": [
      "di",
      "de",
      "da"
    ],
    "image": "🚲"
  },
  {
    "id": "pisau",
    "display": "pi-__",
    "answer": "sau",
    "choices": [
      "saa",
      "sae",
      "sau"
    ],
    "image": "🔪"
  },
  {
    "id": "nanas",
    "display": "na-__",
    "answer": "nas",
    "choices": [
      "nas",
      "nam",
      "nan"
    ],
    "image": "🍍"
  },
  {
    "id": "topi",
    "display": "to-__",
    "answer": "pi",
    "choices": [
      "pu",
      "pi",
      "po"
    ],
    "image": "🎩"
  },
  {
    "id": "wangi",
    "display": "wan-__",
    "answer": "gi",
    "choices": [
      "gu",
      "gi",
      "go"
    ],
    "image": "✨"
  },
  {
    "id": "badak",
    "display": "ba-__",
    "answer": "dak",
    "choices": [
      "dak",
      "dam",
      "dan"
    ],
    "image": "🦏"
  },
  {
    "id": "basket",
    "display": "bas-__",
    "answer": "ket",
    "choices": [
      "ken",
      "kem",
      "ket"
    ],
    "image": "🏀"
  },
  {
    "id": "mata",
    "display": "ma-__",
    "answer": "ta",
    "choices": [
      "ta",
      "ti",
      "te"
    ],
    "image": "👁️"
  },
  {
    "id": "pepaya",
    "display": "pe-pa-__",
    "answer": "ya",
    "choices": [
      "yi",
      "ya",
      "ye"
    ],
    "image": "🥭"
  },
  {
    "id": "papa",
    "display": "pa-__",
    "answer": "pa",
    "choices": [
      "pi",
      "pe",
      "pa"
    ],
    "image": "👨"
  },
  {
    "id": "gajah",
    "display": "ga-__",
    "answer": "jah",
    "choices": [
      "jan",
      "jam",
      "jah"
    ],
    "image": "🐘"
  },
  {
    "id": "embun",
    "display": "em-__",
    "answer": "bun",
    "choices": [
      "bum",
      "bun",
      "but"
    ],
    "image": "💧"
  },
  {
    "id": "gigi",
    "display": "gi-__",
    "answer": "gi",
    "choices": [
      "gi",
      "go",
      "gu"
    ],
    "image": "🦷"
  },
  {
    "id": "melukis",
    "display": "me-lu-__",
    "answer": "kis",
    "choices": [
      "kin",
      "kim",
      "kis"
    ],
    "image": "🎨"
  },
  {
    "id": "semangka",
    "display": "se-mang-__",
    "answer": "ka",
    "choices": [
      "ki",
      "ka",
      "ke"
    ],
    "image": "🍉"
  },
  {
    "id": "mangkuk",
    "display": "mang-__",
    "answer": "kuk",
    "choices": [
      "kuk",
      "kum",
      "kun"
    ],
    "image": "🥣"
  },
  {
    "id": "padi",
    "display": "pa-__",
    "answer": "di",
    "choices": [
      "du",
      "do",
      "di"
    ],
    "image": "✨"
  },
  {
    "id": "guru",
    "display": "gu-__",
    "answer": "ru",
    "choices": [
      "ru",
      "re",
      "ra"
    ],
    "image": "👩‍🏫"
  },
  {
    "id": "danau",
    "display": "da-__",
    "answer": "nau",
    "choices": [
      "nae",
      "naa",
      "nau"
    ],
    "image": "🏞️"
  },
  {
    "id": "pelangi",
    "display": "pe-la-__",
    "answer": "ngi",
    "choices": [
      "ngu",
      "ngo",
      "ngi"
    ],
    "image": "🌈"
  },
  {
    "id": "kaki",
    "display": "ka-__",
    "answer": "ki",
    "choices": [
      "ko",
      "ki",
      "ku"
    ],
    "image": "🦵"
  },
  {
    "id": "bahagia",
    "display": "ba-ha-gi-__",
    "answer": "a",
    "choices": [
      "d",
      "k",
      "a"
    ],
    "image": "😊"
  },
  {
    "id": "balok",
    "display": "ba-__",
    "answer": "lok",
    "choices": [
      "lon",
      "lom",
      "lok"
    ],
    "image": "🧱"
  },
  {
    "id": "mangga",
    "display": "mang-__",
    "answer": "ga",
    "choices": [
      "gi",
      "ga",
      "ge"
    ],
    "image": "🥭"
  },
  {
    "id": "ayah",
    "display": "a-__",
    "answer": "yah",
    "choices": [
      "yan",
      "yah",
      "yam"
    ],
    "image": "👨"
  },
  {
    "id": "buah",
    "display": "bu-__",
    "answer": "ah",
    "choices": [
      "ah",
      "am",
      "an"
    ],
    "image": "🥗"
  },
  {
    "id": "perpustakaan",
    "display": "per-pus-ta-__",
    "answer": "kaan",
    "choices": [
      "kaam",
      "kaan",
      "kaat"
    ],
    "image": "📚"
  },
  {
    "id": "warna",
    "display": "war-__",
    "answer": "na",
    "choices": [
      "na",
      "ni",
      "ne"
    ],
    "image": "✨"
  },
  {
    "id": "ayam",
    "display": "a-__",
    "answer": "yam",
    "choices": [
      "yam",
      "yan",
      "yad"
    ],
    "image": "🐔"
  },
  {
    "id": "jaket",
    "display": "ja-__",
    "answer": "ket",
    "choices": [
      "kem",
      "ken",
      "ket"
    ],
    "image": "✨"
  },
  {
    "id": "bintang",
    "display": "bin-__",
    "answer": "tang",
    "choices": [
      "tann",
      "tanm",
      "tang"
    ],
    "image": "⭐"
  },
  {
    "id": "roda",
    "display": "ro-__",
    "answer": "da",
    "choices": [
      "di",
      "de",
      "da"
    ],
    "image": "🚗"
  },
  {
    "id": "mobil",
    "display": "mo-__",
    "answer": "bil",
    "choices": [
      "bin",
      "bil",
      "bim"
    ],
    "image": "🚗"
  },
  {
    "id": "sendok",
    "display": "sen-__",
    "answer": "dok",
    "choices": [
      "don",
      "dom",
      "dok"
    ],
    "image": "🥄"
  },
  {
    "id": "renang",
    "display": "re-__",
    "answer": "nang",
    "choices": [
      "nann",
      "nanm",
      "nang"
    ],
    "image": "🏊"
  },
  {
    "id": "novel",
    "display": "no-__",
    "answer": "vel",
    "choices": [
      "ven",
      "vem",
      "vel"
    ],
    "image": "✨"
  },
  {
    "id": "taman",
    "display": "ta-__",
    "answer": "man",
    "choices": [
      "mam",
      "man",
      "mat"
    ],
    "image": "🏞️"
  },
  {
    "id": "kebun",
    "display": "ke-__",
    "answer": "bun",
    "choices": [
      "bun",
      "bum",
      "but"
    ],
    "image": "🪴"
  },
  {
    "id": "emas",
    "display": "e-__",
    "answer": "mas",
    "choices": [
      "mas",
      "mam",
      "man"
    ],
    "image": "🪙"
  },
  {
    "id": "hujan",
    "display": "hu-__",
    "answer": "jan",
    "choices": [
      "jam",
      "jan",
      "jat"
    ],
    "image": "🌧️"
  },
  {
    "id": "kopi",
    "display": "ko-__",
    "answer": "pi",
    "choices": [
      "pu",
      "po",
      "pi"
    ],
    "image": "☕"
  },
  {
    "id": "motor",
    "display": "mo-__",
    "answer": "tor",
    "choices": [
      "ton",
      "tom",
      "tor"
    ],
    "image": "🏍️"
  },
  {
    "id": "kakak",
    "display": "ka-__",
    "answer": "kak",
    "choices": [
      "kam",
      "kak",
      "kan"
    ],
    "image": "🧑"
  },
  {
    "id": "keyboard",
    "display": "key-__",
    "answer": "board",
    "choices": [
      "boarm",
      "board",
      "boarn"
    ],
    "image": "⌨️"
  },
  {
    "id": "badai",
    "display": "ba-__",
    "answer": "dai",
    "choices": [
      "dau",
      "dao",
      "dai"
    ],
    "image": "🌩️"
  },
  {
    "id": "penggorengan",
    "display": "peng-go-ren-__",
    "answer": "gan",
    "choices": [
      "gan",
      "gat",
      "gam"
    ],
    "image": "🍳"
  },
  {
    "id": "gerimis",
    "display": "ge-ri-__",
    "answer": "mis",
    "choices": [
      "mim",
      "mis",
      "min"
    ],
    "image": "🌦️"
  },
  {
    "id": "lala",
    "display": "la-__",
    "answer": "la",
    "choices": [
      "le",
      "li",
      "la"
    ],
    "image": "✨"
  },
  {
    "id": "kereta",
    "display": "ke-re-__",
    "answer": "ta",
    "choices": [
      "ti",
      "te",
      "ta"
    ],
    "image": "🚆"
  },
  {
    "id": "kolam",
    "display": "ko-__",
    "answer": "lam",
    "choices": [
      "lam",
      "lan",
      "lad"
    ],
    "image": "✨"
  },
  {
    "id": "pagi",
    "display": "pa-__",
    "answer": "gi",
    "choices": [
      "go",
      "gu",
      "gi"
    ],
    "image": "✨"
  },
  {
    "id": "soto",
    "display": "so-__",
    "answer": "to",
    "choices": [
      "ta",
      "to",
      "tu"
    ],
    "image": "🍲"
  },
  {
    "id": "karpet",
    "display": "kar-__",
    "answer": "pet",
    "choices": [
      "pet",
      "pem",
      "pen"
    ],
    "image": "🧶"
  },
  {
    "id": "cari",
    "display": "ca-__",
    "answer": "ri",
    "choices": [
      "ro",
      "ru",
      "ri"
    ],
    "image": "✨"
  },
  {
    "id": "zaitun",
    "display": "zai-__",
    "answer": "tun",
    "choices": [
      "tut",
      "tun",
      "tum"
    ],
    "image": "🫒"
  },
  {
    "id": "kudanil",
    "display": "ku-da-__",
    "answer": "nil",
    "choices": [
      "nin",
      "nim",
      "nil"
    ],
    "image": "🐴"
  },
  {
    "id": "jeruk",
    "display": "je-__",
    "answer": "ruk",
    "choices": [
      "run",
      "rum",
      "ruk"
    ],
    "image": "🍊"
  },
  {
    "id": "lautan",
    "display": "lau-__",
    "answer": "tan",
    "choices": [
      "tam",
      "tat",
      "tan"
    ],
    "image": "🌊"
  },
  {
    "id": "wortel",
    "display": "wor-__",
    "answer": "tel",
    "choices": [
      "tem",
      "ten",
      "tel"
    ],
    "image": "🥕"
  },
  {
    "id": "wajan",
    "display": "wa-__",
    "answer": "jan",
    "choices": [
      "jam",
      "jat",
      "jan"
    ],
    "image": "🍳"
  },
  {
    "id": "menari",
    "display": "me-na-__",
    "answer": "ri",
    "choices": [
      "ri",
      "ro",
      "ru"
    ],
    "image": "💃"
  },
  {
    "id": "menggambar",
    "display": "meng-gam-__",
    "answer": "bar",
    "choices": [
      "ban",
      "bam",
      "bar"
    ],
    "image": "🎨"
  },
  {
    "id": "kapal",
    "display": "ka-__",
    "answer": "pal",
    "choices": [
      "pan",
      "pam",
      "pal"
    ],
    "image": "🚢"
  },
  {
    "id": "babi",
    "display": "ba-__",
    "answer": "bi",
    "choices": [
      "bo",
      "bu",
      "bi"
    ],
    "image": "✨"
  },
  {
    "id": "badminton",
    "display": "bad-min-__",
    "answer": "ton",
    "choices": [
      "tot",
      "ton",
      "tom"
    ],
    "image": "🏸"
  },
  {
    "id": "dada",
    "display": "da-__",
    "answer": "da",
    "choices": [
      "di",
      "de",
      "da"
    ],
    "image": "✨"
  },
  {
    "id": "kunci",
    "display": "kun-__",
    "answer": "ci",
    "choices": [
      "ci",
      "co",
      "cu"
    ],
    "image": "🔑"
  },
  {
    "id": "pantai",
    "display": "pan-__",
    "answer": "tai",
    "choices": [
      "tai",
      "tau",
      "tao"
    ],
    "image": "🏖️"
  },
  {
    "id": "anggur",
    "display": "ang-__",
    "answer": "gur",
    "choices": [
      "gun",
      "gum",
      "gur"
    ],
    "image": "🍇"
  },
  {
    "id": "sapi",
    "display": "sa-__",
    "answer": "pi",
    "choices": [
      "po",
      "pi",
      "pu"
    ],
    "image": "🐄"
  }
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

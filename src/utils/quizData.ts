import { Question } from "@/types/quiz";

const shuffleArray = <T,>(array: T[]): T[] => {
  if (!array || !Array.isArray(array)) {
    return [];
  }
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
  { "id": "Mata", "image": "👁️", "answer": "M", "choices": ["M", "N", "B"] },
  { "id": "Hidung", "image": "👃", "answer": "H", "choices": ["H", "N", "M"] },
  { "id": "Mulut", "image": "👄", "answer": "M", "choices": ["M", "B", "P"] },
  { "id": "Telinga", "image": "👂", "answer": "T", "choices": ["T", "D", "P"] },
  { "id": "Tangan", "image": "✋", "answer": "T", "choices": ["T", "K", "P"] },
  { "id": "Kaki", "image": "🦵", "answer": "K", "choices": ["K", "T", "M"] },
  { "id": "Rambut", "image": "💇", "answer": "R", "choices": ["R", "H", "M"] },
  { "id": "Perut", "image": "🧍", "answer": "P", "choices": ["P", "B", "M"] },
  { "id": "Punggung", "image": "🧍", "answer": "P", "choices": ["P", "B", "T"] },
  { "id": "Lutut", "image": "🦵", "answer": "L", "choices": ["L", "S", "T"] },
  { "id": "Siku", "image": "💪", "answer": "S", "choices": ["S", "T", "L"] },
  { "id": "Jari", "image": "👆", "answer": "J", "choices": ["J", "T", "L"] },
  { "id": "Kuku", "image": "💅", "answer": "K", "choices": ["K", "J", "M"] },
  { "id": "Bahu", "image": "💪", "answer": "B", "choices": ["B", "P", "T"] },
  { "id": "Leher", "image": "🧣", "answer": "L", "choices": ["L", "N", "M"] },
  { "id": "Dagu", "image": "🧔", "answer": "D", "choices": ["D", "B", "P"] },
  { "id": "Dahi", "image": "🤔", "answer": "D", "choices": ["D", "P", "M"] },
  { "id": "Alis", "image": "🙄", "answer": "A", "choices": ["A", "M", "H"] },
  { "id": "Bibir", "image": "👄", "answer": "B", "choices": ["B", "M", "P"] },
  { "id": "Gigi", "image": "🦷", "answer": "G", "choices": ["G", "L", "M"] },
  { "id": "Lidah", "image": "👅", "answer": "L", "choices": ["L", "B", "M"] },
  { "id": "Kepala", "image": "🙂", "answer": "K", "choices": ["K", "M", "T"] },
  { "id": "Kursi", "image": "🪑", "answer": "K", "choices": ["K", "M", "T"] },
  { "id": "Meja", "image": "🛋️", "answer": "M", "choices": ["M", "K", "T"] },
  { "id": "Pintu", "image": "🚪", "answer": "P", "choices": ["P", "B", "M"] },
  { "id": "Jendela", "image": "🪟", "answer": "J", "choices": ["J", "P", "M"] },
  { "id": "Lemari", "image": "🗄️", "answer": "L", "choices": ["L", "M", "K"] },
  { "id": "Kasur", "image": "🛏️", "answer": "K", "choices": ["K", "M", "T"] },
  { "id": "Bantal", "image": "🛏️", "answer": "B", "choices": ["B", "P", "K"] },
  { "id": "Cermin", "image": "🪞", "answer": "C", "choices": ["C", "S", "G"] },
  { "id": "Lampu", "image": "💡", "answer": "L", "choices": ["L", "B", "K"] },
  { "id": "Kipas", "image": "🌀", "answer": "K", "choices": ["K", "L", "M"] },
  { "id": "TV", "image": "📺", "answer": "T", "choices": ["T", "K", "L"] },
  { "id": "Radio", "image": "📻", "answer": "R", "choices": ["R", "L", "K"] },
  { "id": "Kompor", "image": "🔥", "answer": "K", "choices": ["K", "M", "L"] },
  { "id": "Wajan", "image": "🍳", "answer": "W", "choices": ["W", "K", "M"] },
  { "id": "Piring", "image": "🍽️", "answer": "P", "choices": ["P", "B", "M"] },
  { "id": "Gelas", "image": "🥤", "answer": "G", "choices": ["G", "C", "B"] },
  { "id": "Sendok", "image": "🥄", "answer": "S", "choices": ["S", "C", "G"] },
  { "id": "Garpu", "image": "🍴", "answer": "G", "choices": ["G", "S", "C"] },
  { "id": "Pisau", "image": "🔪", "answer": "P", "choices": ["P", "G", "S"] },
  { "id": "Nasi", "image": "🍚", "answer": "N", "choices": ["N", "M", "B"] },
  { "id": "Air", "image": "💧", "answer": "A", "choices": ["A", "I", "U"] },
  { "id": "Susu", "image": "🥛", "answer": "S", "choices": ["S", "M", "B"] },
  { "id": "Roti", "image": "🍞", "answer": "R", "choices": ["R", "L", "K"] },
  { "id": "Kue", "image": "🍰", "answer": "K", "choices": ["K", "M", "B"] },
  { "id": "Buah", "image": "🍎", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Mangga", "image": "🥭", "answer": "M", "choices": ["M", "B", "P"] },
  { "id": "Pisang", "image": "🍌", "answer": "P", "choices": ["P", "B", "M"] },
  { "id": "Kelapa", "image": "🥥", "answer": "K", "choices": ["K", "M", "G"] },
  { "id": "Jeruk", "image": "🍊", "answer": "J", "choices": ["J", "C", "G"] },
  { "id": "Wortel", "image": "🥕", "answer": "W", "choices": ["W", "K", "M"] },
  { "id": "Ayam", "image": "🐔", "answer": "A", "choices": ["A", "I", "U"] },
  { "id": "Ikan", "image": "🐟", "answer": "I", "choices": ["I", "A", "U"] },
  { "id": "Telur", "image": "🥚", "answer": "T", "choices": ["T", "D", "K"] },
  { "id": "Bunga", "image": "🌸", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Pohon", "image": "🌳", "answer": "P", "choices": ["P", "B", "M"] },
  { "id": "Rumput", "image": "🌱", "answer": "R", "choices": ["R", "L", "K"] },
  { "id": "Daun", "image": "🍃", "answer": "D", "choices": ["D", "B", "P"] },
  { "id": "Batu", "image": "🪨", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Matahari", "image": "☀️", "answer": "M", "choices": ["M", "B", "P"] },
  { "id": "Bulan", "image": "🌙", "answer": "B", "choices": ["B", "M", "P"] },
  { "id": "Bintang", "image": "⭐", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Mobil", "image": "🚗", "answer": "M", "choices": ["M", "B", "K"] },
  { "id": "Sepeda", "image": "🚲", "answer": "S", "choices": ["S", "M", "B"] },
  { "id": "Bus", "image": "🚌", "answer": "B", "choices": ["B", "M", "K"] },
  { "id": "Kereta", "image": "🚆", "answer": "K", "choices": ["K", "M", "B"] },
  { "id": "Pesawat", "image": "✈️", "answer": "P", "choices": ["P", "B", "M"] },
  { "id": "Kapal", "image": "⛵", "answer": "K", "choices": ["K", "M", "B"] },
  { "id": "Boneka", "image": "🧸", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Bola", "image": "⚽", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Balok", "image": "🧱", "answer": "B", "choices": ["B", "P", "M"] },
  { "id": "Kunci", "image": "🔑", "answer": "K", "choices": ["K", "M", "B"] },
  { "id": "Gunting", "image": "✂️", "answer": "G", "choices": ["G", "C", "S"] },
  { "id": "Saputangan", "image": "🧻", "answer": "S", "choices": ["S", "C", "G"] },
  { "id": "Sabun", "image": "🧼", "answer": "S", "choices": ["S", "C", "B"] },
  { "id": "Sikat", "image": "🪥", "answer": "S", "choices": ["S", "C", "G"] },
  { "id": "Sampo", "image": "🧴", "answer": "S", "choices": ["S", "C", "G"] },
  { "id": "Handuk", "image": "🛁", "answer": "H", "choices": ["H", "S", "K"] },
  { "id": "Tisu", "image": "🧻", "answer": "T", "choices": ["T", "K", "S"] }
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
  // Create unique choices by avoiding duplicates
  // Create a larger pool of potential distractors
  const allDistractors = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // Filter out the correct answer
  const availableDistractors = allDistractors.filter(opt => opt !== lastChar);
  // Shuffle and select 2 random distractors
  const shuffledDistractors = [...availableDistractors];
  for (let i = shuffledDistractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDistractors[i], shuffledDistractors[j]] = [shuffledDistractors[j], shuffledDistractors[i]];
  }
  const selectedDistractors = shuffledDistractors.slice(0, 2);
  // Combine correct answer with distractors and shuffle again
  const choices = [lastChar, ...selectedDistractors];
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return {
    id: item.id,
    image: item.image,
    answer: lastChar,
    choices: choices
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

const tengahSukuKataData = [
  {
    "id": "rawuto",
    "display": "ra-__-to",
    "answer": "wu",
    "choices": [
      "we",
      "wa",
      "wu"
    ],
    "image": "🔤",
    "syllables": [
      "ra",
      "wu",
      "to"
    ]
  },
  {
    "id": "mimela",
    "display": "mi-__-la",
    "answer": "me",
    "choices": [
      "me",
      "mi",
      "mo"
    ],
    "image": "🔤",
    "syllables": [
      "mi",
      "me",
      "la"
    ]
  },
  {
    "id": "tijufe",
    "display": "ti-__-fe",
    "answer": "ju",
    "choices": [
      "ju",
      "je",
      "ja"
    ],
    "image": "🔤",
    "syllables": [
      "ti",
      "ju",
      "fe"
    ]
  },
  {
    "id": "gimete",
    "display": "gi-__-te",
    "answer": "me",
    "choices": [
      "me",
      "mo",
      "mi"
    ],
    "image": "🔤",
    "syllables": [
      "gi",
      "me",
      "te"
    ]
  },
  {
    "id": "binatang",
    "display": "bi-__-tang",
    "answer": "na",
    "choices": [
      "ne",
      "ni",
      "na"
    ],
    "image": "🐾",
    "syllables": [
      "bi",
      "na",
      "tang"
    ]
  },
  {
    "id": "bendera",
    "display": "ben-__-ra",
    "answer": "de",
    "choices": [
      "de",
      "do",
      "di"
    ],
    "image": "🚩",
    "syllables": [
      "ben",
      "de",
      "ra"
    ]
  },
  {
    "id": "nucoku",
    "display": "nu-__-ku",
    "answer": "co",
    "choices": [
      "co",
      "cu",
      "ca"
    ],
    "image": "🔤",
    "syllables": [
      "nu",
      "co",
      "ku"
    ]
  },
  {
    "id": "ricalu",
    "display": "ri-__-lu",
    "answer": "ca",
    "choices": [
      "ca",
      "ce",
      "ci"
    ],
    "image": "🔤",
    "syllables": [
      "ri",
      "ca",
      "lu"
    ]
  },
  {
    "id": "pelisi",
    "display": "pe-__-si",
    "answer": "li",
    "choices": [
      "li",
      "lu",
      "lo"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "li",
      "si"
    ]
  },
  {
    "id": "komodo",
    "display": "ko-__-do",
    "answer": "mo",
    "choices": [
      "mu",
      "ma",
      "mo"
    ],
    "image": "🔤",
    "syllables": [
      "ko",
      "mo",
      "do"
    ]
  },
  {
    "id": "peminjam",
    "display": "pe-__-jam",
    "answer": "min",
    "choices": [
      "mim",
      "min",
      "mina"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "min",
      "jam"
    ]
  },
  {
    "id": "pembeli",
    "display": "pem-__-li",
    "answer": "be",
    "choices": [
      "bo",
      "be",
      "bi"
    ],
    "image": "🔤",
    "syllables": [
      "pem",
      "be",
      "li"
    ]
  },
  {
    "id": "kudipu",
    "display": "ku-__-pu",
    "answer": "di",
    "choices": [
      "du",
      "di",
      "do"
    ],
    "image": "🔤",
    "syllables": [
      "ku",
      "di",
      "pu"
    ]
  },
  {
    "id": "penggaris",
    "display": "peng-__-ris",
    "answer": "ga",
    "choices": [
      "ge",
      "ga",
      "gi"
    ],
    "image": "📏",
    "syllables": [
      "peng",
      "ga",
      "ris"
    ]
  },
  {
    "id": "nofuke",
    "display": "no-__-ke",
    "answer": "fu",
    "choices": [
      "fe",
      "fu",
      "fa"
    ],
    "image": "🔤",
    "syllables": [
      "no",
      "fu",
      "ke"
    ]
  },
  {
    "id": "nelayan",
    "display": "ne-__-yan",
    "answer": "la",
    "choices": [
      "le",
      "la",
      "li"
    ],
    "image": "🔤",
    "syllables": [
      "ne",
      "la",
      "yan"
    ]
  },
  {
    "id": "honama",
    "display": "ho-__-ma",
    "answer": "na",
    "choices": [
      "ne",
      "ni",
      "na"
    ],
    "image": "🔤",
    "syllables": [
      "ho",
      "na",
      "ma"
    ]
  },
  {
    "id": "sidase",
    "display": "si-__-se",
    "answer": "da",
    "choices": [
      "da",
      "di",
      "de"
    ],
    "image": "🔤",
    "syllables": [
      "si",
      "da",
      "se"
    ]
  },
  {
    "id": "gunalu",
    "display": "gu-__-lu",
    "answer": "na",
    "choices": [
      "ne",
      "na",
      "ni"
    ],
    "image": "🔤",
    "syllables": [
      "gu",
      "na",
      "lu"
    ]
  },
  {
    "id": "tulisan",
    "display": "tu-__-san",
    "answer": "li",
    "choices": [
      "lo",
      "lu",
      "li"
    ],
    "image": "🔤",
    "syllables": [
      "tu",
      "li",
      "san"
    ]
  },
  {
    "id": "pesawat",
    "display": "pe-__-wat",
    "answer": "sa",
    "choices": [
      "sa",
      "se",
      "si"
    ],
    "image": "✈️",
    "syllables": [
      "pe",
      "sa",
      "wat"
    ]
  },
  {
    "id": "fofabo",
    "display": "fo-__-bo",
    "answer": "fa",
    "choices": [
      "fi",
      "fa",
      "fe"
    ],
    "image": "🔤",
    "syllables": [
      "fo",
      "fa",
      "bo"
    ]
  },
  {
    "id": "kalaupun",
    "display": "ka-__-pun",
    "answer": "lau",
    "choices": [
      "lau",
      "laa",
      "lae"
    ],
    "image": "🔤",
    "syllables": [
      "ka",
      "lau",
      "pun"
    ]
  },
  {
    "id": "sepeda",
    "display": "se-__-da",
    "answer": "pe",
    "choices": [
      "pe",
      "pi",
      "po"
    ],
    "image": "🚲",
    "syllables": [
      "se",
      "pe",
      "da"
    ]
  },
  {
    "id": "sopale",
    "display": "so-__-le",
    "answer": "pa",
    "choices": [
      "pe",
      "pi",
      "pa"
    ],
    "image": "🔤",
    "syllables": [
      "so",
      "pa",
      "le"
    ]
  },
  {
    "id": "kamera",
    "display": "ka-__-ra",
    "answer": "me",
    "choices": [
      "me",
      "mi",
      "mo"
    ],
    "image": "📷",
    "syllables": [
      "ka",
      "me",
      "ra"
    ]
  },
  {
    "id": "permainan",
    "display": "per-__-nan",
    "answer": "mai",
    "choices": [
      "mai",
      "mao",
      "mau"
    ],
    "image": "🔤",
    "syllables": [
      "per",
      "mai",
      "nan"
    ]
  },
  {
    "id": "pekerja",
    "display": "pe-__-ja",
    "answer": "ker",
    "choices": [
      "ker",
      "ken",
      "kem"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "ker",
      "ja"
    ]
  },
  {
    "id": "tufeli",
    "display": "tu-__-li",
    "answer": "fe",
    "choices": [
      "fe",
      "fi",
      "fo"
    ],
    "image": "🔤",
    "syllables": [
      "tu",
      "fe",
      "li"
    ]
  },
  {
    "id": "penjual",
    "display": "pen-__-al",
    "answer": "ju",
    "choices": [
      "ju",
      "ja",
      "je"
    ],
    "image": "🔤",
    "syllables": [
      "pen",
      "ju",
      "al"
    ]
  },
  {
    "id": "hejeja",
    "display": "he-__-ja",
    "answer": "je",
    "choices": [
      "jo",
      "ji",
      "je"
    ],
    "image": "🔤",
    "syllables": [
      "he",
      "je",
      "ja"
    ]
  },
  {
    "id": "cudeki",
    "display": "cu-__-ki",
    "answer": "de",
    "choices": [
      "do",
      "de",
      "di"
    ],
    "image": "🔤",
    "syllables": [
      "cu",
      "de",
      "ki"
    ]
  },
  {
    "id": "jotoge",
    "display": "jo-__-ge",
    "answer": "to",
    "choices": [
      "ta",
      "to",
      "tu"
    ],
    "image": "🔤",
    "syllables": [
      "jo",
      "to",
      "ge"
    ]
  },
  {
    "id": "penulis",
    "display": "pe-__-lis",
    "answer": "nu",
    "choices": [
      "nu",
      "na",
      "ne"
    ],
    "image": "✍️",
    "syllables": [
      "pe",
      "nu",
      "lis"
    ]
  },
  {
    "id": "wosime",
    "display": "wo-__-me",
    "answer": "si",
    "choices": [
      "so",
      "si",
      "su"
    ],
    "image": "🔤",
    "syllables": [
      "wo",
      "si",
      "me"
    ]
  },
  {
    "id": "mucole",
    "display": "mu-__-le",
    "answer": "co",
    "choices": [
      "cu",
      "co",
      "ca"
    ],
    "image": "🔤",
    "syllables": [
      "mu",
      "co",
      "le"
    ]
  },
  {
    "id": "hirari",
    "display": "hi-__-ri",
    "answer": "ra",
    "choices": [
      "ra",
      "re",
      "ri"
    ],
    "image": "🔤",
    "syllables": [
      "hi",
      "ra",
      "ri"
    ]
  },
  {
    "id": "semangka",
    "display": "se-__-ka",
    "answer": "mang",
    "choices": [
      "mang",
      "manm",
      "mann"
    ],
    "image": "🍉",
    "syllables": [
      "se",
      "mang",
      "ka"
    ]
  },
  {
    "id": "tanaman",
    "display": "ta-__-man",
    "answer": "na",
    "choices": [
      "ni",
      "na",
      "ne"
    ],
    "image": "🌿",
    "syllables": [
      "ta",
      "na",
      "man"
    ]
  },
  {
    "id": "minuman",
    "display": "mi-__-man",
    "answer": "nu",
    "choices": [
      "ne",
      "na",
      "nu"
    ],
    "image": "🔤",
    "syllables": [
      "mi",
      "nu",
      "man"
    ]
  },
  {
    "id": "hakobu",
    "display": "ha-__-bu",
    "answer": "ko",
    "choices": [
      "ku",
      "ka",
      "ko"
    ],
    "image": "🔤",
    "syllables": [
      "ha",
      "ko",
      "bu"
    ]
  },
  {
    "id": "perkampung",
    "display": "per-__-pung",
    "answer": "kam",
    "choices": [
      "kam",
      "kan",
      "kama"
    ],
    "image": "🔤",
    "syllables": [
      "per",
      "kam",
      "pung"
    ]
  },
  {
    "id": "todica",
    "display": "to-__-ca",
    "answer": "di",
    "choices": [
      "di",
      "du",
      "do"
    ],
    "image": "🔤",
    "syllables": [
      "to",
      "di",
      "ca"
    ]
  },
  {
    "id": "makanan",
    "display": "ma-__-nan",
    "answer": "ka",
    "choices": [
      "ki",
      "ke",
      "ka"
    ],
    "image": "🔤",
    "syllables": [
      "ma",
      "ka",
      "nan"
    ]
  },
  {
    "id": "kufujo",
    "display": "ku-__-jo",
    "answer": "fu",
    "choices": [
      "fe",
      "fa",
      "fu"
    ],
    "image": "🔤",
    "syllables": [
      "ku",
      "fu",
      "jo"
    ]
  },
  {
    "id": "kepala",
    "display": "ke-__-la",
    "answer": "pa",
    "choices": [
      "pa",
      "pe",
      "pi"
    ],
    "image": "🙂",
    "syllables": [
      "ke",
      "pa",
      "la"
    ]
  },
  {
    "id": "gamija",
    "display": "ga-__-ja",
    "answer": "mi",
    "choices": [
      "mo",
      "mi",
      "mu"
    ],
    "image": "🔤",
    "syllables": [
      "ga",
      "mi",
      "ja"
    ]
  },
  {
    "id": "fuhico",
    "display": "fu-__-co",
    "answer": "hi",
    "choices": [
      "hu",
      "ho",
      "hi"
    ],
    "image": "🔤",
    "syllables": [
      "fu",
      "hi",
      "co"
    ]
  },
  {
    "id": "fidilu",
    "display": "fi-__-lu",
    "answer": "di",
    "choices": [
      "du",
      "di",
      "do"
    ],
    "image": "🔤",
    "syllables": [
      "fi",
      "di",
      "lu"
    ]
  },
  {
    "id": "radigo",
    "display": "ra-__-go",
    "answer": "di",
    "choices": [
      "di",
      "du",
      "do"
    ],
    "image": "🔤",
    "syllables": [
      "ra",
      "di",
      "go"
    ]
  },
  {
    "id": "pembaca",
    "display": "pem-__-ca",
    "answer": "ba",
    "choices": [
      "bi",
      "ba",
      "be"
    ],
    "image": "📖",
    "syllables": [
      "pem",
      "ba",
      "ca"
    ]
  },
  {
    "id": "kasurku",
    "display": "ka-__-ku",
    "answer": "sur",
    "choices": [
      "sur",
      "sun",
      "sum"
    ],
    "image": "🔤",
    "syllables": [
      "ka",
      "sur",
      "ku"
    ]
  },
  {
    "id": "kelapa",
    "display": "ke-__-pa",
    "answer": "la",
    "choices": [
      "li",
      "le",
      "la"
    ],
    "image": "🥥",
    "syllables": [
      "ke",
      "la",
      "pa"
    ]
  },
  {
    "id": "wunipu",
    "display": "wu-__-pu",
    "answer": "ni",
    "choices": [
      "ni",
      "nu",
      "no"
    ],
    "image": "🔤",
    "syllables": [
      "wu",
      "ni",
      "pu"
    ]
  },
  {
    "id": "penghapus",
    "display": "peng-__-pus",
    "answer": "ha",
    "choices": [
      "he",
      "hi",
      "ha"
    ],
    "image": "🩹",
    "syllables": [
      "peng",
      "ha",
      "pus"
    ]
  },
  {
    "id": "puweju",
    "display": "pu-__-ju",
    "answer": "we",
    "choices": [
      "wi",
      "we",
      "wo"
    ],
    "image": "🔤",
    "syllables": [
      "pu",
      "we",
      "ju"
    ]
  },
  {
    "id": "bedapo",
    "display": "be-__-po",
    "answer": "da",
    "choices": [
      "da",
      "de",
      "di"
    ],
    "image": "🔤",
    "syllables": [
      "be",
      "da",
      "po"
    ]
  },
  {
    "id": "pelari",
    "display": "pe-__-ri",
    "answer": "la",
    "choices": [
      "la",
      "li",
      "le"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "la",
      "ri"
    ]
  },
  {
    "id": "hibepo",
    "display": "hi-__-po",
    "answer": "be",
    "choices": [
      "bi",
      "bo",
      "be"
    ],
    "image": "🔤",
    "syllables": [
      "hi",
      "be",
      "po"
    ]
  },
  {
    "id": "netumo",
    "display": "ne-__-mo",
    "answer": "tu",
    "choices": [
      "tu",
      "ta",
      "te"
    ],
    "image": "🔤",
    "syllables": [
      "ne",
      "tu",
      "mo"
    ]
  },
  {
    "id": "sotetu",
    "display": "so-__-tu",
    "answer": "te",
    "choices": [
      "te",
      "ti",
      "to"
    ],
    "image": "🔤",
    "syllables": [
      "so",
      "te",
      "tu"
    ]
  },
  {
    "id": "woreli",
    "display": "wo-__-li",
    "answer": "re",
    "choices": [
      "re",
      "ri",
      "ro"
    ],
    "image": "🔤",
    "syllables": [
      "wo",
      "re",
      "li"
    ]
  },
  {
    "id": "kitewi",
    "display": "ki-__-wi",
    "answer": "te",
    "choices": [
      "ti",
      "te",
      "to"
    ],
    "image": "🔤",
    "syllables": [
      "ki",
      "te",
      "wi"
    ]
  },
  {
    "id": "lucoti",
    "display": "lu-__-ti",
    "answer": "co",
    "choices": [
      "cu",
      "ca",
      "co"
    ],
    "image": "🔤",
    "syllables": [
      "lu",
      "co",
      "ti"
    ]
  },
  {
    "id": "jembatan",
    "display": "jem-__-tan",
    "answer": "ba",
    "choices": [
      "be",
      "ba",
      "bi"
    ],
    "image": "🔤",
    "syllables": [
      "jem",
      "ba",
      "tan"
    ]
  },
  {
    "id": "lampunya",
    "display": "lam-__-ya",
    "answer": "pun",
    "choices": [
      "puna",
      "pun",
      "pum"
    ],
    "image": "🔤",
    "syllables": [
      "lam",
      "pun",
      "ya"
    ]
  },
  {
    "id": "belanja",
    "display": "be-__-ja",
    "answer": "lan",
    "choices": [
      "lan",
      "lam",
      "lana"
    ],
    "image": "🛍️",
    "syllables": [
      "be",
      "lan",
      "ja"
    ]
  },
  {
    "id": "gosono",
    "display": "go-__-no",
    "answer": "so",
    "choices": [
      "so",
      "sa",
      "su"
    ],
    "image": "🔤",
    "syllables": [
      "go",
      "so",
      "no"
    ]
  },
  {
    "id": "komponen",
    "display": "kom-__-nen",
    "answer": "po",
    "choices": [
      "pu",
      "pa",
      "po"
    ],
    "image": "🔤",
    "syllables": [
      "kom",
      "po",
      "nen"
    ]
  },
  {
    "id": "pepaya",
    "display": "pe-__-ya",
    "answer": "pa",
    "choices": [
      "pe",
      "pi",
      "pa"
    ],
    "image": "🥭",
    "syllables": [
      "pe",
      "pa",
      "ya"
    ]
  },
  {
    "id": "tobehe",
    "display": "to-__-he",
    "answer": "be",
    "choices": [
      "be",
      "bo",
      "bi"
    ],
    "image": "🔤",
    "syllables": [
      "to",
      "be",
      "he"
    ]
  },
  {
    "id": "jirike",
    "display": "ji-__-ke",
    "answer": "ri",
    "choices": [
      "ro",
      "ru",
      "ri"
    ],
    "image": "🔤",
    "syllables": [
      "ji",
      "ri",
      "ke"
    ]
  },
  {
    "id": "sayuran",
    "display": "sa-__-ran",
    "answer": "yu",
    "choices": [
      "yu",
      "ya",
      "ye"
    ],
    "image": "🥗",
    "syllables": [
      "sa",
      "yu",
      "ran"
    ]
  },
  {
    "id": "alpukat",
    "display": "al-__-kat",
    "answer": "pu",
    "choices": [
      "pe",
      "pu",
      "pa"
    ],
    "image": "🥑",
    "syllables": [
      "al",
      "pu",
      "kat"
    ]
  },
  {
    "id": "tepubi",
    "display": "te-__-bi",
    "answer": "pu",
    "choices": [
      "pe",
      "pa",
      "pu"
    ],
    "image": "🔤",
    "syllables": [
      "te",
      "pu",
      "bi"
    ]
  },
  {
    "id": "jajepo",
    "display": "ja-__-po",
    "answer": "je",
    "choices": [
      "ji",
      "je",
      "jo"
    ],
    "image": "🔤",
    "syllables": [
      "ja",
      "je",
      "po"
    ]
  },
  {
    "id": "fulohi",
    "display": "fu-__-hi",
    "answer": "lo",
    "choices": [
      "la",
      "lo",
      "lu"
    ],
    "image": "🔤",
    "syllables": [
      "fu",
      "lo",
      "hi"
    ]
  },
  {
    "id": "wedofo",
    "display": "we-__-fo",
    "answer": "do",
    "choices": [
      "du",
      "da",
      "do"
    ],
    "image": "🔤",
    "syllables": [
      "we",
      "do",
      "fo"
    ]
  },
  {
    "id": "kegige",
    "display": "ke-__-ge",
    "answer": "gi",
    "choices": [
      "go",
      "gi",
      "gu"
    ],
    "image": "🔤",
    "syllables": [
      "ke",
      "gi",
      "ge"
    ]
  },
  {
    "id": "cerminku",
    "display": "cer-__-ku",
    "answer": "min",
    "choices": [
      "min",
      "mina",
      "mim"
    ],
    "image": "🔤",
    "syllables": [
      "cer",
      "min",
      "ku"
    ]
  },
  {
    "id": "majalah",
    "display": "ma-__-lah",
    "answer": "ja",
    "choices": [
      "ja",
      "ji",
      "je"
    ],
    "image": "📚",
    "syllables": [
      "ma",
      "ja",
      "lah"
    ]
  },
  {
    "id": "meropo",
    "display": "me-__-po",
    "answer": "ro",
    "choices": [
      "ru",
      "ra",
      "ro"
    ],
    "image": "🔤",
    "syllables": [
      "me",
      "ro",
      "po"
    ]
  },
  {
    "id": "nedibo",
    "display": "ne-__-bo",
    "answer": "di",
    "choices": [
      "du",
      "di",
      "do"
    ],
    "image": "🔤",
    "syllables": [
      "ne",
      "di",
      "bo"
    ]
  },
  {
    "id": "pelatih",
    "display": "pe-__-tih",
    "answer": "la",
    "choices": [
      "le",
      "li",
      "la"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "la",
      "tih"
    ]
  },
  {
    "id": "kamarku",
    "display": "ka-__-ku",
    "answer": "mar",
    "choices": [
      "mam",
      "mar",
      "man"
    ],
    "image": "🔤",
    "syllables": [
      "ka",
      "mar",
      "ku"
    ]
  },
  {
    "id": "kereta",
    "display": "ke-__-ta",
    "answer": "re",
    "choices": [
      "re",
      "ro",
      "ri"
    ],
    "image": "🚆",
    "syllables": [
      "ke",
      "re",
      "ta"
    ]
  },
  {
    "id": "permukaan",
    "display": "per-__-kaan",
    "answer": "mu",
    "choices": [
      "ma",
      "mu",
      "me"
    ],
    "image": "🔤",
    "syllables": [
      "per",
      "mu",
      "kaan"
    ]
  },
  {
    "id": "dimifa",
    "display": "di-__-fa",
    "answer": "mi",
    "choices": [
      "mo",
      "mu",
      "mi"
    ],
    "image": "🔤",
    "syllables": [
      "di",
      "mi",
      "fa"
    ]
  },
  {
    "id": "rumahan",
    "display": "ru-__-han",
    "answer": "ma",
    "choices": [
      "me",
      "mi",
      "ma"
    ],
    "image": "🏠",
    "syllables": [
      "ru",
      "ma",
      "han"
    ]
  },
  {
    "id": "penjaga",
    "display": "pen-__-ga",
    "answer": "ja",
    "choices": [
      "je",
      "ji",
      "ja"
    ],
    "image": "🔤",
    "syllables": [
      "pen",
      "ja",
      "ga"
    ]
  },
  {
    "id": "lembaran",
    "display": "lem-__-ran",
    "answer": "ba",
    "choices": [
      "bi",
      "be",
      "ba"
    ],
    "image": "🔤",
    "syllables": [
      "lem",
      "ba",
      "ran"
    ]
  },
  {
    "id": "beruang",
    "display": "be-__-ang",
    "answer": "ru",
    "choices": [
      "ra",
      "ru",
      "re"
    ],
    "image": "🐻",
    "syllables": [
      "be",
      "ru",
      "ang"
    ]
  },
  {
    "id": "lemari",
    "display": "le-__-ri",
    "answer": "ma",
    "choices": [
      "me",
      "mi",
      "ma"
    ],
    "image": "🗄️",
    "syllables": [
      "le",
      "ma",
      "ri"
    ]
  },
  {
    "id": "kamarnya",
    "display": "ka-__-ya",
    "answer": "marn",
    "choices": [
      "marm",
      "marna",
      "marn"
    ],
    "image": "🔤",
    "syllables": [
      "ka",
      "marn",
      "ya"
    ]
  },
  {
    "id": "penonton",
    "display": "pe-__-ton",
    "answer": "non",
    "choices": [
      "nom",
      "non",
      "nona"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "non",
      "ton"
    ]
  },
  {
    "id": "kalender",
    "display": "ka-__-der",
    "answer": "len",
    "choices": [
      "lena",
      "lem",
      "len"
    ],
    "image": "🗓️",
    "syllables": [
      "ka",
      "len",
      "der"
    ]
  },
  {
    "id": "mesede",
    "display": "me-__-de",
    "answer": "se",
    "choices": [
      "so",
      "si",
      "se"
    ],
    "image": "🔤",
    "syllables": [
      "me",
      "se",
      "de"
    ]
  },
  {
    "id": "kasurnya",
    "display": "ka-__-ya",
    "answer": "surn",
    "choices": [
      "surna",
      "surm",
      "surn"
    ],
    "image": "🔤",
    "syllables": [
      "ka",
      "surn",
      "ya"
    ]
  },
  {
    "id": "bepari",
    "display": "be-__-ri",
    "answer": "pa",
    "choices": [
      "pa",
      "pe",
      "pi"
    ],
    "image": "🔤",
    "syllables": [
      "be",
      "pa",
      "ri"
    ]
  },
  {
    "id": "kalengan",
    "display": "ka-__-gan",
    "answer": "len",
    "choices": [
      "lena",
      "len",
      "lem"
    ],
    "image": "🔤",
    "syllables": [
      "ka",
      "len",
      "gan"
    ]
  },
  {
    "id": "jalanan",
    "display": "ja-__-nan",
    "answer": "la",
    "choices": [
      "li",
      "le",
      "la"
    ],
    "image": "🔤",
    "syllables": [
      "ja",
      "la",
      "nan"
    ]
  },
  {
    "id": "siluki",
    "display": "si-__-ki",
    "answer": "lu",
    "choices": [
      "la",
      "lu",
      "le"
    ],
    "image": "🔤",
    "syllables": [
      "si",
      "lu",
      "ki"
    ]
  },
  {
    "id": "tusame",
    "display": "tu-__-me",
    "answer": "sa",
    "choices": [
      "se",
      "sa",
      "si"
    ],
    "image": "🔤",
    "syllables": [
      "tu",
      "sa",
      "me"
    ]
  },
  {
    "id": "genisa",
    "display": "ge-__-sa",
    "answer": "ni",
    "choices": [
      "nu",
      "ni",
      "no"
    ],
    "image": "🔤",
    "syllables": [
      "ge",
      "ni",
      "sa"
    ]
  },
  {
    "id": "pelangi",
    "display": "pe-__-gi",
    "answer": "lan",
    "choices": [
      "lan",
      "lana",
      "lam"
    ],
    "image": "🌈",
    "syllables": [
      "pe",
      "lan",
      "gi"
    ]
  },
  {
    "id": "cerminmu",
    "display": "cer-__-mu",
    "answer": "min",
    "choices": [
      "mim",
      "min",
      "mina"
    ],
    "image": "🔤",
    "syllables": [
      "cer",
      "min",
      "mu"
    ]
  },
  {
    "id": "penari",
    "display": "pe-__-ri",
    "answer": "na",
    "choices": [
      "na",
      "ne",
      "ni"
    ],
    "image": "💃",
    "syllables": [
      "pe",
      "na",
      "ri"
    ]
  },
  {
    "id": "jendela",
    "display": "jen-__-la",
    "answer": "de",
    "choices": [
      "de",
      "do",
      "di"
    ],
    "image": "🪟",
    "syllables": [
      "jen",
      "de",
      "la"
    ]
  },
  {
    "id": "perahu",
    "display": "pe-__-hu",
    "answer": "ra",
    "choices": [
      "re",
      "ri",
      "ra"
    ],
    "image": "🛶",
    "syllables": [
      "pe",
      "ra",
      "hu"
    ]
  },
  {
    "id": "wagere",
    "display": "wa-__-re",
    "answer": "ge",
    "choices": [
      "gi",
      "ge",
      "go"
    ],
    "image": "🔤",
    "syllables": [
      "wa",
      "ge",
      "re"
    ]
  },
  {
    "id": "rumahnya",
    "display": "ru-__-ya",
    "answer": "mahn",
    "choices": [
      "mahm",
      "mahna",
      "mahn"
    ],
    "image": "🏠",
    "syllables": [
      "ru",
      "mahn",
      "ya"
    ]
  },
  {
    "id": "harimau",
    "display": "ha-__-mau",
    "answer": "ri",
    "choices": [
      "ru",
      "ro",
      "ri"
    ],
    "image": "🐯",
    "syllables": [
      "ha",
      "ri",
      "mau"
    ]
  },
  {
    "id": "bantalku",
    "display": "ban-__-ku",
    "answer": "tal",
    "choices": [
      "tam",
      "tal",
      "tan"
    ],
    "image": "🔤",
    "syllables": [
      "ban",
      "tal",
      "ku"
    ]
  },
  {
    "id": "dowori",
    "display": "do-__-ri",
    "answer": "wo",
    "choices": [
      "wu",
      "wo",
      "wa"
    ],
    "image": "🔤",
    "syllables": [
      "do",
      "wo",
      "ri"
    ]
  },
  {
    "id": "lapangan",
    "display": "la-__-gan",
    "answer": "pan",
    "choices": [
      "pan",
      "pana",
      "pam"
    ],
    "image": "🔤",
    "syllables": [
      "la",
      "pan",
      "gan"
    ]
  },
  {
    "id": "komedi",
    "display": "ko-__-di",
    "answer": "me",
    "choices": [
      "mo",
      "me",
      "mi"
    ],
    "image": "🔤",
    "syllables": [
      "ko",
      "me",
      "di"
    ]
  },
  {
    "id": "pemandu",
    "display": "pe-__-du",
    "answer": "man",
    "choices": [
      "man",
      "mana",
      "mam"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "man",
      "du"
    ]
  },
  {
    "id": "perayaan",
    "display": "pe-__-yaan",
    "answer": "ra",
    "choices": [
      "ri",
      "ra",
      "re"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "ra",
      "yaan"
    ]
  },
  {
    "id": "tisedi",
    "display": "ti-__-di",
    "answer": "se",
    "choices": [
      "so",
      "si",
      "se"
    ],
    "image": "🔤",
    "syllables": [
      "ti",
      "se",
      "di"
    ]
  },
  {
    "id": "dogetu",
    "display": "do-__-tu",
    "answer": "ge",
    "choices": [
      "gi",
      "go",
      "ge"
    ],
    "image": "🔤",
    "syllables": [
      "do",
      "ge",
      "tu"
    ]
  },
  {
    "id": "renitu",
    "display": "re-__-tu",
    "answer": "ni",
    "choices": [
      "ni",
      "no",
      "nu"
    ],
    "image": "🔤",
    "syllables": [
      "re",
      "ni",
      "tu"
    ]
  },
  {
    "id": "terefu",
    "display": "te-__-fu",
    "answer": "re",
    "choices": [
      "ri",
      "ro",
      "re"
    ],
    "image": "🔤",
    "syllables": [
      "te",
      "re",
      "fu"
    ]
  },
  {
    "id": "pelajar",
    "display": "pe-__-jar",
    "answer": "la",
    "choices": [
      "le",
      "la",
      "li"
    ],
    "image": "🎓",
    "syllables": [
      "pe",
      "la",
      "jar"
    ]
  },
  {
    "id": "riseku",
    "display": "ri-__-ku",
    "answer": "se",
    "choices": [
      "so",
      "se",
      "si"
    ],
    "image": "🔤",
    "syllables": [
      "ri",
      "se",
      "ku"
    ]
  },
  {
    "id": "kelinci",
    "display": "ke-__-ci",
    "answer": "lin",
    "choices": [
      "lin",
      "lim",
      "lina"
    ],
    "image": "🐰",
    "syllables": [
      "ke",
      "lin",
      "ci"
    ]
  },
  {
    "id": "komputer",
    "display": "kom-__-ter",
    "answer": "pu",
    "choices": [
      "pu",
      "pa",
      "pe"
    ],
    "image": "🖥️",
    "syllables": [
      "kom",
      "pu",
      "ter"
    ]
  },
  {
    "id": "pesela",
    "display": "pe-__-la",
    "answer": "se",
    "choices": [
      "so",
      "se",
      "si"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "se",
      "la"
    ]
  },
  {
    "id": "perairan",
    "display": "pe-__-ran",
    "answer": "rai",
    "choices": [
      "rau",
      "rao",
      "rai"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "rai",
      "ran"
    ]
  },
  {
    "id": "mentega",
    "display": "men-__-ga",
    "answer": "te",
    "choices": [
      "ti",
      "te",
      "to"
    ],
    "image": "🧈",
    "syllables": [
      "men",
      "te",
      "ga"
    ]
  },
  {
    "id": "sekolah",
    "display": "se-__-lah",
    "answer": "ko",
    "choices": [
      "ku",
      "ko",
      "ka"
    ],
    "image": "🏫",
    "syllables": [
      "se",
      "ko",
      "lah"
    ]
  },
  {
    "id": "halaman",
    "display": "ha-__-man",
    "answer": "la",
    "choices": [
      "le",
      "la",
      "li"
    ],
    "image": "🏡",
    "syllables": [
      "ha",
      "la",
      "man"
    ]
  },
  {
    "id": "momowa",
    "display": "mo-__-wa",
    "answer": "mo",
    "choices": [
      "ma",
      "mo",
      "mu"
    ],
    "image": "🔤",
    "syllables": [
      "mo",
      "mo",
      "wa"
    ]
  },
  {
    "id": "tilofo",
    "display": "ti-__-fo",
    "answer": "lo",
    "choices": [
      "lo",
      "lu",
      "la"
    ],
    "image": "🔤",
    "syllables": [
      "ti",
      "lo",
      "fo"
    ]
  },
  {
    "id": "hacire",
    "display": "ha-__-re",
    "answer": "ci",
    "choices": [
      "ci",
      "co",
      "cu"
    ],
    "image": "🔤",
    "syllables": [
      "ha",
      "ci",
      "re"
    ]
  },
  {
    "id": "penjahit",
    "display": "pen-__-hit",
    "answer": "ja",
    "choices": [
      "ja",
      "je",
      "ji"
    ],
    "image": "🔤",
    "syllables": [
      "pen",
      "ja",
      "hit"
    ]
  },
  {
    "id": "petani",
    "display": "pe-__-ni",
    "answer": "ta",
    "choices": [
      "te",
      "ti",
      "ta"
    ],
    "image": "👨‍🌾",
    "syllables": [
      "pe",
      "ta",
      "ni"
    ]
  },
  {
    "id": "kelereng",
    "display": "ke-__-reng",
    "answer": "le",
    "choices": [
      "lo",
      "li",
      "le"
    ],
    "image": "🔤",
    "syllables": [
      "ke",
      "le",
      "reng"
    ]
  },
  {
    "id": "radio",
    "display": "ra-__-o",
    "answer": "di",
    "choices": [
      "do",
      "di",
      "du"
    ],
    "image": "📻",
    "syllables": [
      "ra",
      "di",
      "o"
    ]
  },
  {
    "id": "mupite",
    "display": "mu-__-te",
    "answer": "pi",
    "choices": [
      "po",
      "pi",
      "pu"
    ],
    "image": "🔤",
    "syllables": [
      "mu",
      "pi",
      "te"
    ]
  },
  {
    "id": "sidije",
    "display": "si-__-je",
    "answer": "di",
    "choices": [
      "di",
      "do",
      "du"
    ],
    "image": "🔤",
    "syllables": [
      "si",
      "di",
      "je"
    ]
  },
  {
    "id": "cahaya",
    "display": "ca-__-ya",
    "answer": "ha",
    "choices": [
      "he",
      "ha",
      "hi"
    ],
    "image": "💡",
    "syllables": [
      "ca",
      "ha",
      "ya"
    ]
  },
  {
    "id": "pemulung",
    "display": "pe-__-lung",
    "answer": "mu",
    "choices": [
      "ma",
      "me",
      "mu"
    ],
    "image": "🔤",
    "syllables": [
      "pe",
      "mu",
      "lung"
    ]
  },
  {
    "id": "rihiri",
    "display": "ri-__-ri",
    "answer": "hi",
    "choices": [
      "hu",
      "hi",
      "ho"
    ],
    "image": "🔤",
    "syllables": [
      "ri",
      "hi",
      "ri"
    ]
  },
  {
    "id": "tedike",
    "display": "te-__-ke",
    "answer": "di",
    "choices": [
      "di",
      "do",
      "du"
    ],
    "image": "🔤",
    "syllables": [
      "te",
      "di",
      "ke"
    ]
  },
  {
    "id": "telepon",
    "display": "te-__-pon",
    "answer": "le",
    "choices": [
      "lo",
      "li",
      "le"
    ],
    "image": "📞",
    "syllables": [
      "te",
      "le",
      "pon"
    ]
  },
  {
    "id": "fetela",
    "display": "fe-__-la",
    "answer": "te",
    "choices": [
      "to",
      "te",
      "ti"
    ],
    "image": "🔤",
    "syllables": [
      "fe",
      "te",
      "la"
    ]
  },
  {
    "id": "belajar",
    "display": "be-__-jar",
    "answer": "la",
    "choices": [
      "li",
      "la",
      "le"
    ],
    "image": "🔤",
    "syllables": [
      "be",
      "la",
      "jar"
    ]
  },
  {
    "id": "kowuri",
    "display": "ko-__-ri",
    "answer": "wu",
    "choices": [
      "wa",
      "we",
      "wu"
    ],
    "image": "🔤",
    "syllables": [
      "ko",
      "wu",
      "ri"
    ]
  },
  {
    "id": "karyawan",
    "display": "kar-__-wan",
    "answer": "ya",
    "choices": [
      "ye",
      "ya",
      "yi"
    ],
    "image": "👨‍💼",
    "syllables": [
      "kar",
      "ya",
      "wan"
    ]
  },
  {
    "id": "balopi",
    "display": "ba-__-pi",
    "answer": "lo",
    "choices": [
      "la",
      "lo",
      "lu"
    ],
    "image": "🔤",
    "syllables": [
      "ba",
      "lo",
      "pi"
    ]
  }
];

const generateTengahSukuKataQuestions = (): Question[] => {
  return tengahSukuKataData.map(item => {
    const fullWord = item.syllables.join('');
    return {
      id: item.id + '_tengah_suku_kata',
      type: 'tengah_suku_kata' as const,
      prompt: 'Lengkapi suku kata yang hilang di tengah kata',
      display: item.display,
      ttsText: fullWord,
      answer: item.answer,
      choices: shuffleArray(item.choices),
      image: item.image,
      word: fullWord,
      level: 'mudah',
      tags: ['tengah_suku_kata']
    };
  });
};

// Lengkapi Suku Kata Belakang — suku kata depan hilang (minimal 2 suku kata)
const lengkapiSukuKataBelakangData = [
  { id: 'sapu',    display: '__-pu',      answer: 'sa',  choices: ['sa','si','se'], image: '🧹' },
  { id: 'buka',    display: '__-ka',      answer: 'bu',  choices: ['bu','ba','bo'], image: '📖' },
  { id: 'topi',    display: '__-pi',      answer: 'to',  choices: ['to','ta','ti'], image: '🎩' },
  { id: 'roda',    display: '__-da',      answer: 'ro',  choices: ['ro','ra','ri'], image: '🛞' },
  { id: 'baju',    display: '__-ju',      answer: 'ba',  choices: ['ba','bi','be'], image: '👕' },
  { id: 'mata',    display: '__-ta',      answer: 'ma',  choices: ['ma','mi','me'], image: '👁️' },
  { id: 'kaki',    display: '__-ki',      answer: 'ka',  choices: ['ka','ki','ke'], image: '🦵' },
  { id: 'nasi',    display: '__-si',      answer: 'na',  choices: ['na','ni','ne'], image: '🍚' },
  { id: 'gigi',    display: '__-gi',      answer: 'gi',  choices: ['gi','ga','ge'], image: '🦷' },
  { id: 'dada',    display: '__-da',      answer: 'da',  choices: ['da','di','de'], image: '🫁' },
  { id: 'mama',    display: '__-ma',      answer: 'ma',  choices: ['ma','mi','me'], image: '👩' },
  { id: 'papa',    display: '__-pa',      answer: 'pa',  choices: ['pa','pi','pe'], image: '👨' },
  { id: 'susu',    display: '__-su',      answer: 'su',  choices: ['su','si','se'], image: '🥛' },
  { id: 'kuku',    display: '__-ku',      answer: 'ku',  choices: ['ku','ka','ke'], image: '💅' },
  { id: 'lala',    display: '__-la',      answer: 'la',  choices: ['la','li','le'], image: '🎵' },
  { id: 'tahu',    display: '__-hu',      answer: 'ta',  choices: ['ta','ti','te'], image: '🧈' },
  { id: 'soto',    display: '__-to',      answer: 'so',  choices: ['so','sa','si'], image: '🍲' },
  { id: 'kopi',    display: '__-pi',      answer: 'ko',  choices: ['ko','ka','ki'], image: '☕' },
  { id: 'air',     display: '__-ir',      answer: 'a',   choices: ['a','i','e'],   image: '💧' },
  { id: 'lari',    display: '__-ri',      answer: 'la',  choices: ['la','li','le'], image: '🏃' },
  { id: 'babi',    display: '__-bi',      answer: 'ba',  choices: ['ba','be','bo'], image: '🐖' },
  { id: 'cari',    display: '__-ri',      answer: 'ca',  choices: ['ca','ci','ce'], image: '🔍' },
  { id: 'duri',    display: '__-ri',      answer: 'du',  choices: ['du','di','de'], image: '🌵' },
  { id: 'foto',    display: '__-to',      answer: 'fo',  choices: ['fo','fa','fi'], image: '📷' },
  { id: 'guru',    display: '__-ru',      answer: 'gu',  choices: ['gu','ga','ge'], image: '👩‍🏫' },
  { id: 'hati',    display: '__-ti',      answer: 'ha',  choices: ['ha','hi','he'], image: '❤️' },
  { id: 'ikan',    display: '__-kan',     answer: 'i',   choices: ['i','e','a'],   image: '🐟' },
  { id: 'jari',    display: '__-ri',      answer: 'ja',  choices: ['ja','ji','je'], image: '👆' },
  { id: 'kota',    display: '__-ta',      answer: 'ko',  choices: ['ko','ka','ki'], image: '🏙️' },
  { id: 'lucu',    display: '__-cu',      answer: 'lu',  choices: ['lu','la','le'], image: '😄' },
  { id: 'meja',    display: '__-ja',      answer: 'me',  choices: ['me','ma','mi'], image: '🪑' },
  { id: 'nada',    display: '__-da',      answer: 'na',  choices: ['na','ni','ne'], image: '🎵' },
  { id: 'pagi',    display: '__-gi',      answer: 'pa',  choices: ['pa','pi','pe'], image: '🌅' },
  { id: 'rusa',    display: '__-sa',      answer: 'ru',  choices: ['ru','ra','ri'], image: '🦌' },
  { id: 'sapi',    display: '__-pi',      answer: 'sa',  choices: ['sa','si','se'], image: '🐄' },
  { id: 'tangan',  display: '__-gan',     answer: 'tan', choices: ['tan','tin','ten'], image: '✋' }, // tang-ga
  { id: 'ular',    display: '__-lar',     answer: 'u',   choices: ['u','o','a'],   image: '🐍' },
  { id: 'wangi',   display: '__-ngi',     answer: 'wa',  choices: ['wa','wi','we'], image: '🌸' },
  { id: 'bola',    display: '__-la',      answer: 'bo',  choices: ['bo','ba','bi'], image: '⚽' },
  { id: 'cinta',   display: '__-ta',      answer: 'cin', choices: ['cin','can','cen'], image: '💕' },
  { id: 'dapur',   display: '__-pur',     answer: 'da',  choices: ['da','di','de'], image: '🍳' },
  { id: 'emas',    display: '__-mas',     answer: 'e',   choices: ['e','a','i'],   image: '🪙' },
  { id: 'gula',    display: '__-la',      answer: 'gu',  choices: ['gu','ga','gi'], image: '🍯' },
  { id: 'hujan',   display: '__-jan',     answer: 'hu',  choices: ['hu','ha','hi'], image: '🌧️' },
  { id: 'jaket',   display: '__-ket',     answer: 'ja',  choices: ['ja','ji','je'], image: '🧥' },
  { id: 'kamar',   display: '__-mar',     answer: 'ka',  choices: ['ka','ki','ke'], image: '🛏️' },
  { id: 'laptop',  display: '__-top',     answer: 'lap', choices: ['lap','lip','lep'], image: '💻' },
  { id: 'mobil',   display: '__-bil',     answer: 'mo',  choices: ['mo','ma','mi'], image: '🚗' },
  { id: 'novel',   display: '__-vel',     answer: 'no',  choices: ['no','na','ni'], image: '📚' },
  { id: 'pantai',  display: '__-tai',     answer: 'pan', choices: ['pan','pin','pen'], image: '🏖️' },
  { id: 'rumah',   display: '__-mah',     answer: 'ru',  choices: ['ru','ra','ri'], image: '🏠' },
  { id: 'sepatu',  display: '__-pa-tu',   answer: 'se',  choices: ['se','sa','si'], image: '👟' },
  { id: 'uang',    display: '__-ang',     answer: 'u',   choices: ['u','o','a'],   image: '💰' },
  { id: 'vitamin', display: '__-ta-min',  answer: 'vi',  choices: ['vi','va','ve'], image: '💊' },
  { id: 'warna',   display: '__-na',      answer: 'war', choices: ['war','wan','wer'], image: '🎨' }, // war-na
  { id: 'telepon', display: '__-le-pon',  answer: 'te',  choices: ['te','ta','ti'], image: '📞' },
  { id: 'kucing',  display: '__-cing',    answer: 'ku',  choices: ['ku','ka','ki'], image: '🐱' },
  { id: 'mangga',  display: '__-ga',      answer: 'mang',choices: ['mang','man','meng'], image: '🥭' }, // mang-ga
  { id: 'pisang',  display: '__-sang',    answer: 'pi',  choices: ['pi','pa','pe'], image: '🍌' },
  { id: 'kelapa',  display: '__-la-pa',   answer: 'ke',  choices: ['ke','ka','ki'], image: '🥥' },
  { id: 'jeruk',   display: '__-ruk',     answer: 'je',  choices: ['je','ja','ji'], image: '🍊' },
  { id: 'wortel',  display: '__-tel',     answer: 'wor', choices: ['wor','war','wir'], image: '🥕' }, // wor-tel
  { id: 'ayam',    display: '__-yam',     answer: 'a',   choices: ['a','i','e'],   image: '🐔' },
  { id: 'telur',   display: '__-lur',     answer: 'te',  choices: ['te','ta','ti'], image: '🥚' },
  { id: 'itik',    display: '__-tik',     answer: 'i',   choices: ['i','e','a'],   image: '🦆' },
  { id: 'kambing', display: '__-bing',    answer: 'kam', choices: ['kam','kem','kim'], image: '🐐' },
  { id: 'boneka',  display: '__-ne-ka',   answer: 'bo',  choices: ['bo','ba','bi'], image: '🧸' },
  { id: 'balok',   display: '__-lok',     answer: 'ba',  choices: ['ba','bi','be'], image: '🧱' },
  { id: 'kunci',   display: '__-ci',      answer: 'kun', choices: ['kun','kan','kin'], image: '🔑' },
  { id: 'lemari',  display: '__-ma-ri',   answer: 'le',  choices: ['le','la','li'], image: '🗄️' },
  { id: 'kasur',   display: '__-sur',     answer: 'ka',  choices: ['ka','ki','ke'], image: '🛏️' },
  { id: 'bantal',  display: '__-ntal',    answer: 'ban', choices: ['ban','ben','bin'], image: '🛏️' },
  { id: 'cermin',  display: '__-min',     answer: 'cer', choices: ['cer','car','cir'], image: '🪞' },
  { id: 'lampu',   display: '__-pu',      answer: 'lam', choices: ['lam','lem','lim'], image: '💡' },
  { id: 'kipas',   display: '__-pas',     answer: 'ki',  choices: ['ki','ka','ke'], image: '🌀' },
  { id: 'radio',   display: '__-dio',     answer: 'ra',  choices: ['ra','ri','re'], image: '📻' },
  { id: 'kompor',  display: '__-por',     answer: 'kom', choices: ['kom','kam','kem'], image: '🔥' },
  { id: 'wajan',   display: '__-jan',     answer: 'wa',  choices: ['wa','wi','we'], image: '🍳' },
  { id: 'piring',  display: '__-ring',    answer: 'pi',  choices: ['pi','pa','pe'], image: '🍽️' },
  { id: 'gelas',   display: '__-las',     answer: 'ge',  choices: ['ge','ga','gi'], image: '🥤' },
  { id: 'sendok',  display: '__-ndok',    answer: 'sen', choices: ['sen','san','sin'], image: '🥄' },
  { id: 'garpu',   display: '__-rpu',     answer: 'gar', choices: ['gar','ger','gir'], image: '🍴' },
  { id: 'pisau',   display: '__-sau',     answer: 'pi',  choices: ['pi','pa','pe'], image: '🔪' },
  { id: 'ember',   display: '__-ber',     answer: 'em',  choices: ['em','am','im'], image: '🪣' },
  { id: 'kain',    display: '__-in',      answer: 'ka',  choices: ['ka','ki','ke'], image: '🧺' },
  { id: 'sabun',   display: '__-bun',     answer: 'sa',  choices: ['sa','si','se'], image: '🧼' },
  { id: 'sikat',   display: '__-kat',     answer: 'si',  choices: ['si','sa','se'], image: '🪥' },
  { id: 'sampo',   display: '__-po',      answer: 'sam', choices: ['sam','sem','sim'], image: '🧴' },
  { id: 'handuk',  display: '__-duk',     answer: 'han', choices: ['han','hen','hin'], image: '🛁' },
  { id: 'tisu',    display: '__-su',      answer: 'ti',  choices: ['ti','ta','te'], image: '🧻' },
  { id: 'roti',    display: '__-ti',      answer: 'ro',  choices: ['ro','ra','ri'], image: '🍞' },
  { id: 'kue',     display: '__-e',       answer: 'ku',  choices: ['ku','ke','ki'], image: '🍰' },
  { id: 'buah',    display: '__-ah',      answer: 'bu',  choices: ['bu','ba','bi'], image: '🍎' },
  { id: 'kupu',    display: '__-pu',      answer: 'ku',  choices: ['ku','ka','ki'], image: '🦋' },
  { id: 'bunga',   display: '__-nga',     answer: 'bu',  choices: ['bu','ba','bi'], image: '🌸' },
  { id: 'burung',  display: '__-rung',    answer: 'bu',  choices: ['bu','ba','bi'], image: '🐦' },
  { id: 'cangkir', display: '__-kir',     answer: 'cang',choices: ['cang','cing','ceng'], image: '☕' },
  { id: 'mainan',  display: '__-nan',     answer: 'mai', choices: ['mai','mi','me'], image: '🧸' },
  { id: 'piano',   display: '__-a-no',    answer: 'pi',  choices: ['pi','pa','pe'], image: '🎹' },
  { id: 'jalan',   display: '__-lan',     answer: 'ja',  choices: ['ja','ji','je'], image: '🛤️' },
  { id: 'laut',    display: '__-ut',      answer: 'la',  choices: ['la','li','le'], image: '🌊' },
  { id: 'kepala',  display: '__-pa-la',   answer: 'ke',  choices: ['ke','ka','ki'], image: '🙂' },
  { id: 'pintu',   display: '__-tu',      answer: 'pin', choices: ['pin','pan','pen'], image: '🚪' },
  { id: 'rambut',  display: '__-but',     answer: 'ram', choices: ['ram','rem','rim'], image: '💇' },
  { id: 'tangga',  display: '__-ga',      answer: 'tang',choices: ['tang','ting','teng'], image: '🪜' },
  { id: 'angin',   display: '__-ngin',    answer: 'a',   choices: ['a','i','e'],   image: '💨' },
  { id: 'kertas',  display: '__-tas',     answer: 'ker', choices: ['ker','kar','kir'], image: '📄' },
  { id: 'zaitun',  display: '__-tun',     answer: 'zai', choices: ['zai','ze','zi'], image: '🫒' }
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
    "image": "🍞"
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
    "image": "🏃"
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
    "image": "🐍"
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
    "image": "👵"
  },
  {
    "image": "🦑"
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
    "image": "🦋"
  },
  {
    "image": "✈️"
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
    "image": "🏀"
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
    "image": "🏞️"
  },
  {
    "image": "🐔"
  },
  {
    "image": "⭐"
  },
  {
    "image": "🏞️"
  },
  {
    "image": "🚆"
  },
  {
    "image": "🌅"
  },
  {
    "image": "🍲"
  },
  {
    "image": "🫒"
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
    "image": "��"
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
  return lengkapiSukaKataData
    .filter(item => item.id && item.display && item.answer && item.choices && Array.isArray(item.choices))
    .map(item => {
      // Double-check choices is an array before using it
      const choices = Array.isArray(item.choices) ? item.choices : [];
      return {
        id: item.id!,
        type: 'lengkapi_suku_kata' as const,
        prompt: 'Lengkapi kata dengan suku kata yang tepat',
        display: item.display!,
        ttsText: item.id!,
        answer: item.answer!,
        choices: shuffleArray(choices),
        image: item.image,
        word: item.id!,
        level: 'mudah' as const,
        tags: ['lengkapi_suku_kata'] as const
      };
    });
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
    case 'tengah_suku_kata':
      allQuestions = generateTengahSukuKataQuestions();
      break;
    case 'lengkapi_suku_kata':
      allQuestions = generateLengkapiSukaKataQuestions();
      break;
    case 'lengkapi_suku_kata_belakang':
      allQuestions = generateLengkapiSukuKataBelakangQuestions();
      break;
  }
  
  // Basic validation to drop malformed entries
  const isValid = (q: any) => q && typeof q.id === 'string' && typeof q.answer === 'string' && Array.isArray(q.choices) && q.choices.length > 0 && typeof q.display !== 'undefined';
  allQuestions = allQuestions.filter(isValid);

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

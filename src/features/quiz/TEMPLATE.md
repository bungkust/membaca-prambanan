# 📚 Template untuk Menambah Quiz Baru

Template ini memudahkan Anda menambah quiz baru (Bahasa, Matematika, IPA, IPS, dll) dengan **minimal coding** - cukup isi data!

## 🚀 Quick Start (5 Langkah)

### 1. Buat Folder Quiz Baru

```bash
mkdir src/features/quiz/[nama_quiz]
```

Contoh: `src/features/quiz/matematikaPenjumlahan`

### 2. Buat `data.ts` - Isi Soal-Soal

```typescript
/**
 * Interface untuk data quiz Anda
 * Sesuaikan dengan kebutuhan
 */
export interface MatematikaPenjumlahanItem {
  id: string;              // Unique ID, e.g., "2+3"
  answer: string;          // Jawaban benar, e.g., "5"
  choices: string[];       // Array pilihan jawaban
  display?: string;        // Tampilan soal (optional)
  ttsText?: string;        // Teks untuk TTS (optional)
  image?: string;          // Emoji atau image (optional)
  level?: 'mudah' | 'sedang' | 'sulit';
}

export const matematikaPenjumlahanData: MatematikaPenjumlahanItem[] = [
  {
    id: "2+3",
    answer: "5",
    choices: ["4", "5", "6"],
    display: "2 + 3 = ?",
    ttsText: "dua ditambah tiga",
    image: "🔢",
    level: "mudah"
  },
  {
    id: "5+4",
    answer: "9",
    choices: ["8", "9", "10"],
    display: "5 + 4 = ?",
    ttsText: "lima ditambah empat",
    image: "🔢",
    level: "mudah"
  },
  // Tambahkan soal-soal lainnya...
];
```

### 3. Buat `metadata.ts` - Info Quiz

```typescript
import { QuizMetadata } from '../types';

export const metadata: QuizMetadata = {
  id: 'matematika_penjumlahan',  // ID unik, snake_case
  emoji: '🔢',                     // Emoji untuk icon
  title: 'Penjumlahan',           // Judul quiz
  description: 'Belajar penjumlahan dasar',
  count: '50 Soal',
  badge: 'Matematika',
  gradient: 'from-blue-500 to-cyan-600',
  defaultQuestions: 10,
  minQuestions: 5,
  maxQuestions: 20,
};
```

### 4. Buat `generator.ts` - Hanya 3 Baris!

```typescript
import { createMathQuizGenerator } from '../utils/generators';
import { matematikaPenjumlahanData } from './data';

/**
 * Generator untuk quiz matematika penjumlahan
 * Hanya perlu 3 baris kode!
 */
export const generateMatematikaPenjumlahanQuestions = createMathQuizGenerator(
  matematikaPenjumlahanData,
  'matematika_penjumlahan',
  'Berapa hasil penjumlahan?'
);
```

**Atau untuk quiz bahasa:**
```typescript
import { createLanguageQuizGenerator } from '../utils/generators';
import { sinonimData } from './data';

export const generateSinonimQuestions = createLanguageQuizGenerator(
  sinonimData,
  'bahasa_sinonim',
  'Pilih kata yang memiliki arti sama'
);
```

### 5. Buat `index.ts` - Export Quiz

```typescript
import { QuizDefinition } from '../types';
import { metadata } from './metadata';
import { generateMatematikaPenjumlahanQuestions } from './generator';
import { filterAndSelectQuestions } from '../utils';

const matematikaPenjumlahanQuiz: QuizDefinition = {
  metadata,
  generateQuestions: (count: number, seenIds: Set<string>) => {
    const allQuestions = generateMatematikaPenjumlahanQuestions();
    return filterAndSelectQuestions(allQuestions, count, seenIds);
  },
};

export function getQuizDefinition(): QuizDefinition {
  return matematikaPenjumlahanQuiz;
}

export default matematikaPenjumlahanQuiz;
```

### 6. Register di `registry.ts` - Tambah 2 Baris

```typescript
// Di bagian import
import { getQuizDefinition as getMatematikaPenjumlahan } from './matematikaPenjumlahan';

// Di QUIZ_REGISTRY object
export const QUIZ_REGISTRY = {
  // ... existing quizzes ...
  matematika_penjumlahan: getMatematikaPenjumlahan(),
} as const;
```

### 7. Update Type (Optional - jika perlu type baru)

Jika quiz type belum ada di `src/types/quiz.ts`, tambahkan:

```typescript
type: 'read_syllable' | 'awal_kata' | ... | 'matematika_penjumlahan';
```

## 📋 Template Generator Functions

### `createMathQuizGenerator` - Untuk Quiz Matematika
```typescript
createMathQuizGenerator(data, quizType, prompt)
```

### `createLanguageQuizGenerator` - Untuk Quiz Bahasa
```typescript
createLanguageQuizGenerator(data, quizType, prompt)
```

### `createQuizGenerator` - Custom Generator (Fleksibel)
```typescript
createQuizGenerator(data, {
  quizType: 'custom_quiz',
  defaultPrompt: 'Pilih jawaban yang benar',
  getDisplay: (item) => item.display || item.id,
  getTtsText: (item) => item.ttsText || item.id,
  getImage: (item) => item.image,
  // ... custom config
})
```

## 🎯 Contoh untuk Berbagai Jenis Quiz

### Matematika (Penjumlahan)
```typescript
// generator.ts
export const generateMathQuestions = createMathQuizGenerator(
  mathData,
  'matematika_penjumlahan',
  'Berapa hasil penjumlahan?'
);
```

### Bahasa (Sinonim)
```typescript
// generator.ts
export const generateSinonimQuestions = createLanguageQuizGenerator(
  sinonimData,
  'bahasa_sinonim',
  'Pilih kata yang memiliki arti sama'
);
```

### IPA (Hewan)
```typescript
// generator.ts
export const generateHewanQuestions = createLanguageQuizGenerator(
  hewanData,
  'ipa_hewan',
  'Pilih nama hewan yang benar'
);
```

### IPS (Negara)
```typescript
// generator.ts
export const generateNegaraQuestions = createLanguageQuizGenerator(
  negaraData,
  'ips_negara',
  'Pilih nama negara yang benar'
);
```

## ✅ Checklist

- [ ] Buat folder `src/features/quiz/[nama_quiz]/`
- [ ] Buat `data.ts` dengan array soal
- [ ] Buat `metadata.ts` dengan info quiz
- [ ] Buat `generator.ts` (3 baris dengan template)
- [ ] Buat `index.ts` (copy template)
- [ ] Import & register di `registry.ts` (2 baris)
- [ ] Tambah type di `types/quiz.ts` jika perlu (1 baris)

## 🎨 Design Otomatis Konsisten

- ✅ UI components sudah generic - tidak perlu diubah
- ✅ Design system konsisten otomatis
- ✅ Quiz otomatis muncul di QuizSelection
- ✅ Type-safe dengan TypeScript

## 💡 Tips

1. **ID harus unique** - Gunakan format yang jelas, e.g., `"2+3"`, `"kata_sinonim_1"`
2. **Choices minimal 3** - Untuk multiple choice yang baik
3. **Image optional** - Bisa pakai emoji atau kosong
4. **Level optional** - Default 'mudah' jika tidak diisi
5. **TTS Text** - Penting untuk accessibility, isi dengan baik

## 🚨 Troubleshooting

**Quiz tidak muncul di UI?**
- Pastikan sudah register di `registry.ts`
- Pastikan `getQuizDefinition()` export benar

**Type error?**
- Pastikan sudah tambah type di `types/quiz.ts`
- Pastikan `quizType` di generator sesuai dengan type

**Generator error?**
- Pastikan data mengikuti interface `BaseQuizItem`
- Pastikan `answer` ada di `choices`

---

**Selamat membuat quiz baru! 🎉**


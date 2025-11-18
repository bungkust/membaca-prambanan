## Design System (Quiz)

Komponen dan token visual untuk konsistensi halaman kuis. Gunakan ini saat menambah jenis kuis baru (acuan "awal_kata").

### Komponen

- `src/components/design/QuizLayout.tsx`
  - Wrapper halaman kuis (background + container). Slot: `topBar`.

- `src/components/design/QuizHeader.tsx`
  - Header dengan tombol kembali + slot kanan (stats/aksi).

- `src/components/design/QuizStats.tsx`
  - Badge timer dan bintang yang konsisten.

- `src/components/design/QuizProgress.tsx`
  - Progress bar dengan label "Soal X dari Y" dan opsional `level`.

- `src/components/design/QuizCard.tsx`
  - Kartu utama konten soal, gambar, prompt, dan tombol audio.

- `src/components/design/QuizOption.tsx`
  - Tombol opsi jawaban dengan state: selected, correct/incorrect, feedback.

- `src/components/design/PermissionGate.tsx`
  - Pembungkus izin audio. Jika izin belum aktif, menampilkan `AudioPermission`.

### Design Tokens (dari Tailwind + CSS variables)

- Typography
  - Font family: `Nunito, sans-serif` (diatur di `src/index.css` via Google Fonts)
  - Heading scale (rekomendasi):
    - H1: `text-4xl` hingga `text-5xl` (hero, judul halaman)
    - H2: `text-3xl` hingga `text-4xl` (judul soal)
    - H3: `text-2xl` hingga `text-3xl` (feedback/section)
    - Body: `text-base`–`text-lg`; Muted: `text-muted-foreground`
  - Quiz choice: `text-3xl font-bold` (konsisten di `QuizOption`)

- Warna (HSL via CSS variables di `src/index.css` dipetakan ke Tailwind theme di `tailwind.config.ts`)
  - Latar: `bg-background` (HSL var `--background`)
  - Teks: `text-foreground`
  - Utama: `primary` (DEFAULT + `primary.vibrant` + `primary.light`)
  - Aksen: `accent`
  - Sekunder: `secondary`
  - Keberhasilan: `success`
  - Peringatan: `warning`
  - Bahaya: `destructive`
  - Netral lembut: `muted` dan `muted-foreground`
  - Border/Input/Ring: `border`, `input`, `ring`
  - Kartu/Popover: `card`, `popover`

- Gradient (CSS variables)
  - `--gradient-primary`: 135° dari `primary` ke `accent`
  - `--gradient-secondary`: 135° dari `secondary` ke `warning`
  - `--gradient-success`: 135° hijau ke kebiruan
  - Contoh Tailwind: `bg-gradient-to-br from-primary/20 to-accent/20`

- Radius (di `:root` dan dipetakan ke Tailwind)
  - `--radius: 1rem` → `rounded-3xl` untuk kartu besar, `rounded-full` untuk pill
  - Token Tailwind: `rounded-lg`, `rounded-md`, `rounded-sm` mengikuti kalkulasi `--radius`

- Elevation / Shadow
  - `shadow-playful`: drop shadow untuk kartu besar (gunakan kelas `.shadow-playful`)
  - `shadow-button`: drop shadow untuk tombol (gunakan `.shadow-button`)

- Motion
  - Klik tombol: `.btn-bounce` (skala 0.95 saat active)
  - Feedback popup: `.popup-bounce` (animasi scale in)
  - Card entrance: `.slide-up`
  - Accordion: `tailwindcss-animate` preset (`accordion-up/down`)

- Spacing & Layout
  - Kontainer halaman kuis: max width `max-w-3xl`, padding container `p-8` di kartu
  - Grid opsi: `grid grid-cols-1 md:grid-cols-3 gap-4`
  - Section spacing: `mb-6` umum, `mb-8` untuk blok besar

### States & Interaksi

- Opsi Jawaban (`QuizOption`)
  - Default: gradient lembut `from-primary/20 to-accent/20`
  - Hover: `hover:from-primary/30 hover:to-accent/30`
  - Selected (sebelum feedback): `bg-primary text-white`
  - Setelah feedback:
    - Benar: `bg-success text-white`
    - Salah (yang dipilih): `bg-destructive text-white`
    - Lainnya: `opacity-50` (non-dominan)

- Stats (`QuizStats`)
  - Timer pill: icon ⏰ + `text-xl font-bold`
  - Stars pill: icon ⭐ + `text-xl font-bold`

- Progress (`QuizProgress`)
  - Label kiri: "Soal X dari Y"
  - Label kanan opsional: `Level: ...`
  - Bar: `h-3` menggunakan komponen `ui/progress`

### Aksesibilitas

- Kontras teks pada tombol berwarna: gunakan `text-white` pada state aktif/benar/salah
- Target sentuh tombol opsi: `h-24` minimum
- Tidak memutar suara otomatis; suara dipicu lewat tombol "Dengarkan"

### Pola Halaman (Acuan awal_kata)

1. Bungkus halaman dengan `QuizLayout`.
2. Gunakan `QuizHeader` di `topBar` dan isi bagian kanan dengan `QuizStats`.
3. Tampilkan `QuizProgress` sebelum kartu soal.
4. Letakkan isi soal dalam `QuizCard`.
5. Render opsi menggunakan `QuizOption` (grid 1 / 3 kolom).
6. Jika perlu izin audio lebih awal, bungkus root halaman dengan `PermissionGate`.

### Contoh Singkat

```tsx
<QuizLayout topBar={<QuizHeader onBack={onBack} right={<QuizStats showTimer timeRemaining={10} stars={3} />} />}>
  <QuizProgress current={2} total={10} level="Mudah" />
  <QuizCard>
    {/* Konten Soal + Tombol Audio */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {choices.map(c => (
        <QuizOption key={c} label={c} isSelected={c===selected} isAnswer={c===answer} showFeedback={show} isCorrect={isCorrect} onSelect={() => select(c)} />
      ))}
    </div>
  </QuizCard>
</QuizLayout>
```

### Catatan

- Komponen UI dasar (button, progress, dsb) tetap berasal dari `src/components/ui`.
- Styling mengikuti kelas Tailwind yang sudah dipakai di repo (gradient, shadow, rounded, dsb).
- Cakupan suara/TTS tetap dipicu manual oleh tombol (akses via `utils/tts`).
 - Warna dapat diubah terpusat melalui CSS variables di `src/index.css` tanpa perlu ubah komponen.



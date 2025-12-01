# Daftar Lengkap Asset yang Dibutuhkan

Dokumen ini berisi daftar lengkap semua asset (icon, splash screen, screenshots, dll) yang diperlukan untuk aplikasi **Kuis Belajar Membaca**.

---

## 📋 Daftar Isi

1. [Icon Android (Adaptive Icon)](#1-icon-android-adaptive-icon)
2. [Splash Screen](#2-splash-screen)
3. [Google Play Store Assets](#3-google-play-store-assets-wajib)
4. [Web/PWA Icons](#4-webpwa-icons-untuk-web-version)
5. [Social Media / Sharing Assets](#5-social-media--sharing-assets)
6. [Promo Video (Opsional)](#6-promo-video-opsional)
7. [Checklist Ringkas](#checklist-ringkas-asset-yang-perlu-dibuat)
8. [Tools untuk Generate Multi-Resolution](#tools-untuk-generate-multi-resolution)

---

## 1. Icon Android (Adaptive Icon)

### Base Asset (Source File - Untuk Dibuat Designer)

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `ic_launcher_foreground.png` | **1024x1024 px** | PNG 32-bit | Source | Foreground icon (safe zone 512x512 px di tengah) |
| `ic_launcher_background.png` | **1024x1024 px** | PNG 24-bit | Source | Background icon (atau warna solid) |

**Catatan:** 
- Adaptive icon terdiri dari foreground + background
- Safe zone untuk foreground adalah **512x512 px di tengah** dari 1024x1024 px
- Elemen penting harus berada dalam safe zone agar tidak terpotong di berbagai bentuk icon

### Generated Icons (Otomatis generate dari base, atau buat manual)

Icons ini akan di-generate dari base 1024x1024 px menggunakan Android Asset Studio atau tools lainnya.

#### Foreground Icons (ic_launcher_foreground.png)

| Nama File | Ukuran | Format | Lokasi | Density |
|-----------|--------|--------|--------|---------|
| `ic_launcher_foreground.png` | 48x48 px | PNG | `android/app/src/main/res/mipmap-mdpi/` | MDPI (160 dpi) |
| `ic_launcher_foreground.png` | 72x72 px | PNG | `android/app/src/main/res/mipmap-hdpi/` | HDPI (240 dpi) |
| `ic_launcher_foreground.png` | 96x96 px | PNG | `android/app/src/main/res/mipmap-xhdpi/` | XHDPI (320 dpi) |
| `ic_launcher_foreground.png` | 144x144 px | PNG | `android/app/src/main/res/mipmap-xxhdpi/` | XXHDPI (480 dpi) |
| `ic_launcher_foreground.png` | 192x192 px | PNG | `android/app/src/main/res/mipmap-xxxhdpi/` | XXXHDPI (640 dpi) |

#### Legacy Launcher Icons (ic_launcher.png)

| Nama File | Ukuran | Format | Lokasi | Density |
|-----------|--------|--------|--------|---------|
| `ic_launcher.png` | 48x48 px | PNG | `android/app/src/main/res/mipmap-mdpi/` | MDPI |
| `ic_launcher.png` | 72x72 px | PNG | `android/app/src/main/res/mipmap-hdpi/` | HDPI |
| `ic_launcher.png` | 96x96 px | PNG | `android/app/src/main/res/mipmap-xhdpi/` | XHDPI |
| `ic_launcher.png` | 144x144 px | PNG | `android/app/src/main/res/mipmap-xxhdpi/` | XXHDPI |
| `ic_launcher.png` | 192x192 px | PNG | `android/app/src/main/res/mipmap-xxxhdpi/` | XXXHDPI |

#### Round Launcher Icons (ic_launcher_round.png)

| Nama File | Ukuran | Format | Lokasi | Density |
|-----------|--------|--------|--------|---------|
| `ic_launcher_round.png` | 48x48 px | PNG | `android/app/src/main/res/mipmap-mdpi/` | MDPI |
| `ic_launcher_round.png` | 72x72 px | PNG | `android/app/src/main/res/mipmap-hdpi/` | HDPI |
| `ic_launcher_round.png` | 96x96 px | PNG | `android/app/src/main/res/mipmap-xhdpi/` | XHDPI |
| `ic_launcher_round.png` | 144x144 px | PNG | `android/app/src/main/res/mipmap-xxhdpi/` | XXHDPI |
| `ic_launcher_round.png` | 192x192 px | PNG | `android/app/src/main/res/mipmap-xxxhdpi/` | XXXHDPI |

**Total: 15 icon files** (dari 1 base file 1024x1024 px)

---

## 2. Splash Screen

### Base Asset (Source File)

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `splash_portrait.png` | **1080x1920 px** | PNG 24-bit | Source | Splash portrait (wajib) |
| `splash_landscape.png` | **1920x1080 px** | PNG 24-bit | Source | Splash landscape (opsional, jika app support landscape) |

**Desain Splash Screen:**
- Background color: `#ffffff` (putih) - sesuai konfigurasi di `capacitor.config.ts`
- Logo/Icon di tengah
- Branding aplikasi (nama app, tagline)
- Minimalis dan clean

### Generated Splash Screens (Per Density & Orientasi)

#### Portrait Orientation

| Nama File | Ukuran | Format | Lokasi | Density |
|-----------|--------|--------|--------|---------|
| `splash.png` | 320x480 px | PNG | `android/app/src/main/res/drawable-port-mdpi/` | MDPI |
| `splash.png` | 480x800 px | PNG | `android/app/src/main/res/drawable-port-hdpi/` | HDPI |
| `splash.png` | 720x1280 px | PNG | `android/app/src/main/res/drawable-port-xhdpi/` | XHDPI |
| `splash.png` | 1080x1920 px | PNG | `android/app/src/main/res/drawable-port-xxhdpi/` | XXHDPI |
| `splash.png` | 1440x2560 px | PNG | `android/app/src/main/res/drawable-port-xxxhdpi/` | XXXHDPI |

#### Landscape Orientation (Jika diperlukan)

| Nama File | Ukuran | Format | Lokasi | Density |
|-----------|--------|--------|--------|---------|
| `splash.png` | 480x320 px | PNG | `android/app/src/main/res/drawable-land-mdpi/` | MDPI |
| `splash.png` | 800x480 px | PNG | `android/app/src/main/res/drawable-land-hdpi/` | HDPI |
| `splash.png` | 1280x720 px | PNG | `android/app/src/main/res/drawable-land-xhdpi/` | XHDPI |
| `splash.png` | 1920x1080 px | PNG | `android/app/src/main/res/drawable-land-xxhdpi/` | XXHDPI |
| `splash.png` | 2560x1440 px | PNG | `android/app/src/main/res/drawable-land-xxxhdpi/` | XXXHDPI |

#### Default Splash

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `splash.png` | 1080x1920 px | PNG | `android/app/src/main/res/drawable/` | Default portrait |

**Total: 11 splash screen files** (dari 1 base file 1080x1920 px)

---

## 3. Google Play Store Assets (WAJIB)

### Icon Play Store

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `play-store-icon.png` | **512x512 px** | PNG 32-bit | Assets folder | High-res icon untuk Play Store listing |

**Desain Icon:**
- Harus jelas dan menarik
- Hindari teks kecil
- Warna kontras tinggi
- Representasi visual dari aplikasi
- Lihat detail di `docs/ICON_DESCRIPTION.md`

### Feature Graphic (Banner Header)

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `feature-graphic.png` | **1024x500 px** | PNG/JPEG 24-bit | Assets folder | Banner header Play Store (NO transparency) |

**Desain Feature Graphic:**
- Ratio: 2.048:1
- Tidak ada elemen penting di pinggir (akan terpotong di beberapa device)
- Teks harus besar dan jelas
- Minimalis, tidak terlalu ramai
- Sesuai branding aplikasi

### Screenshots (Phone - Minimal 2, Maksimal 8)

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `screenshot-1-home.png` | **1080x1920 px** | PNG/JPEG 24-bit | Assets folder | Home screen dengan tombol "Mulai Kuis" |
| `screenshot-2-quiz-selection.png` | **1080x1920 px** | PNG/JPEG 24-bit | Assets folder | Quiz Selection - 5 jenis kuis |
| `screenshot-3-quiz-active.png` | **1080x1920 px** | PNG/JPEG 24-bit | Assets folder | Quiz in Progress - Tampilan soal |
| `screenshot-4-results.png` | **1080x1920 px** | PNG/JPEG 24-bit | Assets folder | Results screen dengan stars dan score |
| `screenshot-5-settings.png` | **1080x1920 px** | PNG/JPEG 24-bit | Assets folder | Settings screen (opsional) |
| `screenshot-6-history.png` | **1080x1920 px** | PNG/JPEG 24-bit | Assets folder | History screen (opsional) |

**Screenshot Requirements:**
- Minimum: 320x320 px
- Maximum: 3840x3840 px
- **Recommended: 1080x1920 px** (9:16 portrait) atau 1440x2560 px
- Ratio: 16:9 atau 9:16 (portrait)
- Format: PNG atau JPEG 24-bit
- Harus representatif dari fitur aplikasi
- Teks harus jelas terbaca
- Bisa menggunakan device mockup frame (lebih menarik)

**Rekomendasi Urutan Screenshots:**
1. Home screen - First impression
2. Quiz Selection - Menunjukkan variasi kuis
3. Quiz Active - Tampilan interaktif
4. Results - Menunjukkan rewards/stars
5. Settings (opsional)
6. History (opsional)

### Screenshots Tablet (Opsional)

Jika aplikasi dioptimasi untuk tablet, tambahkan minimal 2 screenshot tablet:

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `screenshot-tablet-1.png` | **2048x1536 px** | PNG/JPEG 24-bit | Assets folder | Tablet landscape (16:10) |
| `screenshot-tablet-2.png` | **2048x1536 px** | PNG/JPEG 24-bit | Assets folder | Tablet landscape (16:10) |

**Total Play Store Assets: 1 icon + 1 feature graphic + 4-6 screenshots = 6-8 files**

---

## 4. Web/PWA Icons (Untuk Web Version)

Icons untuk Progressive Web App (PWA) dan web browser.

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `favicon.ico` | **16x16, 32x32 px** | ICO | `public/` | Browser favicon (multi-size dalam 1 file) |
| `apple-touch-icon.png` | **180x180 px** | PNG | `public/` | iOS home screen icon |
| `apple-touch-icon-152x152.png` | **152x152 px** | PNG | `public/` | iPad home screen (legacy) |
| `apple-touch-icon-167x167.png` | **167x167 px** | PNG | `public/` | iPad Pro home screen |
| `icon-192.png` | **192x192 px** | PNG | `public/` | PWA icon - Android (opsional) |
| `icon-512.png` | **512x512 px** | PNG | `public/` | PWA icon - Android (opsional) |

**Catatan:** 
- File-file ini sudah ada di `public/` folder
- Update jika icon baru sudah dibuat
- `favicon.ico` bisa dibuat dari PNG menggunakan online converter

---

## 5. Social Media / Sharing Assets

Assets untuk sharing di media sosial dan preview link.

| Nama File | Ukuran | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `og-image.png` | **1200x630 px** | PNG 24-bit | `public/` | Open Graph image (Facebook, WhatsApp, LinkedIn) |
| `twitter-card.png` | **1200x600 px** | PNG 24-bit | `public/` | Twitter Card image (opsional) |

**Desain OG Image:**
- Ratio: 1.91:1 (1200x630)
- Teks besar dan jelas
- Logo aplikasi
- Tagline/key features
- Brand colors

**File saat ini:** `public/og-image.png` (1200x630) - Update jika diperlukan

---

## 6. Promo Video (Opsional)

Video promosi untuk Play Store.

| Nama File | Durasi | Format | Lokasi | Keterangan |
|-----------|--------|--------|--------|------------|
| `promo-video.mp4` | 30 detik - 2 menit | MP4 (H.264) | YouTube | Upload ke YouTube, paste URL di Play Console |

**Rekomendasi Konten Video:**
- Opening: Logo/branding (2-3 detik)
- Home screen navigation (5 detik)
- Quiz selection (5 detik)
- Quiz gameplay (10 detik)
- Results/rewards (5 detik)
- Call to action (3-5 detik)

**Video Requirements:**
- Resolution: Minimum 720p (1280x720), recommended 1080p (1920x1080)
- Aspect ratio: 16:9
- Audio: Narration atau background music (opsional)
- Format: MP4 (H.264 codec)

---

## Checklist Ringkas Asset yang Perlu Dibuat

### ✅ PRIORITAS 1 (WAJIB - Harus Ada)

#### Play Store Assets
- [ ] `play-store-icon.png` - 512x512 px (PNG 32-bit)
- [ ] `feature-graphic.png` - 1024x500 px (PNG/JPEG 24-bit, no transparency)
- [ ] `screenshot-1-home.png` - 1080x1920 px (PNG/JPEG)
- [ ] `screenshot-2-quiz-selection.png` - 1080x1920 px (PNG/JPEG)
- [ ] `screenshot-3-quiz-active.png` - 1080x1920 px (PNG/JPEG)
- [ ] `screenshot-4-results.png` - 1080x1920 px (PNG/JPEG)

#### Android App Icons
- [ ] `ic_launcher_foreground.png` - 1024x1024 px (PNG 32-bit, base)
- [ ] `ic_launcher_background.png` - 1024x1024 px (PNG 24-bit, atau warna solid)

#### Splash Screen
- [ ] `splash_portrait.png` - 1080x1920 px (PNG 24-bit, base)

**Total Prioritas 1: 9 files**

---

### ✅ PRIORITAS 2 (DIREKOMENDASIKAN)

#### Play Store Screenshots Tambahan
- [ ] `screenshot-5-settings.png` - 1080x1920 px (PNG/JPEG)
- [ ] `screenshot-6-history.png` - 1080x1920 px (PNG/JPEG)

#### Web Icons
- [ ] `favicon.ico` - 16x16, 32x32 px (ICO, multi-size)
- [ ] `apple-touch-icon.png` - 180x180 px (PNG, update dari icon base)
- [ ] `og-image.png` - 1200x630 px (PNG, update dari icon/feature graphic)

**Total Prioritas 2: 5 files**

---

### ✅ PRIORITAS 3 (OPSIONAL)

#### Tablet Screenshots
- [ ] `screenshot-tablet-1.png` - 2048x1536 px (PNG/JPEG)
- [ ] `screenshot-tablet-2.png` - 2048x1536 px (PNG/JPEG)

#### Video Promosi
- [ ] `promo-video.mp4` - 30 detik - 2 menit (Upload ke YouTube)

#### PWA Icons (Tambahan)
- [ ] `icon-192.png` - 192x192 px (PNG)
- [ ] `icon-512.png` - 512x512 px (PNG)

#### Social Media
- [ ] `twitter-card.png` - 1200x600 px (PNG)

**Total Prioritas 3: 5 files**

---

## Total File yang Perlu Dibuat (Minimal)

**Dari Designer (Base Files):**
1. Icon foreground 1024x1024 px (1 file)
2. Icon background 1024x1024 px (1 file, atau warna solid)
3. Splash screen 1080x1920 px (1 file)
4. Play Store icon 512x512 px (1 file)
5. Feature graphic 1024x500 px (1 file)
6. 4 Screenshots 1080x1920 px (4 files)

**Total Minimal: 9 file utama** yang perlu dibuat designer.

File lainnya (berbagai ukuran untuk berbagai density) akan di-generate otomatis menggunakan tools.

---

## Tools untuk Generate Multi-Resolution

Setelah mendapat file base dari designer, gunakan tools berikut untuk generate berbagai ukuran:

### 1. Android Asset Studio (Online - Recommended)
**URL:** https://romannurik.github.io/AndroidAssetStudio/

**Fitur:**
- Generate adaptive icon dari 1 image
- Generate splash screen berbagai ukuran
- Preview di berbagai device
- Download langsung sebagai ZIP

**Cara Pakai:**
1. Buka Android Asset Studio
2. Pilih "Launcher Icon Generator" atau "Image Asset"
3. Upload base icon (1024x1024 px)
4. Atur foreground/background
5. Download sebagai ZIP
6. Extract dan copy ke folder `android/app/src/main/res/`

### 2. ImageMagick (Command Line)

**Install:**
```bash
# macOS
brew install imagemagick

# Linux
sudo apt-get install imagemagick
```

**Generate Icons:**
```bash
# Generate berbagai ukuran dari base icon
convert icon_base.png -resize 48x48 icon_48.png
convert icon_base.png -resize 72x72 icon_72.png
convert icon_base.png -resize 96x96 icon_96.png
convert icon_base.png -resize 144x144 icon_144.png
convert icon_base.png -resize 192x192 icon_192.png
```

**Generate Splash Screens:**
```bash
# Portrait splash screens
convert splash_base.png -resize 320x480! splash_mdpi.png
convert splash_base.png -resize 480x800! splash_hdpi.png
convert splash_base.png -resize 720x1280! splash_xhdpi.png
convert splash_base.png -resize 1080x1920! splash_xxhdpi.png
convert splash_base.png -resize 1440x2560! splash_xxxhdpi.png
```

### 3. Adobe Photoshop / GIMP (Batch Processing)

**Photoshop:**
1. File → Scripts → Image Processor
2. Pilih folder source dan destination
3. Set berbagai ukuran output
4. Run batch

**GIMP:**
1. Filters → Batch Process
2. Set input/output folder
3. Add resize operations
4. Run batch

### 4. Capacitor Assets (CLI Tool)

**Install:**
```bash
npm install -g @capacitor/assets
```

**Generate:**
```bash
npx @capacitor/assets generate --iconPath ./assets/icon.png --splashPath ./assets/splash.png
```

**Catatan:** Tool ini akan otomatis generate semua ukuran yang diperlukan.

---

## Struktur Folder untuk Assets

Rekomendasikan struktur folder untuk menyimpan assets:

```
assets/
├── source/                          # File original dari designer
│   ├── icon-foreground-1024.png
│   ├── icon-background-1024.png
│   ├── splash-portrait-1080x1920.png
│   ├── play-store-icon-512.png
│   ├── feature-graphic-1024x500.png
│   └── screenshots/
│       ├── screenshot-1-home.png
│       ├── screenshot-2-quiz-selection.png
│       ├── screenshot-3-quiz-active.png
│       └── screenshot-4-results.png
│
├── generated/                       # File yang sudah di-generate
│   ├── android-icons/
│   ├── android-splash/
│   ├── web-icons/
│   └── play-store/
│
└── README.md                        # Dokumentasi asset
```

---

## Tips Desain

### Icon Design
- ✅ Desain jelas dan mudah dikenali
- ✅ Hindari teks kecil (tidak terbaca di ukuran kecil)
- ✅ Gunakan warna kontras tinggi
- ✅ Perhatikan safe zone (512x512 px di tengah dari 1024x1024 px)
- ✅ Test di berbagai ukuran sebelum final

### Splash Screen Design
- ✅ Minimalis dan clean
- ✅ Logo di tengah
- ✅ Background sesuai branding (putih untuk app ini)
- ✅ Loading time biasanya 2 detik, design harus instant recognizable

### Feature Graphic Design
- ✅ Teks besar dan jelas (minimal 24pt)
- ✅ Tidak ada elemen penting di pinggir
- ✅ Sesuai dengan branding aplikasi
- ✅ Minimalis, tidak terlalu ramai

### Screenshot Design
- ✅ Ambil dari device/emulator dengan resolusi tinggi
- ✅ Tampilkan fitur utama aplikasi
- ✅ Pastikan teks jelas terbaca
- ✅ Gunakan device mockup frame (lebih menarik)
- ✅ Highlight fitur unik aplikasi
- ✅ Urutan logis: Home → Features → Results

---

## Resources & Links

- [Google Play Asset Guidelines](https://support.google.com/googleplay/android-developer/answer/9866151)
- [Android Icon Design Guidelines](https://developer.android.com/guide/practices/ui_guidelines/icon_design)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- [Capacitor Assets CLI](https://github.com/ionic-team/capacitor-assets)
- [Favicon Generator](https://realfavicongenerator.net/)
- [Icon Description Document](./ICON_DESCRIPTION.md)

---

## Related Documentation

- [`ICON_DESCRIPTION.md`](./ICON_DESCRIPTION.md) - Deskripsi visual untuk icon design
- [`PLAY_STORE_SUBMISSION.md`](./PLAY_STORE_SUBMISSION.md) - Panduan submit ke Play Store
- [`PLAY_STORE_COMPLIANCE_CHECKLIST.md`](./PLAY_STORE_COMPLIANCE_CHECKLIST.md) - Checklist compliance

---

**Last Updated:** 2025-01-XX  
**Version:** 1.0.0



# Panduan Submit ke Google Play Store

Panduan lengkap untuk submit aplikasi **Kuis Belajar Membaca** ke Google Play Store.

## Checklist Sebelum Submit

### Technical Requirements
- [x] App signing configured (keystore.jks)
- [x] AAB format build script ready (`npm run android:release`)
- [x] Target SDK 35 (fixed in build.gradle)
- [x] Normal permissions only (INTERNET, ACCESS_NETWORK_STATE)
- [x] ProGuard rules configured
- [x] Privacy Policy page (in-app)
- [x] Privacy Policy HTML (external URL)

### Content Requirements
- [ ] Privacy Policy URL (hosted and accessible)
- [ ] Data Safety section completed in Play Console
- [ ] Content Rating questionnaire completed
- [ ] Store listing assets prepared (screenshots, icon, feature graphic)
- [ ] App descriptions (short + full) in Indonesian
- [ ] Category selected (Education, Family)

### Legal Requirements
- [ ] COPPA compliance declared (children's app)
- [ ] Permissions justified in Data Safety
- [ ] No dangerous permissions
- [ ] Privacy Policy covers all data collection

### Indonesia-Specific
- [ ] Developer account verified (if needed)
- [ ] Indonesia market selected
- [ ] Indonesian language content provided

## Langkah-langkah Submit ke Play Store

### 1. Persiapan Akun Developer

1. **Buat Google Play Console Account**
   - Kunjungi: https://play.google.com/console
   - Bayar biaya pendaftaran: $25 (sekali bayar)
   - Lengkapi informasi developer profile

2. **Verifikasi Identitas (Indonesia - Wajib mulai 2026)**
   - Google akan mengirim undangan secara bertahap mulai Oktober 2025
   - Wajib untuk semua pengembang di Indonesia mulai September 2026
   - Siapkan dokumen identitas (KTP, NPWP, dll)
   - Rujuk ke: `docs/INDONESIA_MARKET_GUIDE.md`

### 2. Build AAB untuk Release

```bash
# Pastikan version di package.json sudah di-update
# Build web app
npm run build

# Sync ke Android
npm run cap:sync

# Build release AAB
npm run android:release
```

AAB file akan ada di: `android/app/build/outputs/bundle/release/app-release.aab`

### 3. Upload ke Play Console

1. **Buat App Baru**
   - Buka Play Console → Create app
   - Pilih default language: Indonesian (Indonesia)
   - App name: "Kuis Belajar Membaca"
   - Default language: Indonesian
   - App or game: App
   - Free or paid: Free (atau Paid sesuai monetization strategy)

2. **Upload AAB**
   - Go to Production → Create new release
   - Upload AAB file
   - Release name: "1.5.9" (sesuai version di package.json)
   - Release notes: "Initial release"

### 4. App Content

#### 4.1. Store Listing

**Required:**
- **App name**: Kuis Belajar Membaca (50 karakter maks)
- **Short description**: "Aplikasi edukasi untuk membantu anak-anak belajar membaca dengan kuis interaktif" (80 karakter maks)
- **Full description**: 
```
Kuis Belajar Membaca adalah aplikasi edukasi yang dirancang khusus untuk membantu anak-anak belajar membaca dengan cara yang menyenangkan dan interaktif.

Fitur Utama:
• 5 jenis kuis berbeda (Suku Kata, Awal Kata, Akhir Kata, Lengkapi Suku Kata)
• 580+ soal edukatif untuk berlatih
• Text-to-Speech (TTS) untuk pengucapan yang benar
• Sistem bintang untuk memotivasi anak
• Progress tracking dan history
• Timer opsional untuk meningkatkan fokus
• Tidak ada iklan yang mengganggu
• 100% offline setelah di-download

Aman untuk Anak:
✓ COPPA compliant
✓ Tidak mengumpulkan data pribadi
✓ Tidak ada iklan behavioral
✓ Dirancang untuk usia 3+
```

**Graphics:**
- **Icon**: 512x512px PNG (high-res icon)
- **Feature graphic**: 1024x500px
- **Screenshots (Phone)**:
  - Minimum 2, maksimum 8
  - Format: PNG atau JPG
  - Ratio: 16:9 atau 9:16
  - Ukuran: min 320px, max 3840px
- **Screenshots (Tablet)**: Opsional (min 2 jika disediakan)

**Kategori:**
- **App category**: Education
- **Tags**: Educational, Kids, Learning, Reading, Indonesian

#### 4.2. Content Rating

**Questionnaire:**
1. Pilih: "All ages" atau "Everyone"
2. Declare: Children's app (Yes)
3. Content descriptors:
   - No violence
   - No gambling
   - No adult content
   - Educational content only

**Rating yang Diharapkan**: PEGI 3, ESRB Everyone

#### 4.3. Data Safety

**Required Information:**

1. **Does your app collect or share any of the required user data types?**
   - Answer: Yes (for Audio data)

2. **Data Types:**
   - Audio: Yes
     - Purpose: App functionality
     - Collection: Yes, processed ephemerally
     - Sharing: No
     - Required: Yes (for TTS)

3. **Data Security:**
   - Encryption: Yes, encrypted in transit
   - Data deletion: Users can request (via Reset Progress)

4. **Permissions:**
   - INTERNET: Required, for loading app content
   - ACCESS_NETWORK_STATE: Required, for connectivity check
   - Audio (output): Required, for TTS functionality

5. **COPPA Compliance:**
   - Is your app designed for children? Yes
   - Does your app target children under 13? Yes (3+)
   - All data safety requirements met: Yes

**Rujuk ke**: `docs/DATA_SAFETY_GUIDE.md` untuk detail lengkap

#### 4.4. Privacy Policy

**Privacy Policy URL:**
- Harus accessible via HTTPS
- Bisa di-host di:
  - GitHub Pages
  - Netlify
  - Website sendiri
  - URL contoh: `https://yourdomain.com/privacy-policy.html`

**File yang sudah disiapkan:**
- `public/privacy-policy.html` - Standalone HTML untuk Play Store

**Cara Host:**
1. **GitHub Pages:**
   ```bash
   # Push privacy-policy.html ke repo
   # Enable GitHub Pages di repo settings
   # URL: https://username.github.io/repo/privacy-policy.html
   ```

2. **Netlify:**
   - Upload `public/privacy-policy.html` ke Netlify
   - URL akan tersedia secara otomatis

### 5. Testing Requirements

**Untuk Developer Account Baru (dibuat setelah 13 Nov 2023):**

1. **Internal Testing (minimal 7 hari):**
   - Upload ke Internal testing track
   - Test dengan 1-2 orang (developer sendiri)
   - Verify semua fitur berfungsi

2. **Closed Testing (20 testers, minimal 2 minggu):**
   - Upload ke Closed testing track
   - Undang 20+ testers (via email)
   - Test selama minimal 14 hari
   - Kumpulkan feedback
   - Fix bugs jika ada

3. **Open Testing (opsional, direkomendasikan):**
   - Upload ke Open testing track
   - Biarkan publik download dan test
   - Kumpulkan feedback lebih banyak
   - Test selama minimal 7 hari

**Untuk Developer Account Lama:**
- Bisa langsung ke Production (disarankan Internal testing dulu)

### 6. Target SDK Requirement

**Important:**
- Mulai **31 Agustus 2025**, semua app baru dan update **WAJIB** target API 35 (Android 15)
- Aplikasi ini sudah di-fix untuk menggunakan targetSdk 35
- Verify di build.gradle: `targetSdkVersion rootProject.ext.targetSdkVersion` (should be 35)

### 7. Submit untuk Review

1. **Pre-launch Report:**
   - Play Console akan otomatis generate pre-launch report
   - Review semua warning/errors
   - Fix jika ada issues

2. **Content Policy:**
   - Pastikan semua content compliant dengan Google Play policies
   - Tidak ada copyright infringement
   - Tidak ada misleading content

3. **Submit:**
   - Klik "Submit for review"
   - Review process: 1-7 hari (biasanya 2-3 hari)
   - Check email untuk update status

### 8. Post-Approval

1. **App Live:**
   - App akan otomatis live setelah approved
   - Monitor Play Console untuk metrics

2. **Monitoring:**
   - Check crash reports
   - Monitor user reviews
   - Respond to user feedback
   - Update app jika ada bugs

## Common Rejection Reasons & How to Avoid

1. **Privacy Policy Missing/Invalid:**
   - ✅ Pastikan URL accessible via HTTPS
   - ✅ Content harus comprehensive dan akurat

2. **Data Safety Section Incomplete:**
   - ✅ Declare semua data yang dikumpulkan
   - ✅ Justify semua permissions

3. **Content Rating Missing:**
   - ✅ Complete questionnaire sebelum submit

4. **Target SDK Too Low:**
   - ✅ Pastikan targetSdk 35 (atau sesuai requirement terbaru)

5. **COPPA Compliance Issues:**
   - ✅ Declare sebagai children's app
   - ✅ Tidak collect personal information
   - ✅ Tidak ada behavioral advertising

6. **Misleading Content:**
   - ✅ Deskripsi harus akurat
   - ✅ Screenshots harus representatif

## Resources

- [Google Play Console](https://play.google.com/console)
- [Data Safety Documentation](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Content Rating Guide](https://support.google.com/googleplay/android-developer/answer/9888179)
- [COPPA Compliance](https://support.google.com/googleplay/android-developer/answer/9893335)

## Related Documentation

- `docs/DATA_SAFETY_GUIDE.md` - Panduan lengkap Data Safety section
- `docs/COPPA_COMPLIANCE.md` - Checklist COPPA compliance
- `docs/INDONESIA_MARKET_GUIDE.md` - Persiapan khusus untuk market Indonesia
- `docs/MONETIZATION_STRATEGY.md` - Strategi monetization yang COPPA compliant


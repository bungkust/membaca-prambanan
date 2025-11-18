# Android Setup Guide

Panduan lengkap untuk setup dan build aplikasi Android menggunakan Capacitor.

## Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

1. **Node.js** 18+ dan npm
2. **Java JDK** 17 (LTS)
3. **Android Studio** dengan Android SDK
4. **Android SDK** Platform 34 dan Build Tools

## Setup Awal

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Web App

```bash
npm run build
```

### 3. Sync ke Android

```bash
npm run cap:sync
```

Ini akan:
- Build web app
- Copy file ke Android project
- Update dependencies

## Generate Keystore untuk Signing

Untuk release build yang bisa di-upload ke Play Store, Anda perlu keystore untuk signing.

### Generate Keystore

```bash
keytool -genkey -v -keystore android/keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias your-key-alias
```

Anda akan diminta untuk:
- Password keystore
- Password key alias
- Informasi identitas (nama, organisasi, dll)

**PENTING:** Simpan password dan informasi keystore dengan aman! Jika hilang, Anda tidak bisa update aplikasi di Play Store.

### Setup key.properties

1. Copy example file:
```bash
cp android/key.properties.example android/key.properties
```

2. Edit `android/key.properties` dan isi dengan informasi keystore Anda:
```properties
storePassword=your-actual-store-password
keyPassword=your-actual-key-password
keyAlias=your-actual-key-alias
storeFile=keystore.jks
```

3. Pastikan `key.properties` sudah di-ignore di `.gitignore` (sudah ada)

## Local Build

### Debug Build (untuk testing)

```bash
npm run android:build
```

APK akan ada di: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build (untuk Play Store)

```bash
npm run android:release
```

AAB akan ada di: `android/app/build/outputs/bundle/release/app-release.aab`

## Setup GitHub Actions (CI/CD)

### 1. Generate Keystore (jika belum)

Ikuti langkah di atas untuk generate keystore.

### 2. Encode Keystore ke Base64

```bash
# macOS/Linux
base64 -i android/keystore.jks | pbcopy

# Atau simpan ke file
base64 -i android/keystore.jks > keystore-base64.txt
```

### 3. Setup GitHub Secrets

Buka repository di GitHub → Settings → Secrets and variables → Actions

Tambahkan secrets berikut:

- **ANDROID_KEYSTORE_BASE64**: Base64 encoded keystore file (dari langkah 2)
- **ANDROID_KEYSTORE_PASSWORD**: Password keystore
- **ANDROID_KEY_ALIAS**: Key alias name
- **ANDROID_KEY_PASSWORD**: Password key alias

### 4. Trigger Build

GitHub Actions akan otomatis build ketika:
- Push ke branch `main`
- Push tag dengan format `v*` (contoh: `v1.0.0`)
- Manual trigger via GitHub Actions UI

### 5. Download Artifacts

Setelah build selesai:
1. Buka Actions tab di GitHub
2. Pilih workflow run yang berhasil
3. Download artifact:
   - `app-release` - AAB file untuk Play Store
   - `app-debug` - APK file untuk testing

## Testing di Emulator/Device

### Via Android Studio

```bash
npm run cap:open
```

Ini akan membuka Android Studio. Dari sini Anda bisa:
- Run di emulator
- Run di connected device
- Debug aplikasi

### Via Command Line

```bash
# Install ke connected device
cd android
./gradlew installDebug
```

## Version Management

### Version Code

Version code otomatis increment dari:
- `GITHUB_RUN_NUMBER` di CI/CD
- Atau bisa set manual via `VERSION_CODE` environment variable

### Version Name

Version name diambil dari `package.json` (`version` field).

Untuk update version:
1. Update `version` di `package.json`
2. Build ulang

## Troubleshooting

### Build Error: "Keystore file not found"

- Pastikan `android/key.properties` sudah dibuat
- Pastikan `storeFile` path benar (relative ke `android/` folder)
- Pastikan keystore file ada di lokasi yang benar

### Build Error: "Gradle sync failed"

```bash
cd android
./gradlew clean
npm run cap:sync
```

### TTS tidak bekerja di Android

- Pastikan `@capacitor-community/text-to-speech` sudah terinstall
- Check log di Android Studio untuk error details
- Test di device fisik (emulator mungkin tidak support TTS)

### Service Worker tidak bekerja

Service worker di-skip otomatis di native platform (normal behavior). Aplikasi akan tetap berfungsi.

### Asset tidak load

- Pastikan `vite.config.ts` sudah set `base: './'`
- Pastikan build sudah dijalankan sebelum sync
- Check path assets di `dist/` folder

## Upload ke Play Store

1. Build release AAB:
```bash
npm run android:release
```

2. Buka [Google Play Console](https://play.google.com/console)

3. Create new app atau pilih existing app

4. Upload AAB file dari:
   `android/app/build/outputs/bundle/release/app-release.aab`

5. Isi informasi app (deskripsi, screenshots, dll)

6. Submit untuk review

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/)
- [Google Play Console](https://play.google.com/console)


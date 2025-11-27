# Panduan Versioning untuk Play Store

Panduan lengkap tentang cara mengelola version untuk update aplikasi di Google Play Store.

## Konsep Versioning Android

Android menggunakan 2 jenis version:

### 1. versionName (User-Facing)
- **Format**: String, contoh: `"1.0.0"`, `"1.0.1"`, `"1.1.0"`
- **Tujuan**: Ditampilkan ke user di Play Store
- **Bisa diubah**: Ya, bisa pakai semantic versioning (major.minor.patch)
- **Lokasi**: `package.json` → `version` field

### 2. versionCode (Internal)
- **Format**: Integer, contoh: `1`, `2`, `3`, `4`
- **Tujuan**: Digunakan Play Store untuk menentukan update
- **HARUS increment**: Setiap update HARUS lebih besar dari sebelumnya
- **Tidak bisa di-timpa**: Play Store akan REJECT jika versionCode sama atau lebih kecil

## Aturan Penting Play Store

⚠️ **CRITICAL**: Play Store akan **REJECT** update jika:
- versionCode baru ≤ versionCode yang sudah di-upload sebelumnya
- versionCode tidak increment secara konsisten

✅ **BENAR**:
- Release 1: versionCode = 1, versionName = "1.0.0"
- Release 2: versionCode = 2, versionName = "1.0.1"
- Release 3: versionCode = 3, versionName = "1.1.0"

❌ **SALAH**:
- Release 1: versionCode = 1
- Release 2: versionCode = 1 (akan ditolak!)
- Release 2: versionCode = 0 (akan ditolak!)

## Cara Update Version

### Step 1: Update versionName

Edit `package.json`:
```json
{
  "version": "1.0.1"  // Update sesuai kebutuhan
}
```

**Semantic Versioning**:
- **Patch** (1.0.0 → 1.0.1): Bug fixes, minor improvements
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes, major updates

### Step 2: Update versionCode

Edit `android/app/build.gradle`:
```gradle
def versionCodeValue = 2  // INCREMENT dari sebelumnya (1 → 2 → 3, dst)
```

**Atau** set via environment variable:
```bash
VERSION_CODE=2 npm run android:release
```

### Step 3: Build & Upload

```bash
# Build release AAB
npm run android:release

# Upload ke Play Console
# AAB ada di: android/app/build/outputs/bundle/release/app-release.aab
```

## Version Code Management

### Manual (Recommended untuk Production)

Update manual di `build.gradle`:
```gradle
def versionCodeValue = 1  // Increment untuk setiap release
```

**Keuntungan**:
- Full control
- Predictable
- No accidental duplicates

### Automatic (CI/CD)

Via environment variable:
```bash
VERSION_CODE=2 npm run android:release
```

Atau di GitHub Actions:
```yaml
env:
  VERSION_CODE: ${{ github.run_number }}
```

**Keuntungan**:
- Auto-increment di CI/CD
- No manual update needed

## Contoh Workflow Update

### Release 1.0.0 (Initial)
```json
// package.json
"version": "1.0.0"
```
```gradle
// build.gradle
def versionCodeValue = 1
```
**Result**: versionName = "1.0.0", versionCode = 1

### Release 1.0.1 (Bug Fix)
```json
// package.json
"version": "1.0.1"
```
```gradle
// build.gradle
def versionCodeValue = 2  // Increment!
```
**Result**: versionName = "1.0.1", versionCode = 2

### Release 1.1.0 (New Feature)
```json
// package.json
"version": "1.1.0"
```
```gradle
// build.gradle
def versionCodeValue = 3  // Increment!
```
**Result**: versionName = "1.1.0", versionCode = 3

## Checklist Sebelum Upload Update

- [ ] versionName di `package.json` sudah di-update
- [ ] versionCode di `build.gradle` sudah di-increment (lebih besar dari sebelumnya)
- [ ] Build AAB berhasil tanpa error
- [ ] Test AAB di device/emulator
- [ ] Release notes sudah disiapkan
- [ ] Cek versionCode yang sudah di-upload sebelumnya di Play Console

## Troubleshooting

### Error: "Version code X has already been used"

**Penyebab**: versionCode sudah pernah di-upload sebelumnya

**Solusi**: 
1. Cek versionCode terakhir di Play Console → Release → Production
2. Increment versionCode ke angka yang lebih besar
3. Rebuild dan upload ulang

### Error: "Version code must be positive"

**Penyebab**: versionCode = 0 atau negatif

**Solusi**: Pastikan versionCode ≥ 1

### Ingin "Reset" Version?

**TIDAK BISA!** Play Store tidak mengizinkan versionCode yang lebih kecil.

Jika ingin "restart" versioning:
- Buat app baru dengan applicationId berbeda
- Atau lanjutkan increment dari versionCode terakhir

## Best Practices

1. **Selalu increment versionCode** untuk setiap release
2. **Gunakan semantic versioning** untuk versionName
3. **Document version changes** di release notes
4. **Test build** sebelum upload ke Play Store
5. **Keep track** versionCode yang sudah di-upload

## Current Version

- **versionName**: `1.0.0` (di `package.json`)
- **versionCode**: `1` (di `android/app/build.gradle`)
- **Status**: Ready for initial release

## References

- [Android Versioning](https://developer.android.com/studio/publish/versioning)
- [Play Store Versioning](https://support.google.com/googleplay/android-developer/answer/113469)

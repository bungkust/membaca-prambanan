# Panduan Data Safety Section

Panduan lengkap untuk mengisi Data Safety section di Google Play Console untuk aplikasi **Kuis Belajar Membaca**.

## Overview

Data Safety section adalah bagian wajib di Google Play Console yang menjelaskan:
- Data apa yang dikumpulkan aplikasi
- Untuk apa data digunakan
- Apakah data dibagikan ke pihak ketiga
- Bagaimana data dilindungi

## Data yang Dikumpulkan Aplikasi Ini

### ✅ Audio (Yes)

**Question: Does your app collect or share audio data?**
- Answer: **Yes**

**Details:**
- **Data Type**: Audio
- **Collected?**: Yes
- **Shared?**: No
- **Purpose**: App functionality
- **Requirement**: Required for functionality
- **Collection Type**: Processed ephemerally (tidak disimpan)
- **Processing**: On-device only

**Justification:**
```
Aplikasi ini menggunakan Text-to-Speech (TTS) untuk membantu anak-anak 
belajar membaca dengan suara. Audio digunakan HANYA untuk output suara 
(playback), TIDAK merekam audio. Data audio diproses secara ephemeral 
dan tidak disimpan atau dikirim ke server manapun.
```

**Permissions Related:**
- Audio output permission (untuk TTS)
- **TIDAK** menggunakan RECORD_AUDIO permission

### ❌ Data yang TIDAK Dikumpulkan

Aplikasi ini **TIDAK mengumpulkan**:
- ❌ Personal information (nama, email, phone, address)
- ❌ Photos or videos
- ❌ Device or other IDs
- ❌ Financial information
- ❌ Location
- ❌ Contacts
- ❌ App activity
- ❌ Web browsing history
- ❌ Installed apps

## Data Security

### Encryption
- **Question**: Is this data encrypted in transit?
- **Answer**: Yes
- **Details**: Semua komunikasi HTTPS (SSL/TLS)

### Data Deletion
- **Question**: Can users request that data be deleted?
- **Answer**: Yes
- **How**: 
  - Via app: Settings → Reset Progress
  - Uninstall app akan menghapus semua data lokal

## Permissions Justification

### INTERNET
- **Purpose**: Loading app content (HTML, CSS, JS assets)
- **Justification**: Diperlukan untuk memuat aplikasi web yang di-pack sebagai native app
- **Data Collected**: None (hanya loading static assets)

### ACCESS_NETWORK_STATE
- **Purpose**: Check internet connectivity
- **Justification**: Untuk memberikan UX yang lebih baik (detect offline/online)
- **Data Collected**: None (hanya status koneksi)

### Audio (Output)
- **Purpose**: Text-to-Speech playback
- **Justification**: Diperlukan untuk fitur TTS yang membantu anak belajar membaca
- **Data Collected**: Audio output only (tidak recording)
- **Note**: Aplikasi TIDAK menggunakan RECORD_AUDIO permission

## COPPA Compliance

### Children's App Declaration
- **Question**: Is your app designed for children?
- **Answer**: **Yes**

- **Question**: Does your app target children under 13?
- **Answer**: **Yes** (target age 3+)

### COPPA Requirements Met
- ✅ Tidak mengumpulkan personal information
- ✅ Tidak menggunakan behavioral advertising
- ✅ Tidak share data ke third party
- ✅ Tidak require login/account
- ✅ Data hanya stored locally

### Data Collection for Children
- **Question**: Do you collect data from children?
- **Answer**: No (kami hanya collect audio output yang ephemeral untuk fungsionalitas TTS)

**Clarification:**
```
Aplikasi tidak mengumpulkan informasi pribadi dari anak-anak. 
Audio data yang digunakan hanya untuk Text-to-Speech output 
dan diproses secara ephemeral tanpa penyimpanan permanen.
```

## Template untuk Play Console

### Section 1: Data Collection

**Does your app collect or share any of the required user data types?**
- Answer: **Yes**

**Which types of data does your app collect or share?**
- ✅ Audio

### Section 2: Audio Data Details

**Is this data collected, shared, or both?**
- Collected: **Yes**
- Shared: **No**

**How is this data used?**
- ✅ App functionality

**Is this data required for your app, or can users choose whether it's collected?**
- **Required for functionality**

**Is this data processed ephemerally?**
- **Yes** (processed temporarily, tidak disimpan)

**Where is this data processed?**
- **On device**

**How do you ensure the security practices you've declared for this data type?**
```
Aplikasi menggunakan HTTPS untuk semua komunikasi. Data audio hanya 
diproses secara ephemeral di perangkat dan tidak disimpan atau 
dikirim ke server. Tidak ada database server yang menyimpan data audio.
```

### Section 3: Data Security

**Is this data encrypted in transit?**
- **Yes** (HTTPS)

**Can users request that data be deleted?**
- **Yes**
- Method: Settings → Reset Progress, atau uninstall app

### Section 4: Children's Data

**Is your app designed for children?**
- **Yes**

**Does your app target children under 13?**
- **Yes** (ages 3+)

**Do you collect data from children?**
- **No** (kami tidak mengumpulkan personal information. Audio hanya untuk TTS output yang ephemeral)

## Verification Checklist

Sebelum submit, pastikan:

- [x] ✅ Audio data declared dengan benar
- [x] ✅ Purpose jelas (App functionality)
- [x] ✅ Collection type: Ephemeral (Sudah dijelaskan di Privacy Policy)
- [x] ✅ Sharing: No
- [x] ✅ Encryption: Yes (HTTPS)
- [x] ✅ Data deletion: Yes, explained (Reset Progress + Uninstall)
- [x] ✅ COPPA declared: Yes
- [x] ✅ All permissions justified
- [x] ✅ No misleading information

## Common Issues

### Issue: "Audio data must be justified"
**Solution**: Pastikan menjelaskan bahwa audio hanya untuk TTS output, tidak recording, dan ephemeral.

### Issue: "Children's app must declare data collection"
**Solution**: Untuk children's app, tetap harus declare walaupun minimal. Jelaskan bahwa data hanya ephemeral untuk fungsionalitas.

### Issue: "Data deletion method unclear"
**Solution**: Jelaskan dua cara: via Reset Progress di app, atau uninstall app.

## Screenshots/Example

Saat mengisi di Play Console, pastikan screenshot atau deskripsi match dengan yang di-declare di Data Safety.

Jika ada update di Data Safety declaration, harus update juga di:
- Privacy Policy
- App description (jika relevan)
- In-app Privacy Policy page


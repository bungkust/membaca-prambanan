# COPPA Compliance Checklist

Checklist untuk memastikan aplikasi **Kuis Belajar Membaca** mematuhi Children's Online Privacy Protection Act (COPPA) dan kebijakan Google Play untuk aplikasi anak-anak.

## Apa itu COPPA?

COPPA (Children's Online Privacy Protection Act) adalah undang-undang AS yang melindungi privasi anak-anak di bawah usia 13 tahun saat mereka menggunakan aplikasi atau website. Meskipun ini regulasi AS, Google Play menerapkan prinsip-prinsip COPPA secara global.

## App Information

- **App Name**: Kuis Belajar Membaca
- **Target Age**: 3+ (Preschool to Early Elementary)
- **Category**: Education, Family
- **COPPA Status**: Must Comply ✅

## COPPA Compliance Checklist

### 1. Data Collection ✅

- [x] **No Personal Information Collection**
  - ✅ Tidak mengumpulkan nama, email, phone number
  - ✅ Tidak mengumpulkan address atau location
  - ✅ Tidak mengumpulkan photo atau video dari anak
  - ✅ Tidak require account/login
  - ✅ Tidak mengumpulkan school name atau teacher name

- [x] **Limited Data Storage**
  - ✅ Data hanya stored locally (localStorage)
  - ✅ Tidak ada server database
  - ✅ Tidak ada cloud sync
  - ✅ Data bisa dihapus via Reset Progress

### 2. Advertising ✅

- [x] **No Behavioral Advertising**
  - ✅ Tidak menggunakan behavioral/targeted ads
  - ✅ Jika menggunakan ads di masa depan, HARUS menggunakan Google AdMob Family Ad Program
  - ✅ Saat ini: No ads (good for initial release)

- [x] **No Third-Party Advertising SDKs**
  - ✅ Tidak ada third-party ad networks
  - ✅ Jika future implementation, hanya Google AdMob Family Ad Program

### 3. Parental Consent ✅

- [x] **No Personal Data = No Consent Needed**
  - ✅ Karena tidak mengumpulkan personal information
  - ✅ Tidak perlu parental consent mechanism
  - ✅ App bisa langsung digunakan

**Note**: Jika di masa depan menambahkan fitur yang mengumpulkan personal info (misalnya untuk cloud sync), akan perlu parental consent mechanism.

### 4. Privacy Policy ✅

- [x] **COPPA-Compliant Privacy Policy**
  - ✅ Privacy Policy clearly states: No personal info collected
  - ✅ Privacy Policy accessible in-app (Settings → Privacy Policy)
  - ✅ Privacy Policy accessible via external URL (for Play Store)
  - ✅ Privacy Policy uses simple language
  - ✅ Privacy Policy explains what data is collected (only local progress data)
  - ✅ Privacy Policy explains how data is used (app functionality only)

**File Locations:**
- In-app: `src/components/PrivacyPolicy.tsx`
- External: `public/privacy-policy.html`
- Reference: `docs/PRIVACY_POLICY_TEMPLATE.md`

### 5. Permissions ✅

- [x] **Minimal Permissions**
  - ✅ INTERNET: Only for loading app assets
  - ✅ ACCESS_NETWORK_STATE: Only for connectivity check
  - ✅ Audio (output): Only for TTS, NOT recording
  - ✅ NO RECORD_AUDIO permission
  - ✅ NO CAMERA permission
  - ✅ NO LOCATION permission
  - ✅ NO CONTACTS permission

### 6. Third-Party Services ✅

- [x] **No Third-Party Data Sharing**
  - ✅ Tidak share data ke third party
  - ✅ Tidak menggunakan analytics yang track children
  - ✅ Tidak menggunakan third-party SDKs yang collect data
  - ✅ Tidak ada social media integration

### 7. Content ✅

- [x] **Age-Appropriate Content**
  - ✅ Content sesuai untuk usia 3+
  - ✅ Educational content only
  - ✅ No violence
  - ✅ No gambling
  - ✅ No adult content
  - ✅ No in-app purchases (saat ini)

### 8. Play Console Declaration ✅

**To Declare in Play Console:**

1. **App Category:**
   - ✅ Category: Education
   - ✅ Tags: Educational, Kids, Learning

2. **Content Rating:**
   - ✅ Children's app: Yes
   - ✅ Target age: 3+
   - ✅ Rating: PEGI 3, ESRB Everyone

3. **Data Safety:**
   - ✅ Designed for children: Yes
   - ✅ Target children under 13: Yes
   - ✅ Collect data from children: No (only ephemeral audio for TTS)

4. **Family Policy:**
   - ✅ Comply with Family Policy: Yes
   - ✅ No behavioral ads: Yes

## What to Declare in Play Console

### Data Safety Section:

**Question: Is your app designed for children?**
- Answer: **Yes**

**Question: Does your app target children under 13?**
- Answer: **Yes** (ages 3+)

**Question: Do you collect personal information from children?**
- Answer: **No**
- Clarification: Kami hanya menggunakan audio output (TTS) yang ephemeral untuk fungsionalitas aplikasi. Tidak mengumpulkan personal information.

**Question: Do you use behavioral advertising?**
- Answer: **No**
- Current status: Tidak ada ads
- Future: Jika menambahkan ads, hanya akan menggunakan Google AdMob Family Ad Program

## Future Considerations

Jika di masa depan ingin menambahkan fitur yang mengumpulkan data:

### ❌ DON'T (Tanpa Parental Consent):
- Cloud sync dengan account
- Social features (chat, sharing)
- Personalized recommendations based on behavior
- Analytics that track children
- Third-party ads (non-Family Ad Program)

### ✅ CAN DO (COPPA Compliant):
- In-app purchases (requires parental approval via Google Play)
- Subscription (requires parental approval via Google Play)
- Google AdMob Family Ad Program ads
- Local-only features (progress tracking, history)

## Common COPPA Violations to Avoid

1. **Collecting Email/Name**
   - ❌ DON'T: Require email untuk save progress
   - ✅ DO: Save progress locally only

2. **Social Media Integration**
   - ❌ DON'T: Share progress to Facebook/Twitter
   - ✅ DO: Keep all sharing within app

3. **Behavioral Ads**
   - ❌ DON'T: Use regular AdMob or targeted ads
   - ✅ DO: Use AdMob Family Ad Program only (if ads needed)

4. **Third-Party Analytics**
   - ❌ DON'T: Use analytics that track children
   - ✅ DO: Use privacy-respecting analytics or none

## Resources

- [COPPA Compliance Guide - Google Play](https://support.google.com/googleplay/android-developer/answer/9893335)
- [Family Policy - Google Play](https://support.google.com/googleplay/android-developer/answer/9888179)
- [COPPA Official Site](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa)

## Verification

Sebelum submit, pastikan:

- [x] ✅ Privacy Policy clearly states COPPA compliance
- [ ] ⚠️ Data Safety section declares: Children's app, No personal data (Perlu di-declare di Play Console)
- [ ] ⚠️ Content Rating: Children's app, 3+ (Perlu di-declare di Play Console)
- [x] ✅ No behavioral advertising
- [x] ✅ All permissions justified
- [x] ✅ Privacy Policy accessible in-app and via URL (File HTML ada, perlu di-host)
- [x] ✅ Audio data explained as ephemeral processing

## Status: ✅ COPPA COMPLIANT

Aplikasi ini saat ini fully COPPA compliant karena:
1. Tidak mengumpulkan personal information
2. Tidak menggunakan behavioral advertising
3. Data hanya stored locally
4. Minimal permissions (normal permissions only)
5. Privacy Policy comprehensive dan accessible


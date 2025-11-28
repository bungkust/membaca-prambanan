# Google Play Billing Setup Guide

## Overview

Aplikasi ini menggunakan Google Play Billing Library untuk in-app purchases di Android. Implementasi menggunakan Capacitor plugin custom yang terintegrasi dengan Google Play Billing API.

## Files Created

1. **Native Plugin**: `android/app/src/main/java/com/membaca/prambanan/BillingPlugin.java`
   - Capacitor plugin untuk Google Play Billing
   - Menangani purchase flow, restore purchases, dll

2. **TypeScript Service**: `src/services/billing-android.ts`
   - Service layer untuk komunikasi dengan native plugin
   - Sudah terintegrasi dengan `purchase.ts`

3. **Plugin Registration**: `android/app/src/main/assets/capacitor.plugins.json`
   - Plugin terdaftar untuk auto-discovery

## Setup Requirements

### 1. Google Play Console Setup

1. **Create In-App Product**:
   - Login ke [Google Play Console](https://play.google.com/console)
   - Pilih aplikasi Anda
   - Go to: **Monetize → Products → In-app products**
   - Click **Create product**
   - Product ID: `premium_unlock` (harus sama dengan di code)
   - Name: "Premium Unlock"
   - Description: "Unlock all premium features"
   - Price: IDR 29,999 (atau sesuai)
   - Status: **Active**

2. **Test Accounts**:
   - Go to: **Settings → License testing**
   - Add test email addresses
   - Test purchases akan gratis untuk test accounts

### 2. Build & Sync

```bash
# Build web assets
npm run build

# Sync to Android
npm run cap:sync

# Open in Android Studio
npm run cap:open android
```

### 3. Testing

#### Test dengan Test Account

1. **Setup Test Account**:
   - Add email ke License testing di Play Console
   - Install app di device dengan Google account tersebut

2. **Test Purchase Flow**:
   - Buka app
   - Go to Settings → Premium section
   - Click "Upgrade Sekarang"
   - Purchase flow akan muncul (Google Play dialog)
   - Complete purchase (gratis untuk test account)
   - Premium status akan ter-update

3. **Test Restore Purchases**:
   - Clear app data atau reinstall
   - Buka Premium modal
   - Click "Restore Purchases"
   - Purchase akan di-restore dari Play Store

#### Test di Development

**Note**: Google Play Billing hanya bekerja di:
- Real device dengan Google Play Services
- Emulator dengan Google Play Store (bukan AOSP)
- App harus signed dengan release keystore (untuk production testing)

**Untuk development testing**:
- Gunakan test account di Play Console
- App harus di-upload ke Internal Testing track (minimal)
- Atau gunakan web version untuk testing (simulation)

## Product ID

Product ID yang digunakan: `premium_unlock`

**PENTING**: Product ID di code harus sama dengan di Google Play Console!

## Implementation Details

### Native Plugin Methods

- `initialize()`: Initialize BillingClient
- `isAvailable()`: Check if billing service is connected
- `queryProducts()`: Query product details from Play Store
- `purchase()`: Launch purchase flow
- `restorePurchases()`: Query existing purchases

### Purchase Flow

1. User clicks "Upgrade Sekarang"
2. `purchasePremium()` called
3. Native plugin queries product details
4. Launches Google Play purchase dialog
5. User completes purchase
6. `onPurchasesUpdated()` callback triggered
7. Purchase acknowledged/consumed
8. Result returned to JavaScript
9. Premium status updated in localStorage

### Error Handling

- Billing service not connected → Retry initialization
- User canceled → Show error message
- Purchase failed → Show error with details
- Network error → Retry mechanism

## Troubleshooting

### Plugin Not Found

**Error**: `Billing plugin not found`

**Solution**:
1. Run `npm run cap:sync`
2. Rebuild app: `npm run cap:open android` → Build → Run
3. Check `capacitor.plugins.json` includes BillingPlugin

### Billing Service Not Connected

**Error**: `Billing service not connected`

**Solution**:
1. Check device has Google Play Services
2. Check internet connection
3. Wait a few seconds for service to connect
4. Try `initialize()` again

### Purchase Not Working

**Error**: Purchase fails or doesn't complete

**Check**:
1. Product ID matches Play Console (`premium_unlock`)
2. Product is **Active** in Play Console
3. App is signed with release keystore
4. Using test account (for testing)
5. App is in Internal Testing track (minimal)

### Purchase Not Restored

**Error**: Restore purchases returns "No purchases found"

**Check**:
1. Purchase was completed successfully
2. Using same Google account
3. Purchase was acknowledged (check logs)

## Production Checklist

- [ ] Product created in Play Console
- [ ] Product ID matches code (`premium_unlock`)
- [ ] Product is Active
- [ ] App signed with release keystore
- [ ] Tested with test account
- [ ] Tested restore purchases
- [ ] Error handling tested
- [ ] Premium features unlock correctly after purchase

## Notes

- **Non-consumable product**: Premium unlock is a one-time purchase
- **Acknowledgment**: Purchase is consumed to mark as acknowledged (for non-consumable, this is just to mark it)
- **Verification**: For production, consider server-side verification for security
- **Testing**: Always test with test accounts before production release


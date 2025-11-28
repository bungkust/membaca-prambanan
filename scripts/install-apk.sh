#!/bin/bash

# Script to install APK to connected Android device
# Handles version downgrade by uninstalling existing app first

APK_DIR="/Users/ruangguru/Documents/Bungkuss/android-membaca build"
PACKAGE_NAME="com.membaca.prambanan"

echo "🔍 Looking for latest APK in: $APK_DIR"

# Find latest APK file
LATEST_APK=$(ls -t "$APK_DIR"/*.apk 2>/dev/null | head -1)

if [ -z "$LATEST_APK" ]; then
    echo "❌ No APK file found in $APK_DIR"
    echo "💡 Run: npm run android:build or ./gradlew assembleRelease"
    exit 1
fi

echo "📦 Found APK: $(basename "$LATEST_APK")"
echo "📏 Size: $(du -h "$LATEST_APK" | cut -f1)"

# Check if device is connected
if ! adb devices | grep -q "device$"; then
    echo "❌ No Android device connected"
    echo "💡 Connect device via USB and enable USB debugging"
    exit 1
fi

echo "📱 Device connected: $(adb devices | grep 'device$' | head -1 | cut -f1)"

# Check if app is installed
if adb shell pm list packages | grep -q "$PACKAGE_NAME"; then
    echo "⚠️  App already installed. Uninstalling to allow fresh install..."
    adb uninstall "$PACKAGE_NAME"
    
    if [ $? -eq 0 ]; then
        echo "✅ App uninstalled successfully"
    else
        echo "⚠️  Uninstall failed, but continuing with install attempt..."
    fi
else
    echo "ℹ️  App not installed, proceeding with fresh install"
fi

# Install APK
echo ""
echo "🚀 Installing APK..."
adb install "$LATEST_APK"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ APK installed successfully!"
    echo "📱 Launch app with: adb shell am start -n $PACKAGE_NAME/.MainActivity"
else
    echo ""
    echo "❌ Installation failed"
    echo "💡 Try: adb install -r \"$LATEST_APK\" (reinstall)"
    exit 1
fi


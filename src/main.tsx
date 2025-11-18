import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { logger } from "./utils/logger";
import { isNative } from "./utils/platform";

// Register service worker for PWA functionality (web only)
// Service workers may not work properly in Capacitor WebView, so skip on native
if (!isNative() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use relative path for Capacitor compatibility
    const swPath = './sw.js';
    
    navigator.serviceWorker.register(swPath)
      .then((registration) => {
        logger.log('Service worker registered successfully:', registration.scope);
        
        // Check for updates periodically (every hour)
        setInterval(() => {
          registration.update().catch((error) => {
            logger.debug('Service worker update check failed:', error);
            // Don't log as error - update checks can fail for various reasons
          });
        }, 60 * 60 * 1000); // 1 hour
      })
      .catch((registrationError) => {
        // Log error but don't block app functionality
        logger.error('Service worker registration failed:', registrationError);
        
        // Only show error in development mode
        if (import.meta.env.DEV) {
          logger.warn('PWA features may not work correctly without service worker');
        }
      });
  });
} else if (isNative()) {
  logger.debug('Service worker registration skipped on native platform');
} else if (!('serviceWorker' in navigator)) {
  logger.debug('Service workers not supported in this browser');
}

createRoot(document.getElementById("root")!).render(<App />);

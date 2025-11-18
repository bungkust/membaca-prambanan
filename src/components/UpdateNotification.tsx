import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { isNative } from "@/utils/platform";
import { logger } from "@/utils/logger";

const UpdateNotification = () => {
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    // Only handle updates for web platform (PWA)
    // Native apps handle updates through app stores
    if (isNative()) {
      logger.debug('Update notification skipped on native platform');
      return;
    }

    // Web platform: Use Service Worker for PWA updates
    if (!('serviceWorker' in navigator)) {
      logger.debug('Service Worker not supported');
      return;
    }
    
    let registration: ServiceWorkerRegistration | null = null;
    
    navigator.serviceWorker.getRegistration()
      .then((reg) => {
        if (!reg) {
          logger.debug('No service worker registration found');
          return;
        }
        
        registration = reg;
        
        // Check for existing waiting service worker
        if (reg.waiting) {
          setWaitingSW(reg.waiting);
          setHasUpdate(true);
          logger.debug('Service worker update available (waiting)');
        }
        
        // Listen for new service worker installation
        reg.addEventListener('updatefound', () => {
          const sw = reg.installing;
          if (!sw) {
            logger.debug('No installing service worker found');
            return;
          }
          
          const stateChangeHandler = () => {
            if (sw.state === 'installed') {
              // Only show update if there's an active controller (not first install)
              if (navigator.serviceWorker.controller) {
                setWaitingSW(sw);
                setHasUpdate(true);
                logger.debug('Service worker update installed');
              } else {
                logger.debug('Service worker installed (first time)');
              }
            }
          };
          
          sw.addEventListener('statechange', stateChangeHandler);
        });
      })
      .catch((error) => {
        logger.error('Error checking for service worker updates:', error);
      });
  }, []);

  if (!hasUpdate) return null;

  const handleUpdate = () => {
    if (waitingSW) {
      // Send skip waiting message to service worker
      waitingSW.postMessage({ type: 'SKIP_WAITING' });
      logger.debug('Sent SKIP_WAITING message to service worker');
    }
    
    // Reload the page to activate the new service worker
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-card shadow-lg p-3 flex items-center gap-3">
      <span>Ada versi baru. Muat ulang?</span>
      <Button onClick={handleUpdate}>
        Perbarui
      </Button>
    </div>
  );
};

export default UpdateNotification;


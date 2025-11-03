import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const UpdateNotification = () => {
  const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingSW(sw);
            setHasUpdate(true);
          }
        });
      });
    });
  }, []);

  if (!hasUpdate) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-card shadow-lg p-3 flex items-center gap-3">
      <span>Ada versi baru. Muat ulang?</span>
      <Button
        onClick={() => {
          waitingSW?.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }}
      >
        Perbarui
      </Button>
    </div>
  );
};

export default UpdateNotification;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Download } from "lucide-react";

interface HomeProps {
  onStartQuiz: () => void;
}

const Home = ({ onStartQuiz }: HomeProps) => {
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🎉 PWA Install prompt available!', e);
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      console.log('✅ App installed successfully!');
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    // Check if already installed or if browser supports PWA
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      console.log('📱 App is already installed');
      setCanInstall(false);
    } else {
      // Show install button for production HTTPS sites
      console.log('🔍 Production site detected, showing install button');
      setCanInstall(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('🚀 Triggering PWA install prompt...');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('📱 Install outcome:', outcome);
      if (outcome === 'accepted') {
        console.log('✅ User accepted install');
        setDeferredPrompt(null);
        setCanInstall(false);
      } else {
        console.log('❌ User declined install');
      }
    } else {
      console.log('⚠️ No deferred prompt available');
      // Provide alternative installation methods
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);

      if (isIOS) {
        alert('📱 On iOS: Tap share button → "Add to Home Screen"');
      } else if (isAndroid) {
        alert('📱 On Android: Tap menu (⋮) → "Install app" or "Add to Home screen"');
      } else {
        alert('🖥️ On Desktop: Look for install icon in address bar or use browser menu');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-3xl shadow-playful p-8 text-center slide-up mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Kuis Belajar
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Pilih jenis kuis yang ingin dimainkan!
          </p>

          <div className="flex flex-col gap-4 mb-6">
            <Button
              size="lg"
              className="w-full text-2xl py-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-button btn-bounce"
              onClick={onStartQuiz}
            >
              🚀 Mulai Kuis
            </Button>

            {canInstall && (
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg py-6 border-2 border-primary/20 hover:bg-primary/5 shadow-button btn-bounce"
                onClick={handleInstallClick}
              >
                <Download className="w-5 h-5 mr-2" />
                📱 Install Aplikasi
              </Button>
            )}

            {/* Fallback button for testing */}
            <Button
              size="sm"
              variant="ghost"
              className="w-full text-sm py-2 opacity-50 hover:opacity-75"
              onClick={() => {
                console.log('🔧 Debug info:');
                console.log('canInstall:', canInstall);
                console.log('deferredPrompt:', deferredPrompt);
                console.log('Browser support:', 'serviceWorker' in navigator);
                console.log('Display mode:', window.matchMedia?.('(display-mode: standalone)')?.matches);
                alert('Check console for PWA debug info');
              }}
            >
              🔧 Debug PWA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

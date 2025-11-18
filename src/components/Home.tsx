import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Download } from "lucide-react";
import { logger } from "@/utils/logger";

// Type definition for PWA install prompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface HomeProps {
  onStartQuiz: () => void;
  onOpenInstall?: () => void;
}

const Home = ({ onStartQuiz, onOpenInstall }: HomeProps) => {
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      logger.log('🎉 PWA Install prompt available!', e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      logger.log('✅ App installed successfully!');
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    // Check if already installed or if browser supports PWA
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      logger.log('📱 App is already installed');
      setCanInstall(false);
    } else {
      // Show install button for production HTTPS sites
      logger.log('🔍 Production site detected, showing install button');
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
      logger.log('🚀 Triggering PWA install prompt...');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      logger.log('📱 Install outcome:', outcome);
      if (outcome === 'accepted') {
        logger.log('✅ User accepted install');
        setDeferredPrompt(null);
        setCanInstall(false);
      } else {
        logger.log('❌ User declined install');
      }
    } else {
      logger.log('⚠️ No deferred prompt available');
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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-card rounded-3xl shadow-playful p-4 sm:p-6 md:p-8 text-center slide-up mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Kuis Belajar
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
              Pilih jenis kuis yang ingin dimainkan!
            </p>

            <Button
              size="lg"
              className="w-full text-lg sm:text-xl md:text-2xl py-4 sm:py-6 md:py-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-button btn-bounce"
              onClick={onStartQuiz}
            >
              🚀 Mulai Kuis
            </Button>
          </div>
        </div>
      </div>

      {/* Install button at the bottom */}
      {canInstall && (
        <div className="p-4 bg-card/50 backdrop-blur-sm border-t">
          <div className="max-w-2xl mx-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full text-base sm:text-lg py-4 sm:py-6 border-2 border-primary/20 hover:bg-primary/5 shadow-button btn-bounce"
              onClick={() => {
                if (onOpenInstall) {
                  onOpenInstall();
                } else {
                  // Fallback to instructions if handler not provided
                  const instructions = `
📱 Cara Install Aplikasi:

💻 Desktop:
• Chrome/Edge: Klik ikon install di address bar
• Atau: Menu → Install "Kuis Belajar"

📱 Android:
• Chrome: Menu (⋮) → "Install app"
• Firefox: Menu (⋮) → "Install"

🍎 iOS (Safari):
• Tap tombol share → "Add to Home Screen"
• Pilih "Add" untuk install

Aplikasi akan terinstall sebagai PWA dan bisa digunakan offline! 🚀
                  `;
                  alert(instructions);
                }
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              📱 Cara Install
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

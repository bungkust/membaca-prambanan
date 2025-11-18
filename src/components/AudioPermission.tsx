import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { isNative } from "@/utils/platform";
import { speak } from "@/utils/tts";
import { logger } from "@/utils/logger";

interface AudioPermissionProps {
  onGrantPermission: () => void;
}

const AudioPermission = ({ onGrantPermission }: AudioPermissionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleActivate = async () => {
    setIsLoading(true);
    
    try {
      // Test TTS availability - platform-aware
      if (isNative()) {
        // Native platform: test Capacitor TTS
        await speak('Halo');
        // Wait a bit for speech to start and ensure it's working
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
        onGrantPermission();
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Web platform: test Web Speech API
        const utterance = new SpeechSynthesisUtterance('Halo');
        utterance.lang = 'id-ID';
        utterance.rate = 0.8;
        
        // Set timeout to prevent hanging
        const timeout = setTimeout(() => {
          setIsLoading(false);
          onGrantPermission(); // Continue anyway after timeout
        }, 3000);
        
        utterance.onend = () => {
          clearTimeout(timeout);
          setIsLoading(false);
          onGrantPermission();
        };
        
        utterance.onerror = (error) => {
          clearTimeout(timeout);
          logger.warn('TTS test error:', error);
          setIsLoading(false);
          onGrantPermission(); // Continue anyway
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        // TTS not available, but continue anyway
        setIsLoading(false);
        onGrantPermission();
      }
    } catch (error) {
      // Error testing TTS, but continue anyway
      logger.warn('TTS activation error:', error);
      setIsLoading(false);
      onGrantPermission();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-card rounded-3xl shadow-playful p-4 sm:p-6 md:p-8 text-center slide-up">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Izin Audio Diperlukan
        </h1>
        
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
          Aplikasi ini menggunakan suara untuk membantu belajar membaca. Klik tombol di bawah untuk mengaktifkan audio.
        </p>
        
        <div className="bg-muted rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left space-y-3">
          <h3 className="font-bold text-foreground mb-3">Mengapa audio diperlukan?</h3>
          <div className="flex items-start gap-3">
            <span className="text-xl sm:text-2xl">✅</span>
            <p className="text-foreground">Mendengar cara membaca suku kata yang benar</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl sm:text-2xl">✅</span>
            <p className="text-foreground">Membantu anak belajar pelafalan</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl sm:text-2xl">✅</span>
            <p className="text-foreground">Pengalaman belajar yang lebih interaktif</p>
          </div>
        </div>
        
        <Button
          size="lg"
          className="w-full text-lg sm:text-xl py-4 sm:py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-button btn-bounce"
          onClick={handleActivate}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">🔄</span> Menunggu izin audio...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Volume2 className="w-6 h-6" /> Aktifkan Audio
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AudioPermission;

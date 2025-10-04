import { Button } from "@/components/ui/button";
import { GraduationCap, Target, Volume2, History } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-3xl shadow-playful p-8 text-center slide-up">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Kuis Belajar
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          Selamat datang! Aplikasi pembelajaran interaktif dengan berbagai jenis kuis yang menyenangkan untuk anak-anak.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Berbagai Jenis Kuis</h3>
            <p className="text-muted-foreground">Berbagai jenis kuis pembelajaran yang menarik</p>
          </div>
          
          <div className="bg-gradient-to-br from-secondary/10 to-warning/10 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-warning rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Audio Interaktif</h3>
            <p className="text-muted-foreground">Dengarkan cara membaca yang benar</p>
          </div>
          
          <div className="bg-gradient-to-br from-success/10 to-accent/10 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Progress Tracking</h3>
            <p className="text-muted-foreground">Riwayat pembelajaran dan statistik</p>
          </div>
          
          <div className="bg-gradient-to-br from-warning/10 to-secondary/10 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-warning to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Sistem Reward</h3>
            <p className="text-muted-foreground">Dapatkan bintang untuk setiap pencapaian</p>
          </div>
        </div>
        
        <Button
          size="lg"
          className="w-full text-xl py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-button btn-bounce"
          onClick={onComplete}
        >
          🚀 Mulai Belajar
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

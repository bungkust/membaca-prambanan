import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface HomeProps {
  onStartQuiz: () => void;
  onOpenInstall?: () => void;
}

const Home = ({ onStartQuiz, onOpenInstall }: HomeProps) => {

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
    </div>
  );
};

export default Home;

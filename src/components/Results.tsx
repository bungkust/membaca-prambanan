import { Button } from "@/components/ui/button";
import { AppState } from "@/types/quiz";

interface ResultsProps {
  appState: AppState;
  onRetry: () => void;
  onHome: () => void;
}

const Results = ({ appState, onRetry, onHome }: ResultsProps) => {
  const totalQuestions = appState.currentSession.length;
  const score = appState.score;
  const percentage = (score / totalQuestions) * 100;
  
  const getStars = () => {
    if (percentage >= 90) return 5;
    if (percentage >= 70) return 4;
    if (percentage >= 50) return 3;
    if (percentage >= 30) return 2;
    return 1;
  };
  
  const stars = getStars();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-3xl shadow-playful p-8 text-center slide-up">
        <div className="text-8xl mb-6">🎉</div>
        
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Selamat!
          </span>
        </h1>
        
        <div className="text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">
            {score}/{totalQuestions}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-success/10 to-accent/10 rounded-2xl p-6">
            <div className="text-6xl mb-2">{score}</div>
            <div className="text-xl font-bold text-foreground">✅ Benar</div>
          </div>
          
          <div className="bg-gradient-to-br from-destructive/10 to-warning/10 rounded-2xl p-6">
            <div className="text-6xl mb-2">{totalQuestions - score}</div>
            <div className="text-xl font-bold text-foreground">❌ Salah</div>
          </div>
        </div>
        
        <div className="text-6xl mb-8">
          {'⭐'.repeat(stars)}
        </div>
        
        {appState.wrongAnswers.length > 0 && (
          <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-xl font-bold mb-4 text-center">
              ❌ Soal yang Salah ({appState.wrongAnswers.length})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {appState.wrongAnswers.map((wa, idx) => (
                <div key={idx} className="bg-card rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    {wa.question.image && (
                      <span className="text-3xl">{wa.question.image}</span>
                    )}
                    <div className="font-bold text-lg">{wa.question.display}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jawaban kamu: <span className="text-destructive font-bold">{wa.userAnswer}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jawaban benar: <span className="text-success font-bold">{wa.question.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full text-xl py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-button btn-bounce"
            onClick={onRetry}
          >
            🔄 Ulang Sesi
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full text-xl py-6 shadow-button btn-bounce"
            onClick={onHome}
          >
            🏠 Ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;

import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, History } from "lucide-react";

interface QuizSelectionProps {
  onSelectQuiz: (type: 'suku_kata' | 'awal_kata' | 'akhir_kata' | 'tengah_kata' | 'lengkapi_suku_kata' | 'lengkapi_suku_kata_belakang') => void;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenHistory?: () => void;
}

const QuizSelection = ({ onSelectQuiz, onBack, onOpenSettings, onOpenHistory }: QuizSelectionProps) => {
  const quizTypes = [
    {
      id: 'suku_kata' as const,
      emoji: '📚',
      title: 'Kuis Suku Kata',
      description: 'Belajar membaca suku kata seperti "Ba", "Ka", "Ma"',
      count: '130 Soal',
      badge: 'A-Z Lengkap',
      gradient: 'from-primary to-accent'
    },
    {
      id: 'awal_kata' as const,
      emoji: '🔤',
      title: 'Kuis Awal Kata',
      description: 'Tebak huruf pertama dari kata yang didengar',
      count: '150 Soal',
      badge: 'Kata Sehari-hari',
      gradient: 'from-accent to-success'
    },
    {
      id: 'akhir_kata' as const,
      emoji: '🎯',
      title: 'Kuis Akhir Kata',
      description: 'Tebak huruf terakhir dari kata yang didengar',
      count: '120 Soal',
      badge: 'Kata Populer',
      gradient: 'from-secondary to-warning'
    },
    {
      id: 'tengah_kata' as const,
      emoji: '🔍',
      title: 'Kuis Tengah Kata',
      description: 'Tebak huruf tengah dari kata yang didengar',
      count: '100 Soal',
      badge: 'Kata Menarik',
      gradient: 'from-success to-primary'
    },
    {
      id: 'lengkapi_suku_kata' as const,
      emoji: '🔄',
      title: 'Lengkapi Suku Kata Belakang',
      description: 'Lengkapi bagian depan kata dengan suku kata yang tepat',
      count: '80 Soal',
      badge: 'Kata Sehari-hari',
      gradient: 'from-warning to-secondary'
    },
    {
      id: 'lengkapi_suku_kata_belakang' as const,
      emoji: '✏️',
      title: 'Lengkapi Suku Kata Depan',
      description: 'Lengkapi kata dengan suku kata yang tepat',
      count: '80 Soal',
      badge: 'Kata Sehari-hari',
      gradient: 'from-info to-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex flex-col p-4 py-8">
      <div className="max-w-4xl mx-auto flex-1">
        <Button
          variant="ghost"
          size="lg"
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </Button>

        <div className="bg-card rounded-3xl shadow-playful p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Pilih Jenis Kuis
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Pilih jenis kuis yang ingin dimainkan!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {quizTypes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-card rounded-3xl shadow-playful p-6 hover:scale-105 transition-transform slide-up"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${quiz.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                <span className="text-4xl">{quiz.emoji}</span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                {quiz.title}
              </h2>

              <p className="text-muted-foreground mb-4">
                {quiz.description}
              </p>

              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-semibold text-foreground">
                  {quiz.count}
                </span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold text-primary">
                  {quiz.badge}
                </span>
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${quiz.gradient} hover:opacity-90 transition-all shadow-button btn-bounce`}
                size="lg"
                onClick={() => onSelectQuiz(quiz.id)}
              >
                🚀 Mulai Kuis
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings and History buttons at the bottom */}
      {(onOpenSettings || onOpenHistory) && (
        <div className="mt-8 p-4 bg-card/50 backdrop-blur-sm border-t">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {onOpenSettings && (
                <Button
                  variant="outline"
                  size="lg"
                  className="h-20 text-base bg-card hover:bg-muted border-2 shadow-button btn-bounce"
                  onClick={onOpenSettings}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Pengaturan
                </Button>
              )}

              {onOpenHistory && (
                <Button
                  variant="outline"
                  size="lg"
                  className="h-20 text-base bg-card hover:bg-muted border-2 shadow-button btn-bounce"
                  onClick={onOpenHistory}
                >
                  <History className="w-5 h-5 mr-2" />
                  Riwayat
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSelection;

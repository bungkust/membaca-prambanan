import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, History, Star, Trophy, Zap } from "lucide-react";

interface QuizSelectionProps {
  onSelectQuiz: (type: 'suku_kata' | 'awal_kata' | 'akhir_kata' | 'tengah_kata' | 'lengkapi_suku_kata' | 'lengkapi_suku_kata_belakang') => void;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenHistory?: () => void;
  sessionHistory?: any[];
}

const QuizSelection = ({ onSelectQuiz, onBack, onOpenSettings, onOpenHistory, sessionHistory = [] }: QuizSelectionProps) => {
  const quizTypes = [
    {
      id: 'suku_kata' as const,
      emoji: '📚',
      title: 'Suku Kata',
      description: 'Pelajari suku kata dasar',
      count: '150 Soal',
      badge: 'Dasar',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'awal_kata' as const,
      emoji: '🔤',
      title: 'Awal Kata',
      description: 'Tebak huruf awal dari kata',
      count: '150 Soal',
      badge: 'Huruf Awal',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'akhir_kata' as const,
      emoji: '🎯',
      title: 'Akhir Kata',
      description: 'Tebak huruf akhir dari kata',
      count: '150 Soal',
      badge: 'Huruf Akhir',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'tengah_kata' as const,
      emoji: '🔍',
      title: 'Kuis Tengah Kata',
      description: 'Tebak huruf tengah dari kata yang didengar',
      count: '150 Soal',
      badge: 'Kata Menarik',
      gradient: 'from-success to-primary'
    },
    {
      id: 'lengkapi_suku_kata' as const,
      emoji: '🔄',
      title: 'Lengkapi Suku Kata Belakang',
      description: 'Lengkapi bagian depan kata dengan suku kata yang tepat',
      count: '150 Soal',
      badge: 'Kata Sehari-hari',
      gradient: 'from-warning to-secondary'
    },
    {
      id: 'lengkapi_suku_kata_belakang' as const,
      emoji: '✏️',
      title: 'Lengkapi Suku Kata Depan',
      description: 'Lengkapi kata dengan suku kata yang tepat',
      count: '150 Soal',
      badge: 'Kata Sehari-hari',
      gradient: 'from-info to-primary'
    }
  ];

  // Calculate total stars earned across all quiz types
  const getTotalStars = () => {
    return sessionHistory.reduce((total, session) => total + (session.stars || 0), 0);
  };

  // Calculate stars for each quiz type (for individual display)
  const calculateQuizStars = (quizType: string) => {
    const sessions = sessionHistory.filter(session => session.quizType === quizType);
    if (sessions.length === 0) return 0;

    const totalStars = sessions.reduce((sum, session) => sum + (session.stars || 0), 0);
    return totalStars; // No cap - show actual stars earned
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
      <div className="max-w-4xl mx-auto">
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

        {/* Star Summary Section */}
        <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-3xl p-8 mb-8 border-3 border-yellow-200 shadow-2xl overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/30 to-yellow-200/30 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Sparkle effects */}
          <div className="absolute top-4 right-8 text-yellow-300/60 animate-pulse">
            <Zap className="w-6 h-6" />
          </div>
          <div className="absolute bottom-6 left-6 text-orange-300/60 animate-pulse delay-1000">
            <Star className="w-4 h-4" />
          </div>

          <div className="relative z-10 text-center">
            {/* Trophy icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Main star count */}
            <div className="mb-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {getTotalStars()}
              </span>
              <span className="text-2xl font-semibold text-yellow-700 ml-2">
                Bintang
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-yellow-600 font-medium mb-3">
              ✨ Pencapaian Belajar Kamu ✨
            </p>

            {/* Encouraging message */}
            <p className="text-sm text-yellow-600/80 bg-white/50 rounded-full px-4 py-2 inline-block">
              🚀 Lanjutkan petualangan belajarmu!
            </p>
          </div>
        </div>

        {/* Settings and History buttons */}
        {(onOpenSettings || onOpenHistory) && (
          <div className="grid grid-cols-2 gap-4 mb-8">
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
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {quizTypes.map((quiz) => {
            const stars = calculateQuizStars(quiz.id);
            return (
              <div
                key={quiz.id}
                className="bg-card rounded-3xl shadow-playful p-6 hover:scale-105 transition-transform slide-up"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${quiz.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-4xl">{quiz.emoji}</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {quiz.title}
                  </h2>
                </div>

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
                  {stars > 0 && (
                    <span className="px-3 py-1 bg-yellow-100 rounded-full text-sm font-semibold text-yellow-800">
                      ⭐ {stars} Bintang
                    </span>
                  )}
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${quiz.gradient} hover:opacity-90 transition-all shadow-button btn-bounce`}
                  size="lg"
                  onClick={() => onSelectQuiz(quiz.id)}
                >
                  🚀 Mulai Kuis
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;

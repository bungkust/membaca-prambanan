import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, History, Star, Trophy, Zap, Lock, Crown } from "lucide-react";
import { getAllQuizMetadata, QuizId } from "@/features/quiz";
import { SessionHistory } from "@/types/quiz";
import { isPremium, canPlayPremiumQuiz, getTrialCount, getRemainingTrialSessions, isTrialExhausted } from "@/services/premium";
import { isPremiumQuizType, PREMIUM_QUIZ_TYPES } from "@/types/premium";

interface QuizSelectionProps {
  onSelectQuiz: (type: QuizId) => void;
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenHistory?: () => void;
  onOpenPremium?: () => void;
  sessionHistory?: SessionHistory[];
}

const QuizSelection = ({ onSelectQuiz, onBack, onOpenSettings, onOpenHistory, onOpenPremium, sessionHistory = [] }: QuizSelectionProps) => {
  // Auto-generated from registry - no need to manually maintain this list
  const quizTypes = getAllQuizMetadata();
  const premium = isPremium();
  
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

        <div className="bg-card rounded-3xl shadow-playful p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Pilih Jenis Kuis
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Pilih jenis kuis yang ingin dimainkan!
          </p>
        </div>

        {/* Star Summary Section */}
        <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border-2 border-yellow-200 shadow-lg overflow-hidden">
          {/* Background decorative elements - smaller */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-200/20 to-yellow-200/20 rounded-full translate-y-8 -translate-x-8"></div>

          {/* Sparkle effects - smaller */}
          <div className="absolute top-2 right-4 text-yellow-300/50 animate-pulse">
            <Zap className="w-4 h-4" />
          </div>
          <div className="absolute bottom-3 left-3 text-orange-300/50 animate-pulse delay-1000">
            <Star className="w-3 h-3" />
          </div>

          <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
            {/* Trophy icon - smaller */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 sm:p-2.5 rounded-xl shadow-md flex-shrink-0">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            {/* Main content - centered */}
            <div className="flex-1 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {getTotalStars()}
              </span>
                <span className="text-base sm:text-lg font-semibold text-yellow-700">
                Bintang
              </span>
            </div>
              <p className="text-xs sm:text-sm text-yellow-600/90 font-medium">
              ✨ Pencapaian Belajar Kamu ✨
            </p>
            </div>
          </div>
        </div>

        {/* Settings and History buttons */}
        {(onOpenSettings || onOpenHistory) && (
          <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
            {onOpenSettings && (
              <Button
                variant="outline"
                size="lg"
                className="h-16 sm:h-20 text-base bg-card hover:bg-muted border-2 shadow-button btn-bounce"
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
                className="h-16 sm:h-20 text-base bg-card hover:bg-muted border-2 shadow-button btn-bounce"
                onClick={onOpenHistory}
              >
                <History className="w-5 h-5 mr-2" />
                Riwayat
              </Button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {quizTypes.map((quiz) => {
            const stars = calculateQuizStars(quiz.id);
            const isPremiumQuiz = isPremiumQuizType(quiz.id);
            const canPlay = canPlayPremiumQuiz(quiz.id);
            const trialExhausted = isTrialExhausted(quiz.id);
            const trialCount = getTrialCount(quiz.id);
            const remainingTrial = getRemainingTrialSessions(quiz.id);
            
            return (
              <div
                key={quiz.id}
                className={`bg-card rounded-3xl shadow-playful p-4 sm:p-6 transition-transform slide-up ${
                  !canPlay ? 'opacity-75' : 'hover:scale-105'
                }`}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${quiz.gradient} rounded-2xl flex items-center justify-center mb-4 relative`}>
                  <span className="text-4xl">{quiz.emoji}</span>
                  {isPremiumQuiz && !premium && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
                      <Crown className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {quiz.title}
                  </h2>
                </div>

                <p className="text-muted-foreground mb-4">
                  {quiz.description}
                </p>

                <div className="flex gap-2 mb-6 flex-wrap">
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
                  {isPremiumQuiz && !premium && (
                    <>
                      {!trialExhausted ? (
                        <span className="px-3 py-1 bg-green-100 rounded-full text-sm font-semibold text-green-800">
                          🎁 Trial: {trialCount}/{2}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 rounded-full text-sm font-semibold text-red-800">
                          🔒 Trial habis
                        </span>
                      )}
                    </>
                  )}
                </div>

                {canPlay ? (
                  <Button
                    className={`w-full bg-gradient-to-r ${quiz.gradient} hover:opacity-90 transition-all shadow-button btn-bounce`}
                    size="lg"
                    onClick={() => onSelectQuiz(quiz.id)}
                  >
                    🚀 Mulai Kuis
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                      size="lg"
                      disabled
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Trial Habis
                    </Button>
                    {onOpenPremium && (
                      <Button
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white shadow-button btn-bounce"
                        size="lg"
                        onClick={onOpenPremium}
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade ke Premium
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;

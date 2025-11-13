import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { Question, Settings, AppState, WrongAnswer } from "@/types/quiz";
import { generateQuizQuestions, QuizId } from "@/features/quiz";
import { speak } from "@/utils/tts";
import { safeSet } from "@/utils/storage";
import { logger } from "@/utils/logger";
import QuizLayout from "@/components/design/QuizLayout";
import QuizHeader from "@/components/design/QuizHeader";
import QuizStats from "@/components/design/QuizStats";
import QuizProgress from "@/components/design/QuizProgress";
import QuizCard from "@/components/design/QuizCard";
import QuizOption from "@/components/design/QuizOption";

interface QuizProps {
  quizType: QuizId;
  settings: Settings;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  onComplete: (score: number, wrongAnswers: WrongAnswer[], sessionStartTime?: number, finalStars?: number) => void;
  onBack: () => void;
}

const Quiz = ({ quizType, settings, appState, setAppState, onComplete, onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(settings.timerSeconds);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  // Use ref to track if quiz has been initialized to prevent infinite loops
  const isInitialized = useRef(false);

  // Define handleNext first since it's used by handleTimeout
  const handleNext = useCallback(() => {
    const nextIndex = appState.currentQuestionIndex + 1;

    if (nextIndex < appState.currentSession.length) {
      const nextQuestion = appState.currentSession[nextIndex];

      setAppState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        seenIds: settings.rememberAcrossSessions
          ? new Set([...prev.seenIds, currentQuestion?.id || ''])
          : prev.seenIds
      }));

      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
      setHasAnswered(false);

      // Save seen IDs
      if (settings.rememberAcrossSessions && currentQuestion) {
        const seenArray = Array.from(new Set([...appState.seenIds, currentQuestion.id]));
        safeSet('seenIds', seenArray);
      }

      // Note: TTS only triggered manually via button click
    } else {
      // Quiz complete - use a callback to get the latest state
      setAppState(prev => {
        const latestState = {
          ...prev,
          seenIds: settings.rememberAcrossSessions && currentQuestion
            ? new Set([...prev.seenIds, currentQuestion.id])
            : prev.seenIds
        };

        // Save seen IDs for the final question
        if (settings.rememberAcrossSessions && currentQuestion) {
          const seenArray = Array.from(latestState.seenIds);
          safeSet('seenIds', seenArray);
        }

        // Schedule onComplete with the latest state
        setTimeout(() => {
          onComplete(latestState.score, latestState.wrongAnswers, latestState.currentSessionStart, latestState.currentStars);
        }, 50);

        return latestState;
      });
    }
  }, [appState.currentQuestionIndex, appState.currentSession, appState.seenIds, currentQuestion, settings.rememberAcrossSessions, setAppState, onComplete]);

  // Define handleTimeout after handleNext
  const handleTimeout = useCallback(() => {
    if (!hasAnswered && currentQuestion) {
      setHasAnswered(true);
      setIsCorrect(false);
      setShowFeedback(true);
      
      const wrongAnswer: WrongAnswer = {
        question: currentQuestion,
        userAnswer: '(Waktu Habis)'
      };
      
      setAppState(prev => ({
        ...prev,
        wrongAnswers: [...prev.wrongAnswers, wrongAnswer]
      }));
      
      setTimeout(handleNext, 2000);
    }
  }, [hasAnswered, currentQuestion, setAppState, handleNext]);

  // Track previous quizType to detect changes
  const prevQuizTypeRef = useRef<QuizId | null>(null);
  const initializedQuizTypeRef = useRef<QuizId | null>(null);

  // Initialize quiz session - only run once when component mounts or quizType changes
  useEffect(() => {
    // Reset initialization flag if quizType changed
    if (prevQuizTypeRef.current !== quizType) {
      isInitialized.current = false;
      prevQuizTypeRef.current = quizType;
    }
    
    // Prevent re-initialization if already initialized for this quizType
    if (isInitialized.current && initializedQuizTypeRef.current === quizType) {
      return;
    }
    
    const questions = generateQuizQuestions(
      quizType,
      settings.questionsPerSession,
      settings.rememberAcrossSessions ? appState.seenIds : new Set()
    );
    
    // Validate questions array
    if (!questions || questions.length === 0) {
      logger.error('No questions generated for quiz type:', quizType);
      onBack();
      return;
    }
    
    setAppState(prev => ({
      ...prev,
      currentSession: questions,
      currentQuestionIndex: 0,
      score: 0,
      wrongAnswers: [],
      currentSessionStart: Date.now(),
      currentStars: 0
    }));
    
    setCurrentQuestion(questions[0]);
    isInitialized.current = true;
    initializedQuizTypeRef.current = quizType;
    
    // Note: TTS only triggered manually via button click
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizType]); // Only depend on quizType to prevent infinite loops

  // Timer effect
  useEffect(() => {
    if (settings.timerSeconds > 0 && !hasAnswered && currentQuestion) {
      setTimeRemaining(settings.timerSeconds);

      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [appState.currentQuestionIndex, hasAnswered, settings.timerSeconds, currentQuestion, handleTimeout]);

  const handleAnswerSelect = (answer: string) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answer);
    setHasAnswered(true);
    
    const correct = answer === currentQuestion?.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setAppState(prev => {
        const newScore = prev.score + 1;
        const newStars = (prev.currentStars || 0) + 1;

        // debug logs removed in production

        const updatedState = {
          ...prev,
          score: newScore,
          currentStars: newStars
        };

        // If this is the last question, let handleNext handle the completion
        // (No onComplete call here to avoid duplication)

        return updatedState;
      });
      // Note: TTS feedback disabled
    } else {
      // Note: TTS feedback disabled
      
      if (currentQuestion) {
        const wrongAnswer: WrongAnswer = {
          question: currentQuestion,
          userAnswer: answer
        };
        
        setAppState(prev => {
          const updatedState = {
            ...prev,
            wrongAnswers: [...prev.wrongAnswers, wrongAnswer]
          };

          // If this is the last question, let handleNext handle the completion
          // (No onComplete call here to avoid duplication)

          return updatedState;
        });
      }
    }
    
    // Always call handleNext after answering (whether correct or wrong)
    setTimeout(handleNext, 2500);
  };

  const handlePlayAudio = useCallback(() => {
    if (currentQuestion) {
      speak(currentQuestion.ttsText, settings.selectedVoice);
    }
  }, [currentQuestion, settings.selectedVoice]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      // Cancel any ongoing speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Validate questions array
  const hasQuestions = useMemo(() => {
    return appState.currentSession && appState.currentSession.length > 0;
  }, [appState.currentSession]);

  if (!currentQuestion || !hasQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Tidak ada soal tersedia</div>
          <Button onClick={onBack}>Kembali</Button>
        </div>
      </div>
    );
  }

  const progress = ((appState.currentQuestionIndex + 1) / appState.currentSession.length) * 100;

  return (
    <QuizLayout
      topBar={
        <QuizHeader
          onBack={onBack}
          right={
            <QuizStats
              showTimer={settings.timerSeconds > 0}
              timeRemaining={timeRemaining}
              stars={appState.currentStars || 0}
            />
          }
        />
      }
    >
      <QuizProgress
        current={appState.currentQuestionIndex + 1}
        total={appState.currentSession.length}
        level={currentQuestion.level}
      />
      <QuizCard>
          {currentQuestion.image && (
            <div className="text-8xl text-center mb-6">
              {currentQuestion.image}
            </div>
          )}
          
          <div className="text-center mb-6">
            {/* Hide the syllable display for suku kata quizzes */}
            {quizType !== 'suku_kata' && (
              <h2 className="text-6xl font-bold mb-4">
                {currentQuestion.display}
              </h2>
            )}

            <p className="text-xl text-muted-foreground mb-4">
              {currentQuestion.prompt || 'Dengarkan audio dan pilih jawaban yang benar'}
            </p>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handlePlayAudio}
              className="shadow-button btn-bounce"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Dengarkan
            </Button>
          </div>
          
          {showFeedback && (
            <div className={`text-center mb-6 p-6 rounded-2xl ${isCorrect ? 'bg-success/10' : 'bg-destructive/10'} popup-bounce`}>
              <div className="text-6xl mb-2">{isCorrect ? '🎉' : '❌'}</div>
              <h3 className="text-3xl font-bold mb-2">
                {isCorrect ? 'Benar!' : 'Salah'}
              </h3>
              {!isCorrect && (
                <p className="text-xl">
                  Jawaban yang benar: <span className="font-bold">{currentQuestion.answer}</span>
                </p>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswer === choice;
              const isAnswer = choice === currentQuestion.answer;
              return (
                <QuizOption
                  key={index}
                  label={choice}
                  isSelected={isSelected}
                  isAnswer={isAnswer}
                  showFeedback={showFeedback}
                  isCorrect={isCorrect}
                  disabled={hasAnswered}
                  onSelect={() => handleAnswerSelect(choice)}
                />
              );
            })}
          </div>
      </QuizCard>
      {!hasAnswered && (
        <div className="text-center text-muted-foreground">
          💡 Pilih jawaban untuk melanjutkan ke soal berikutnya
        </div>
      )}
    </QuizLayout>
  );
};

export default Quiz;

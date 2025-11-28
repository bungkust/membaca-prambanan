import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AudioPermission from "@/components/AudioPermission";
import Onboarding from "@/components/Onboarding";
import Home from "@/components/Home";
import QuizSelection from "@/components/QuizSelection";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";
import Settings from "@/components/Settings";
import InstallInstructions from "@/components/InstallInstructions";
import History from "@/components/History";
import MengenalSukuKata from "@/components/MengenalSukuKata";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import TermsOfService from "@/components/TermsOfService";
import PremiumUnlock from "@/components/PremiumUnlock";
import { Settings as SettingsType, AppState, SessionHistory, WrongAnswer } from "@/types/quiz";
import { safeParse, safeSet, safeParseSettings, safeParseSessionHistory, safeParseAppState } from "@/utils/storage";
import { QuizId, getQuizDefinition } from "@/features/quiz";
import { ScreenType, isValidScreenType } from "@/types/app";
import { initializeBilling } from "@/services/purchase";
import { isNative } from "@/utils/platform";
import { logger } from "@/utils/logger";

const Index = () => {
  const [screen, setScreen] = useState<ScreenType>('AUDIO_PERMISSION');
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);
  const [onboardingSeen, setOnboardingSeen] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState<QuizId>('suku_kata');
  const [showPremium, setShowPremium] = useState(false);
  
  const [settings, setSettings] = useState<SettingsType>({
    questionsPerSession: 10,
    rememberAcrossSessions: true,
    timerSeconds: 0,
    selectedVoice: 'auto'
  });
  
  const [appState, setAppState] = useState<AppState>({
    currentSession: [],
    currentQuestionIndex: 0,
    score: 0,
    wrongAnswers: [],
    seenIds: new Set(),
    sessionHistory: [],
    currentSessionStart: null,
    currentStars: 0
  });

  // Load saved data on mount with validation
  useEffect(() => {
    const savedOnboarding = localStorage.getItem('onboardingSeen');
    const savedAudio = localStorage.getItem('audioPermissionGranted');
    const savedSettings = safeParseSettings(localStorage.getItem('settings'), settings);
    const savedSeenIds = safeParse<string[] | null>(localStorage.getItem('seenIds'), null);
    const savedHistory = safeParseSessionHistory(localStorage.getItem('sessionHistory'), []);
    const savedAppState = safeParseAppState(localStorage.getItem('appState'), appState);

    if (savedOnboarding === 'true') {
      setOnboardingSeen(true);
    }
    if (savedAudio === 'true') {
      setAudioPermissionGranted(true);
    }
    if (savedSettings) {
      setSettings(savedSettings);
    }
    if (savedSeenIds) {
      setAppState(prev => ({
        ...prev,
        seenIds: new Set(savedSeenIds)
      }));
    }
    if (savedHistory.length > 0) {
      setAppState(prev => ({
        ...prev,
        sessionHistory: savedHistory
      }));
    }
    // Load full app state if available
    if (savedAppState && savedAppState !== appState) {
      setAppState(savedAppState);
    }

    // Initialize billing for native platforms
    if (isNative()) {
      logger.log('Initializing billing for native platform...');
      initializeBilling()
        .then(success => {
          if (success) {
            logger.log('Billing initialized successfully');
          } else {
            logger.warn('Failed to initialize native billing. App will continue but purchases may not work.');
          }
        })
        .catch(error => {
          logger.error('Error initializing billing:', error);
        });
    } else {
      logger.log('Skipping billing initialization (web platform)');
    }
  }, []);

  // Navigate to appropriate screen
  useEffect(() => {
    if (audioPermissionGranted && onboardingSeen) {
      setScreen('HOME');
    } else if (audioPermissionGranted) {
      setScreen('ONBOARDING');
    } else {
      setScreen('AUDIO_PERMISSION');
    }
  }, [audioPermissionGranted, onboardingSeen]);

  const handleAudioPermission = () => {
    setAudioPermissionGranted(true);
    localStorage.setItem('audioPermissionGranted', 'true');
    setScreen('ONBOARDING');
  };

  const handleOnboardingComplete = () => {
    setOnboardingSeen(true);
    localStorage.setItem('onboardingSeen', 'true');
    setScreen('HOME');
  };

  const handleQuizTypeSelect = (type: QuizId) => {
    setSelectedQuizType(type);
    const quiz = getQuizDefinition(type);
    if (quiz?.metadata.isSpecial && quiz.metadata.routeTo) {
      const routeTo = quiz.metadata.routeTo;
      if (isValidScreenType(routeTo)) {
        setScreen(routeTo);
      } else {
        setScreen('QUIZ');
      }
    } else {
      setScreen('QUIZ');
    }
  };

  const handleNavigateHome = () => {
    setScreen('HOME');
  };

  const handleNavigateQuizSelection = () => {
    setScreen('QUIZ_SELECTION');
  };

  const handleNavigateSettings = () => {
    setScreen('SETTINGS');
  };

  const handleNavigateHistory = () => {
    setScreen('HISTORY');
  };

  const handleNavigateInstall = () => {
    setScreen('INSTALL');
  };

  const handleNavigatePrivacyPolicy = () => {
    setScreen('PRIVACY_POLICY');
  };

  const handleNavigateTermsOfService = () => {
    setScreen('TERMS_OF_SERVICE');
  };

  const handleQuizComplete = (finalScore: number, wrongAnswers: WrongAnswer[], sessionStartTime?: number, finalStars?: number) => {
    // Use the stars earned during the quiz session (from Quiz component if provided, fallback to appState)
    const starsEarned = finalStars !== undefined ? finalStars : (appState.currentStars || 0);

    // Calculate duration - use provided sessionStartTime or fallback to currentSessionStart
    const endTime = Date.now();
    const startTime = sessionStartTime || appState.currentSessionStart || endTime;
    const duration = Math.max(0, endTime - startTime);

    // Debug logging removed - use logger.debug() if needed in development

    // Save session to history with stars earned during session
    const session: SessionHistory = {
      id: Date.now().toString(),
      quizType: selectedQuizType,
      score: finalScore,
      totalQuestions: appState.currentSession.length,
      timestamp: endTime,
      wrongAnswers: wrongAnswers,
      duration: duration,
      stars: starsEarned
    };

    // Debug logging removed - use logger.debug() if needed in development

    const newHistory = [session, ...appState.sessionHistory];
    setAppState(prev => ({
      ...prev,
      sessionHistory: newHistory
    }));
    safeSet('sessionHistory', newHistory);

    setScreen('RESULTS');
  };

  const handleRetryQuiz = () => {
    setScreen('QUIZ');
  };

  const handleSettingsUpdate = (newSettings: SettingsType) => {
    setSettings(newSettings);
    safeSet('settings', newSettings);
  };

  const handleResetProgress = () => {
    setAppState({
      currentSession: [],
      currentQuestionIndex: 0,
      score: 0,
      wrongAnswers: [],
      seenIds: new Set(),
      sessionHistory: [],
      currentSessionStart: null,
      currentStars: 0
    });
    setSettings({
      questionsPerSession: 10,
      rememberAcrossSessions: true,
      timerSeconds: 0,
      selectedVoice: 'auto'
    });
    localStorage.removeItem('seenIds');
    localStorage.removeItem('sessionHistory');
  };

  return (
    <>
      {screen === 'AUDIO_PERMISSION' && (
        <AudioPermission onGrantPermission={handleAudioPermission} />
      )}
      
      {screen === 'ONBOARDING' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {screen === 'HOME' && (
        <Home 
          onStartQuiz={handleNavigateQuizSelection}
          onOpenInstall={handleNavigateInstall}
        />
      )}
      
      {screen === 'QUIZ_SELECTION' && (
        <QuizSelection 
          onSelectQuiz={handleQuizTypeSelect}
          onBack={handleNavigateHome}
          onOpenSettings={handleNavigateSettings}
          onOpenHistory={handleNavigateHistory}
          onOpenPremium={() => setShowPremium(true)}
          sessionHistory={appState.sessionHistory}
        />
      )}
      
      {screen === 'QUIZ' && (
        <Quiz 
          quizType={selectedQuizType}
          settings={settings}
          appState={appState}
          setAppState={setAppState}
          onComplete={handleQuizComplete}
          onBack={handleNavigateQuizSelection}
        />
      )}

      {screen === 'MENGENAL_SUKU_KATA' && (
        <MengenalSukuKata onBack={handleNavigateQuizSelection} settings={settings} />
      )}
      
      {screen === 'RESULTS' && (
        <Results 
          appState={appState}
          onRetry={handleRetryQuiz}
          onHome={handleNavigateHome}
          onQuizSelection={handleNavigateQuizSelection}
          onOpenPremium={() => setShowPremium(true)}
        />
      )}
      
      {screen === 'INSTALL' && (
        <InstallInstructions onBack={handleNavigateQuizSelection} />
      )}

      {screen === 'SETTINGS' && (
        <Settings 
          settings={settings}
          onUpdateSettings={handleSettingsUpdate}
          onResetProgress={handleResetProgress}
          onBack={handleNavigateQuizSelection}
          onOpenPrivacyPolicy={handleNavigatePrivacyPolicy}
          onOpenTermsOfService={handleNavigateTermsOfService}
          onOpenPremium={() => setShowPremium(true)}
        />
      )}

      {screen === 'PRIVACY_POLICY' && (
        <PrivacyPolicy onBack={handleNavigateSettings} />
      )}

      {screen === 'TERMS_OF_SERVICE' && (
        <TermsOfService onBack={handleNavigateSettings} />
      )}
      
      {screen === 'ABOUT' && (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button variant="ghost" size="lg" className="mb-6" onClick={handleNavigateSettings}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
            <div className="bg-card rounded-3xl shadow-playful p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Tentang Aplikasi
                </span>
              </h1>
              <p className="text-center text-muted-foreground mb-6">
                Informasi lengkap tentang Kuis Belajar Membaca
              </p>
            </div>
          </div>
        </div>
      )}
      
      {screen === 'HISTORY' && (
        <History 
          sessionHistory={appState.sessionHistory}
          onBack={handleNavigateQuizSelection}
          onClearHistory={() => {
            setAppState(prev => ({
              ...prev,
              sessionHistory: []
            }));
            localStorage.removeItem('sessionHistory');
          }}
          onQuizSelection={handleNavigateQuizSelection}
          onOpenPremium={() => setShowPremium(true)}
        />
      )}
      
      {/* Premium Unlock Dialog - available from any screen */}
      <PremiumUnlock
        open={showPremium}
        onClose={() => setShowPremium(false)}
        onPurchaseSuccess={() => {
          // Refresh UI after purchase
          window.location.reload(); // Simple approach - reload to refresh premium status
        }}
      />
    </>
  );
};

export default Index;

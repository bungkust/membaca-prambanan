import { useState, useEffect } from "react";
import AudioPermission from "@/components/AudioPermission";
import Onboarding from "@/components/Onboarding";
import Home from "@/components/Home";
import QuizSelection from "@/components/QuizSelection";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";
import Settings from "@/components/Settings";
import InstallInstructions from "@/components/InstallInstructions";

const Index = () => {
  const [screen, setScreen] = useState<'AUDIO_PERMISSION' | 'ONBOARDING' | 'HOME' | 'QUIZ_SELECTION' | 'QUIZ' | 'RESULTS' | 'SETTINGS' | 'HISTORY' | 'INSTALL'>('AUDIO_PERMISSION');
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);
  const [onboardingSeen, setOnboardingSeen] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState<'suku_kata' | 'awal_kata' | 'akhir_kata' | 'tengah_kata' | 'lengkapi_suku_kata'>('suku_kata');
  
  const [settings, setSettings] = useState<SettingsType>({
    questionsPerSession: 10,
    rememberAcrossSessions: true,
    timerSeconds: 0
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

  // Load saved data on mount
  useEffect(() => {
    const savedOnboarding = localStorage.getItem('onboardingSeen');
    const savedAudio = localStorage.getItem('audioPermissionGranted');
    const savedSettings = localStorage.getItem('settings');
    const savedSeenIds = localStorage.getItem('seenIds');
    const savedHistory = localStorage.getItem('sessionHistory');

    console.log('💾 LOADING SAVED DATA:', {
      hasHistory: !!savedHistory,
      historyLength: savedHistory ? JSON.parse(savedHistory).length : 0,
      historyData: savedHistory ? JSON.parse(savedHistory) : null
    });

    if (savedOnboarding === 'true') {
      setOnboardingSeen(true);
    }
    if (savedAudio === 'true') {
      setAudioPermissionGranted(true);
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    if (savedSeenIds) {
      setAppState(prev => ({
        ...prev,
        seenIds: new Set(JSON.parse(savedSeenIds))
      }));
    }
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      console.log('📚 LOADED HISTORY SESSIONS:', history.map((session: any) => ({
        id: session.id,
        score: session.score,
        totalQuestions: session.totalQuestions,
        stars: session.stars,
        quizType: session.quizType
      })));

      setAppState(prev => ({
        ...prev,
        sessionHistory: history
      }));
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

  const handleQuizTypeSelect = (type: typeof selectedQuizType) => {
    setSelectedQuizType(type);
    setScreen('QUIZ');
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

  const handleQuizComplete = (finalScore: number, wrongAnswers: any[], sessionStartTime?: number, finalStars?: number) => {
    // Use the stars earned during the quiz session (from Quiz component if provided, fallback to appState)
    const starsEarned = finalStars !== undefined ? finalStars : (appState.currentStars || 0);

    // Calculate duration - use provided sessionStartTime or fallback to currentSessionStart
    const endTime = Date.now();
    const startTime = sessionStartTime || appState.currentSessionStart || endTime;
    const duration = Math.max(0, endTime - startTime);

    console.log('🔍 QUIZ COMPLETION DEBUG:', {
      finalScore,
      starsEarned,
      providedFinalStars: finalStars,
      appStateScore: appState.score,
      appStateCurrentStars: appState.currentStars,
      totalQuestions: appState.currentSession.length,
      startTime,
      endTime,
      duration,
      currentSessionStart: appState.currentSessionStart,
      providedSessionStart: sessionStartTime
    });

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

    console.log('💾 SESSION SAVED:', {
      sessionId: session.id,
      sessionScore: session.score,
      sessionStars: session.stars,
      sessionTotalQuestions: session.totalQuestions
    });

    const newHistory = [session, ...appState.sessionHistory];
    setAppState(prev => ({
      ...prev,
      sessionHistory: newHistory
    }));
    localStorage.setItem('sessionHistory', JSON.stringify(newHistory));

    setScreen('RESULTS');
  };

  const handleRetryQuiz = () => {
    setScreen('QUIZ');
  };

  const handleSettingsUpdate = (newSettings: SettingsType) => {
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
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
      
      {screen === 'RESULTS' && (
        <Results 
          appState={appState}
          onRetry={handleRetryQuiz}
          onHome={handleNavigateHome}
          onQuizSelection={handleNavigateQuizSelection}
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
        />
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
        />
      )}
    </>
  );
};

export default Index;

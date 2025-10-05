import { useState, useEffect } from "react";
import AudioPermission from "@/components/AudioPermission";
import Onboarding from "@/components/Onboarding";
import Home from "@/components/Home";
import QuizSelection from "@/components/QuizSelection";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";
import Settings from "@/components/Settings";
import History from "@/components/History";
import { AppState, Settings as SettingsType, SessionHistory } from "@/types/quiz";

const Index = () => {
  const [screen, setScreen] = useState<'AUDIO_PERMISSION' | 'ONBOARDING' | 'HOME' | 'QUIZ_SELECTION' | 'QUIZ' | 'RESULTS' | 'SETTINGS' | 'HISTORY'>('AUDIO_PERMISSION');
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
    currentSessionStart: null
  });

  // Load saved data on mount
  useEffect(() => {
    const savedOnboarding = localStorage.getItem('onboardingSeen');
    const savedAudio = localStorage.getItem('audioPermissionGranted');
    const savedSettings = localStorage.getItem('settings');
    const savedSeenIds = localStorage.getItem('seenIds');
    const savedHistory = localStorage.getItem('sessionHistory');
    
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
      setAppState(prev => ({
        ...prev,
        sessionHistory: JSON.parse(savedHistory)
      }));
    }
    
    // Navigate to appropriate screen
    if (savedAudio === 'true' && savedOnboarding === 'true') {
      setScreen('HOME');
    } else if (savedAudio === 'true') {
      setScreen('ONBOARDING');
    }
  }, []);

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

  const handleQuizComplete = (finalScore: number, wrongAnswers: any[]) => {
    // Save session to history
    const session: SessionHistory = {
      id: Date.now().toString(),
      quizType: selectedQuizType,
      score: finalScore,
      totalQuestions: appState.currentSession.length,
      timestamp: Date.now(),
      wrongAnswers: wrongAnswers,
      duration: Date.now() - (appState.currentSessionStart || Date.now())
    };
    
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
      currentSessionStart: null
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
        />
      )}
      
      {screen === 'SETTINGS' && (
        <Settings 
          settings={settings}
          onUpdateSettings={handleSettingsUpdate}
          onResetProgress={handleResetProgress}
          onBack={handleNavigateHome}
        />
      )}
      
      {screen === 'HISTORY' && (
        <History 
          sessionHistory={appState.sessionHistory}
          onBack={handleNavigateHome}
          onClearHistory={() => {
            setAppState(prev => ({
              ...prev,
              sessionHistory: []
            }));
            localStorage.removeItem('sessionHistory');
          }}
        />
      )}
    </>
  );
};

export default Index;

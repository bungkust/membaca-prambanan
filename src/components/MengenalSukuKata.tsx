import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Settings } from "lucide-react";
import { Settings as SettingsType } from "@/types/quiz";
import { speak, stopSpeech } from "@/utils/tts";
import { logger } from "@/utils/logger";

interface MengenalSukuKataProps {
  onBack: () => void;
  settings?: SettingsType;
}

const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
const vowels = ['a', 'i', 'u', 'e', 'o'];

const MengenalSukuKata = ({ onBack, settings }: MengenalSukuKataProps) => {
  const [selectedConsonant, setSelectedConsonant] = useState<string>('');
  const [selectedVowel, setSelectedVowel] = useState<string>('');
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);

  const colors = [
    'linear-gradient(45deg, #ff6b6b, #ee5a24)',
    'linear-gradient(45deg, #4ecdc4, #44a08d)',
    'linear-gradient(45deg, #45b7d1, #96c93d)',
    'linear-gradient(45deg, #f093fb, #f5576c)',
    'linear-gradient(45deg, #4facfe, #00f2fe)',
    'linear-gradient(45deg, #a8edea, #fed6e3)',
    'linear-gradient(45deg, #ff9a9e, #fecfef)',
    'linear-gradient(45deg, #667eea, #764ba2)',
    'linear-gradient(45deg, #f093fb, #f5576c)',
    'linear-gradient(45deg, #4facfe, #00f2fe)',
    'linear-gradient(45deg, #43e97b, #38f9d7)',
    'linear-gradient(45deg, #fa709a, #fee140)',
    'linear-gradient(45deg, #a8edea, #fed6e3)',
    'linear-gradient(45deg, #ffecd2, #fcb69f)',
    'linear-gradient(45deg, #ff8a80, #ea4c89)',
    'linear-gradient(45deg, #8fd3f4, #84fab0)',
    'linear-gradient(45deg, #d299c2, #fef9d7)',
    'linear-gradient(45deg, #89f7fe, #66a6ff)',
    'linear-gradient(45deg, #ff7eb3, #ff758c)',
    'linear-gradient(45deg, #74b9ff, #0984e3)',
    'linear-gradient(45deg, #fd79a8, #e84393)'
  ];

  const selectConsonant = (consonant: string) => {
    setSelectedConsonant(consonant);
    if (selectedVowel) {
      updateResult(consonant, selectedVowel);
    }
  };

  const selectVowel = (vowel: string) => {
    setSelectedVowel(vowel);
    if (selectedConsonant) {
      updateResult(selectedConsonant, vowel);
    }
  };

  const updateResult = (consonant: string, vowel: string) => {
    const syllable = consonant + vowel;

    if (ttsEnabled) {
      speakText(syllable);
    }
  };

  const speakText = async (text: string) => {
    try {
      await speak(text, settings?.selectedVoice);
    } catch (error) {
      // Silently handle TTS errors - user can try again
      logger.error('TTS error in MengenalSukuKata:', error);
    }
  };

  const resetGame = () => {
    setSelectedConsonant('');
    setSelectedVowel('');
  };

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      // Stop any ongoing speech when component unmounts
      stopSpeech().catch(() => {
        // Ignore errors during cleanup
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="lg" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">🎡 Mengenal Suku Kata</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Consonant Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">Pilih Huruf Konsonan</h3>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-4 border-blue-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-800 shadow-lg">
                  {selectedConsonant ? selectedConsonant.toUpperCase() : '?'}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-inner max-w-full sm:max-w-sm">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1.5 sm:gap-2">
                  {consonants.map((consonant, index) => (
                    <button
                      key={consonant}
                      className={`w-12 h-12 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-110 ${
                        selectedConsonant === consonant ? 'ring-4 ring-blue-300 scale-110' : ''
                      }`}
                      style={{
                        background: colors[index % colors.length],
                      }}
                      onClick={() => selectConsonant(consonant)}
                    >
                      {consonant.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vowel Section */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">Pilih Huruf Vokal</h3>
              <div className="flex gap-3">
                {vowels.map((vowel) => (
                  <button
                    key={vowel}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full font-bold text-white text-lg sm:text-xl transition-all duration-200 hover:scale-110 ${
                      selectedVowel === vowel ? 'ring-4 ring-green-300 scale-110' : ''
                    }`}
                    style={{
                      background: vowel === 'a' ? 'linear-gradient(45deg, #ff6b6b, #ee5a24)' :
                                 vowel === 'i' ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' :
                                 vowel === 'u' ? 'linear-gradient(45deg, #45b7d1, #96c93d)' :
                                 vowel === 'e' ? 'linear-gradient(45deg, #f093fb, #f5576c)' :
                                 'linear-gradient(45deg, #4facfe, #00f2fe)'
                    }}
                    onClick={() => selectVowel(vowel)}
                  >
                    {vowel.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="text-center mt-6 sm:mt-8">
            <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 min-h-[3rem] flex items-center justify-center">
              {selectedConsonant && selectedVowel ? (
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {(selectedConsonant + selectedVowel).toUpperCase()}
                </span>
              ) : (
                'Pilih huruf dan vokal!'
              )}
            </div>

            <Button
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg"
              onClick={() => selectedConsonant && selectedVowel && speakText(selectedConsonant + selectedVowel)}
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Dengarkan
            </Button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center text-gray-700">
            <Settings className="w-5 h-5 mr-2" />
            Pengaturan
          </h3>
          <div className="flex items-center justify-between">
            <span>Suara Otomatis (TTS)</span>
            <button
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                ttsEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => setTtsEnabled(!ttsEnabled)}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  ttsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MengenalSukuKata;

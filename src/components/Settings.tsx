import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsType } from "@/types/quiz";
import { ArrowLeft, Volume2 } from "lucide-react";
import { speak, getIndonesianVoices } from "@/utils/tts";
import { isNative } from "@/utils/platform";
import { APP_VERSION, APP_NAME, VERSION_DATE } from "@/version";
import { toast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

interface SettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: SettingsType) => void;
  onResetProgress: () => void;
  onBack: () => void;
}

const Settings = ({ settings, onUpdateSettings, onResetProgress, onBack }: SettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('auto');

  // Load available Indonesian voices (web only)
  useEffect(() => {
    if (!isNative()) {
      const voices = getIndonesianVoices();
      setAvailableVoices(voices);
      if (voices.length === 0) {
        // Fallback: try to load voices after a delay
        setTimeout(() => {
          const delayedVoices = getIndonesianVoices();
          setAvailableVoices(delayedVoices);
        }, 1000);
      }
    }
  }, []);

  // Initialize selectedVoice from settings
  useEffect(() => {
    if (settings.selectedVoice) {
      setSelectedVoice(settings.selectedVoice);
    }
  }, [settings.selectedVoice]);

  const handleTestVoice = async (voiceName: string) => {
    try {
      await speak('Halo, ini adalah tes suara untuk anak-anak belajar membaca', voiceName);
    } catch (error) {
      logger.error('Voice test failed:', error);
      toast({
        variant: 'destructive',
        title: 'Gagal Memutar Suara',
        description: 'Tidak dapat memutar suara tes. Pastikan audio diaktifkan dan coba lagi.',
      });
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    setLocalSettings({ ...localSettings, selectedVoice: voiceName });
    handleTestVoice(voiceName);
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setShowSaveSuccess(true);

    // Auto-hide success message after 2 seconds, then navigate back
    setTimeout(() => {
      setShowSaveSuccess(false);
      onBack();
    }, 2000);
  };

  const handleTestAudio = async () => {
    try {
      await speak('Halo, ini adalah tes audio');
    } catch (error) {
      logger.error('Audio test failed:', error);
      toast({
        variant: 'destructive',
        title: 'Gagal Memutar Audio',
        description: 'Tidak dapat memutar audio tes. Pastikan audio diaktifkan dan coba lagi.',
      });
    }
  };

  const handleReset = () => {
    onResetProgress();
    setShowResetConfirm(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" size="lg" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </Button>
        
        <div className="bg-card rounded-3xl shadow-playful p-8 mb-6">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Pengaturan
            </span>
          </h1>
          
          <div className="space-y-6">
            {/* Questions per session */}
            <div>
              <label className="text-lg font-bold mb-3 block">Jumlah soal per sesi:</label>
              <div className="grid grid-cols-4 gap-4">
                {[10, 20, 30, 50].map(num => (
                  <Button
                    key={num}
                    size="lg"
                    variant={localSettings.questionsPerSession === num ? 'default' : 'outline'}
                    className={localSettings.questionsPerSession === num 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-button' 
                      : 'shadow-button'}
                    onClick={() => setLocalSettings({ ...localSettings, questionsPerSession: num })}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Timer */}
            <div>
              <label className="text-lg font-bold mb-3 block">Waktu per soal:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[0, 20, 15, 10, 5].map(seconds => (
                  <Button
                    key={seconds}
                    size="lg"
                    variant={localSettings.timerSeconds === seconds ? 'default' : 'outline'}
                    className={localSettings.timerSeconds === seconds 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-button' 
                      : 'shadow-button'}
                    onClick={() => setLocalSettings({ ...localSettings, timerSeconds: seconds })}
                  >
                    {seconds === 0 ? 'Tanpa Timer' : `${seconds} detik`}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {localSettings.timerSeconds === 0 
                  ? 'Tidak ada batas waktu' 
                  : 'Jika waktu habis, soal dianggap salah'}
              </p>
            </div>
            
            {/* Remember questions */}
            <div className="bg-muted rounded-2xl p-6">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-bold text-lg mb-1">Ingat soal antar sesi</div>
                  <div className="text-sm text-muted-foreground">
                    Soal yang sudah dijawab tidak akan muncul lagi
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.rememberAcrossSessions}
                  onChange={(e) => setLocalSettings({ 
                    ...localSettings, 
                    rememberAcrossSessions: e.target.checked 
                  })}
                  className="w-6 h-6"
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* Audio Test */}
        <div className="bg-card rounded-3xl shadow-playful p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">🔊 Pengaturan Audio</h2>

          {/* Voice Selection - Web only */}
          {!isNative() && (
            <div className="mb-6">
              <label className="text-lg font-bold mb-3 block">Suara TTS:</label>
              <select
                value={selectedVoice}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-primary/20 bg-card text-lg font-semibold focus:border-primary focus:outline-none"
              >
                <option value="auto">Otomatis (Direkomendasikan)</option>
                {availableVoices.map((voice, index) => (
                  <option key={index} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
              <p className="text-sm text-muted-foreground mt-2">
                Pilih suara yang paling jelas untuk anak-anak
              </p>
            </div>
          )}
          
          {/* Native platform message */}
          {isNative() && (
            <div className="mb-6 p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground">
                Aplikasi menggunakan suara sistem untuk Text-to-Speech. Suara akan otomatis menggunakan bahasa Indonesia.
              </p>
            </div>
          )}

          <Button
            size="lg"
            variant="outline"
            className="w-full shadow-button btn-bounce"
            onClick={() => handleTestVoice(selectedVoice)}
          >
            <Volume2 className="w-5 h-5 mr-2" />
            🎵 Test Audio
          </Button>
        </div>

        {/* App Version Info */}
        <div className="bg-card rounded-3xl shadow-playful p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">📱 Informasi Aplikasi</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">{APP_NAME}</span>
                <span className="px-3 py-1 bg-primary/20 rounded-full text-sm font-bold text-primary">
                  v{APP_VERSION}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>📅 Tanggal Rilis:</span>
                  <span className="font-medium">{VERSION_DATE}</span>
                </div>
                <div className="mt-1 text-xs">
                  Setiap versi baru menambahkan fitur dan perbaikan
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="bg-card rounded-3xl shadow-playful p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Reset Progress</h2>
          <p className="text-muted-foreground mb-4">
            Hapus semua progress dan mulai dari awal
          </p>
          
          {!showResetConfirm ? (
            <Button
              size="lg"
              variant="destructive"
              className="w-full shadow-button btn-bounce"
              onClick={() => setShowResetConfirm(true)}
            >
              Reset Semua Progress
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-center font-bold text-destructive">
                Yakin ingin menghapus semua progress?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReset}
                >
                  Ya, Hapus
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <Button
          size="lg"
          className="w-full text-xl py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-button btn-bounce"
          onClick={handleSave}
        >
          💾 Simpan Pengaturan
        </Button>
      </div>

      {/* Success Popup */}
      {showSaveSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Berhasil Disimpan!</h2>
            <p className="text-muted-foreground mb-4">
              Pengaturan Anda telah berhasil disimpan dan akan diterapkan pada sesi kuis berikutnya.
            </p>
            <div className="text-sm text-muted-foreground">
              Kembali ke menu utama dalam 2 detik...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

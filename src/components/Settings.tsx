import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsType } from "@/types/quiz";
import { ArrowLeft, Volume2 } from "lucide-react";
import { speak } from "@/utils/tts";

interface SettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: SettingsType) => void;
  onResetProgress: () => void;
  onBack: () => void;
}

const Settings = ({ settings, onUpdateSettings, onResetProgress, onBack }: SettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onBack();
  };

  const handleTestAudio = () => {
    speak('Halo, ini adalah tes audio');
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
          <Button
            size="lg"
            variant="outline"
            className="w-full shadow-button btn-bounce"
            onClick={handleTestAudio}
          >
            <Volume2 className="w-5 h-5 mr-2" />
            🎵 Test Audio
          </Button>
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
    </div>
  );
};

export default Settings;

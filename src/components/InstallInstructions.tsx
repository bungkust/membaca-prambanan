import { Button } from "@/components/ui/button";
import { ArrowLeft, Smartphone, Monitor, Apple } from "lucide-react";

interface InstallInstructionsProps {
  onBack: () => void;
}

const InstallInstructions = ({ onBack }: InstallInstructionsProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="lg" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </Button>

        <div className="bg-card rounded-3xl shadow-playful p-4 sm:p-6 md:p-8 text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📱</div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Cara Install Aplikasi
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
            Ikuti langkah-langkah berikut untuk menginstall Kuis Belajar sebagai PWA
          </p>

          {/* Desktop Instructions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-blue-200">
            <div className="flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-blue-700">💻 Desktop</h2>
            </div>

            <div className="text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold">Chrome/Edge:</p>
                  <p className="text-sm text-muted-foreground">Klik ikon install di address bar</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold">Alternative:</p>
                  <p className="text-sm text-muted-foreground">Menu → Install "Kuis Belajar"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Android Instructions */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-green-200">
            <div className="flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-green-700">📱 Android</h2>
            </div>

            <div className="text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold">Chrome:</p>
                  <p className="text-sm text-muted-foreground">Menu (⋮) → "Install app"</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold">Firefox:</p>
                  <p className="text-sm text-muted-foreground">Menu (⋮) → "Install"</p>
                </div>
              </div>
            </div>
          </div>

          {/* iOS Instructions */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-pink-200">
            <div className="flex items-center justify-center mb-4">
              <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-pink-700">🍎 iOS (Safari)</h2>
            </div>

            <div className="text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold">Tap Share Button:</p>
                  <p className="text-sm text-muted-foreground">Ketuk tombol share (□) di Safari</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold">Add to Home Screen:</p>
                  <p className="text-sm text-muted-foreground">Pilih "Add to Home Screen"</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm">3</div>
                <div>
                  <p className="font-semibold">Confirm:</p>
                  <p className="text-sm text-muted-foreground">Tap "Add" untuk menginstall</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-4 sm:p-6 border-2 border-purple-200">
            <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-3">🎉 Setelah Install:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span>Bisa digunakan offline</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>Loading lebih cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                <span>Ikon di home screen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallInstructions;
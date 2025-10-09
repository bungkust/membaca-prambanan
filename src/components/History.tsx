import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SessionHistory } from "@/types/quiz";
import { ArrowLeft, Star, ChevronDown, ChevronUp, XCircle } from "lucide-react";

interface HistoryProps {
  sessionHistory: SessionHistory[];
  onBack: () => void;
  onClearHistory: () => void;
  onQuizSelection?: () => void;
}

const History = ({ sessionHistory, onBack, onClearHistory, onQuizSelection }: HistoryProps) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());

  const toggleSessionExpansion = (sessionId: string) => {
    setExpandedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const getQuizTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'suku_kata': '📚 Suku Kata',
      'awal_kata': '🔤 Awal Kata',
      'akhir_kata': '🎯 Akhir Kata',
      'tengah_suku_kata': '🎯 Tengah Suku Kata Kata',
      'lengkapi_suku_kata': '✏️ Lengkapi Suku Kata'
    };
    return labels[type] || type;
  };

  const filterSessions = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    let filtered = [...sessionHistory];

    if (filter === 'today') {
      filtered = filtered.filter(s => now - s.timestamp < oneDay);
    } else if (filter === 'week') {
      filtered = filtered.filter(s => now - s.timestamp < oneWeek);
    } else if (filter === 'month') {
      filtered = filtered.filter(s => now - s.timestamp < oneMonth);
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortBy === 'highest') {
      filtered.sort((a, b) => (b.score / b.totalQuestions) - (a.score / a.totalQuestions));
    } else if (sortBy === 'lowest') {
      filtered.sort((a, b) => (a.score / a.totalQuestions) - (b.score / b.totalQuestions));
    }

    return filtered;
  };

  const totalSessions = sessionHistory.length;
  const totalQuestions = sessionHistory.reduce((sum, s) => sum + s.totalQuestions, 0);
  const totalCorrect = sessionHistory.reduce((sum, s) => sum + s.score, 0);
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalTime = sessionHistory.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalMinutes = Math.floor(totalTime / 60000);

  const filteredSessions = filterSessions();

  // Debug: Log what we're displaying
  console.log('📋 HISTORY DEBUG - Displaying sessions:', filteredSessions.map(session => ({
    id: session.id,
    score: session.score,
    totalQuestions: session.totalQuestions,
    stars: session.stars,
    displayText: `${session.score}/${session.totalQuestions}`
  })));

  const handleClear = () => {
    onClearHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="lg" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </Button>
        
        <div className="bg-card rounded-3xl shadow-playful p-8 mb-6">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              📊 Riwayat Sesi
            </span>
          </h1>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 text-center">
              <div className="text-4xl font-bold">{totalSessions}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Sesi</div>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-success/10 rounded-2xl p-4 text-center">
              <div className="text-4xl font-bold">{totalQuestions}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Soal</div>
            </div>
            
            <div className="bg-gradient-to-br from-success/10 to-primary/10 rounded-2xl p-4 text-center">
              <div className="text-4xl font-bold">{averageScore}%</div>
              <div className="text-sm text-muted-foreground mt-1">Rata-rata</div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/10 to-warning/10 rounded-2xl p-4 text-center">
              <div className="text-4xl font-bold">{totalMinutes}m</div>
              <div className="text-sm text-muted-foreground mt-1">Total Waktu</div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-bold mb-2 block">Filter berdasarkan:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: 'all', label: 'Semua Sesi' },
                  { value: 'today', label: 'Hari Ini' },
                  { value: 'week', label: 'Minggu Ini' },
                  { value: 'month', label: 'Bulan Ini' }
                ].map(f => (
                  <Button
                    key={f.value}
                    size="sm"
                    variant={filter === f.value ? 'default' : 'outline'}
                    className={filter === f.value ? 'bg-primary' : ''}
                    onClick={() => setFilter(f.value as any)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold mb-2 block">Urutkan berdasarkan:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: 'newest', label: 'Terbaru' },
                  { value: 'oldest', label: 'Terlama' },
                  { value: 'highest', label: 'Skor Tertinggi' },
                  { value: 'lowest', label: 'Skor Terendah' }
                ].map(s => (
                  <Button
                    key={s.value}
                    size="sm"
                    variant={sortBy === s.value ? 'default' : 'outline'}
                    className={sortBy === s.value ? 'bg-accent' : ''}
                    onClick={() => setSortBy(s.value as any)}
                  >
                    {s.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-card rounded-3xl shadow-playful p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2">Belum Ada Riwayat</h2>
            <p className="text-muted-foreground mb-6">
              Mulai kuis pertama untuk melihat riwayat sesi
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-button btn-bounce"
              onClick={onQuizSelection || onBack}
            >
              🚀 Pilih Kuis
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {filteredSessions.map((session) => {
                const percentage = Math.round((session.score / session.totalQuestions) * 100);
                const date = new Date(session.timestamp);
                
                return (
                  <div key={session.id} className="bg-card rounded-2xl shadow-button p-6 slide-up">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold text-xl">
                        {getQuizTypeLabel(session.quizType)}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          {date.toLocaleDateString('id-ID')} {date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSessionExpansion(session.id)}
                          className="text-xs"
                        >
                          {expandedSessions.has(session.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          Detail
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex-1 bg-muted rounded-xl p-4">
                        <div className="text-3xl font-bold">
                          {session.score}/{session.totalQuestions}
                        </div>
                        <div className="text-sm text-muted-foreground">Skor</div>
                      </div>

                      <div className="flex-1 bg-muted rounded-xl p-4">
                        <div className="text-3xl font-bold">{percentage}%</div>
                        <div className="text-sm text-muted-foreground">Persentase</div>
                      </div>

                      <div className="flex-1 bg-muted rounded-xl p-4">
                        <div className="flex items-center justify-center gap-1 text-3xl font-bold">
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                          {session.stars || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Bintang</div>
                      </div>

                      <div className="flex-1 bg-muted rounded-xl p-4">
                        <div className="text-3xl font-bold">
                          {(() => {
                            const duration = session.duration || 0;
                            const minutes = Math.floor(duration / 60000);
                            const seconds = Math.floor((duration % 60000) / 1000);
                            
                            // Debug logging
                            console.log('⏱️ SESSION DURATION DEBUG:', {
                              sessionId: session.id,
                              rawDuration: duration,
                              minutes,
                              seconds,
                              isValid: duration > 0
                            });
                            
                            return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
                          })()}
                        </div>
                        <div className="text-sm text-muted-foreground">Waktu</div>
                      </div>
                    </div>

                    {/* Expandable Details Section */}
                    {expandedSessions.has(session.id) && (
                      <div className="mt-4 pt-4 border-t border-border">
                        {session.wrongAnswers.length > 0 ? (
                          <>
                            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <XCircle className="w-5 h-5 text-destructive" />
                              Soal yang Salah ({session.wrongAnswers.length})
                            </h4>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                              {session.wrongAnswers.map((wrongAnswer, index) => (
                                <div key={index} className="bg-card rounded-xl p-4">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="font-bold text-lg">
                                      {wrongAnswer.question.display}
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Jawaban kamu: <span className="text-destructive font-bold">{wrongAnswer.userAnswer}</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Jawaban benar: <span className="text-success font-bold">{wrongAnswer.question.answer}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <div className="text-4xl mb-2">🎉</div>
                            <h4 className="font-bold text-lg mb-2 text-success">
                              Sesi Sempurna!
                            </h4>
                            <p className="text-muted-foreground">
                              Tidak ada soal yang salah. Kerja bagus! 🌟
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {!showClearConfirm ? (
              <Button
                variant="destructive"
                size="lg"
                className="w-full shadow-button btn-bounce"
                onClick={() => setShowClearConfirm(true)}
              >
                Hapus Semua Riwayat
              </Button>
            ) : (
              <div className="bg-card rounded-2xl shadow-button p-6 text-center">
                <p className="font-bold text-destructive mb-4">
                  Yakin ingin menghapus semua riwayat?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleClear}
                  >
                    Ya, Hapus
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default History;

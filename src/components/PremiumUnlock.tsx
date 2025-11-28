import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Crown, Check, Lock, Sparkles, Loader2 } from 'lucide-react';
import { PREMIUM_PRICE_IDR, PREMIUM_FEATURES } from '@/types/premium';
import { isPremium } from '@/services/premium';
import { purchasePremium, restorePurchases as restorePurchasesService } from '@/services/purchase';
import { toast } from '@/hooks/use-toast';
import { isNative } from '@/utils/platform';
import { logger } from '@/utils/logger';

interface PremiumUnlockProps {
  open: boolean;
  onClose: () => void;
  onPurchaseSuccess?: () => void;
  trigger?: 'manual' | 'limit_reached' | 'feature_locked' | 'trial_exhausted';
}

const PremiumUnlock = ({ open, onClose, onPurchaseSuccess, trigger = 'manual' }: PremiumUnlockProps) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [premium, setPremium] = useState(isPremium());

  // Update premium status when dialog opens
  useEffect(() => {
    if (open) {
      setPremium(isPremium());
    }
  }, [open]);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      logger.log('Starting purchase flow...');
      const result = await purchasePremium();
      
      logger.log('Purchase result:', result);
      
      if (result.success) {
        setPremium(true);
        toast({
          title: '🎉 Premium Unlocked!',
          description: 'Terima kasih! Semua fitur premium sekarang tersedia.',
        });
        
        onPurchaseSuccess?.();
        onClose();
      } else {
        // Show user-friendly error message
        const errorMessage = result.error || 'Gagal melakukan pembelian. Silakan coba lagi.';
        logger.warn('Purchase failed:', errorMessage);
        toast({
          variant: 'destructive',
          title: 'Gagal',
          description: errorMessage,
        });
      }
    } catch (error) {
      logger.error('Purchase failed with exception:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: `Gagal melakukan pembelian: ${errorMessage}. Silakan coba lagi atau hubungi support.`,
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    try {
      const result = await restorePurchasesService();
      if (result.success) {
        setPremium(true);
        toast({
          title: '✅ Premium Restored',
          description: 'Premium status berhasil dipulihkan!',
        });
        onPurchaseSuccess?.();
        onClose();
      } else {
        toast({
          variant: 'destructive',
          title: 'Tidak Ditemukan',
          description: result.error || 'Tidak ada pembelian premium yang ditemukan.',
        });
      }
    } catch (error) {
      logger.error('Restore failed:', error);
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Gagal memulihkan pembelian. Silakan coba lagi.',
      });
    } finally {
      setIsRestoring(false);
    }
  };

  // Don't show if already premium
  if (premium) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto m-4 sm:m-0 rounded-2xl p-4 sm:p-6">
        <DialogHeader className="px-0">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center px-2">
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Upgrade ke Premium
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-base sm:text-lg font-semibold text-foreground px-2 mt-2">
            Hanya IDR {PREMIUM_PRICE_IDR.toLocaleString('id-ID')}
            <br />
            <span className="text-xs sm:text-sm text-muted-foreground font-normal">
              Sekali Bayar Selamanya
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 px-0">
          {/* Premium Features List */}
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-yellow-200">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-center">Fitur Premium:</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Unlimited questions per session (20, 30, 50+)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Advanced timer options (15s, 20s, custom)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Custom voice selection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Full history access (semua session visible)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Semua premium quiz types (unlimited)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Future updates included</span>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-muted rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              💡 Setara dengan 1x makan siang, untuk investasi pendidikan anak
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              💡 Sekali bayar, dapatkan akses selamanya
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              💡 100% uang kembali jika tidak puas (dalam 48 jam)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white shadow-button btn-bounce text-base sm:text-lg py-3 sm:py-4"
              onClick={handlePurchase}
              disabled={isPurchasing || isRestoring}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                  <span className="text-sm sm:text-base">Memproses...</span>
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">
                    Upgrade Sekarang - IDR {PREMIUM_PRICE_IDR.toLocaleString('id-ID')}
                  </span>
                </>
              )}
            </Button>

            {/* Restore Purchases - available for both native and web */}
            <Button
              variant="outline"
              size="lg"
              className="w-full shadow-button text-sm sm:text-base py-3 sm:py-4"
              onClick={handleRestore}
              disabled={isPurchasing || isRestoring}
            >
              {isRestoring ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                  <span className="text-sm sm:text-base">Memulihkan...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">
                  {isNative() ? 'Restore Purchases' : 'Pulihkan Premium'}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs sm:text-sm py-2 sm:py-3"
              onClick={onClose}
              disabled={isPurchasing || isRestoring}
            >
              Nanti Saja
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumUnlock;


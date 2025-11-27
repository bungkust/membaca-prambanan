import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService = ({ onBack }: TermsOfServiceProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="lg" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </Button>

        <div className="bg-card rounded-3xl shadow-playful p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Ketentuan Layanan
            </span>
          </h1>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-6 text-muted-foreground">
            <div className="text-center text-sm mb-8">
              <p>Terakhir diperbarui: 9 Januari 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Pendahuluan</h2>
              <p>
                Selamat datang di <strong>Kuis Belajar Membaca</strong>! Dengan mengunduh, menginstal, 
                atau menggunakan aplikasi ini, Anda menyetujui untuk terikat oleh ketentuan layanan ini. 
                Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan aplikasi ini.
              </p>
              <p className="mt-3">
                Aplikasi ini dirancang khusus untuk anak-anak berusia 3 tahun ke atas sebagai alat bantu 
                belajar membaca yang edukatif dan aman.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Penerimaan Ketentuan</h2>
              <p>
                Dengan menggunakan aplikasi ini, Anda mengakui bahwa:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Anda telah membaca dan memahami ketentuan layanan ini</li>
                <li>Anda setuju untuk mematuhi semua ketentuan yang tercantum</li>
                <li>Jika pengguna adalah anak di bawah 13 tahun, orang tua atau wali telah memberikan persetujuan</li>
                <li>Anda bertanggung jawab atas penggunaan aplikasi oleh anak di bawah pengawasan Anda</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Deskripsi Layanan</h2>
              <p>
                <strong>Kuis Belajar Membaca</strong> adalah aplikasi edukasi mobile yang menyediakan:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kuis interaktif untuk belajar membaca (suku kata, huruf awal/akhir, dll)</li>
                <li>Fitur Text-to-Speech (TTS) untuk membantu pelafalan</li>
                <li>Progress tracking dan riwayat belajar</li>
                <li>Pengaturan kustomisasi (jumlah soal, timer, dll)</li>
                <li>Pengalaman belajar yang menyenangkan dan aman untuk anak-anak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Penggunaan Aplikasi</h2>
              
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">4.1. Penggunaan yang Diizinkan</h3>
              <p>Anda diizinkan untuk:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mengunduh dan menggunakan aplikasi untuk tujuan edukasi pribadi</li>
                <li>Menggunakan aplikasi untuk membantu anak-anak belajar membaca</li>
                <li>Mengakses semua fitur yang tersedia dalam aplikasi</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">4.2. Penggunaan yang Dilarang</h3>
              <p>Anda TIDAK diizinkan untuk:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menggunakan aplikasi untuk tujuan komersial tanpa izin</li>
                <li>Menyalin, memodifikasi, atau mendistribusikan ulang aplikasi</li>
                <li>Mencoba untuk membongkar, reverse engineer, atau mengekstrak kode sumber aplikasi</li>
                <li>Menggunakan aplikasi dengan cara yang melanggar hukum atau merugikan pihak lain</li>
                <li>Mengganggu atau merusak fungsi aplikasi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Kepatuhan COPPA dan Perlindungan Anak</h2>
              <p>
                Aplikasi ini dirancang untuk mematuhi Children's Online Privacy Protection Act (COPPA) 
                dan peraturan perlindungan privasi anak-anak lainnya. Kami:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tidak mengumpulkan informasi pribadi dari anak-anak</li>
                <li>Menyediakan lingkungan yang aman dan sesuai untuk anak-anak</li>
                <li>Tidak menampilkan konten yang tidak pantas untuk anak-anak</li>
                <li>Tidak menggunakan iklan yang menargetkan perilaku (behavioral advertising)</li>
              </ul>
              <p className="mt-3">
                Orang tua atau wali bertanggung jawab untuk mengawasi penggunaan aplikasi oleh anak-anak.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Konten dan Hak Kekayaan Intelektual</h2>
              <p>
                Semua konten dalam aplikasi, termasuk tetapi tidak terbatas pada:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Teks, gambar, dan grafik</li>
                <li>Desain dan antarmuka pengguna</li>
                <li>Kode program dan logika aplikasi</li>
                <li>Soal-soal kuis dan konten edukatif</li>
              </ul>
              <p className="mt-3">
                Adalah hak milik <strong>Kuis Belajar Membaca</strong> dan dilindungi oleh undang-undang 
                hak cipta dan hak kekayaan intelektual. Anda tidak diperbolehkan untuk menyalin, 
                memodifikasi, atau mendistribusikan konten tersebut tanpa izin tertulis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Ketersediaan Layanan</h2>
              <p>
                Kami berusaha untuk menjaga aplikasi tetap tersedia dan berfungsi dengan baik. Namun, kami:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tidak menjamin bahwa aplikasi akan selalu tersedia tanpa gangguan</li>
                <li>Tidak bertanggung jawab atas gangguan teknis atau pemeliharaan yang diperlukan</li>
                <li>Dapat menghentikan atau mengubah layanan kapan saja dengan pemberitahuan sebelumnya</li>
                <li>Berhak untuk memperbarui atau mengubah aplikasi sesuai kebutuhan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Pembaruan Aplikasi</h2>
              <p>
                Kami dapat merilis pembaruan aplikasi dari waktu ke waktu yang mungkin termasuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fitur baru atau peningkatan fitur yang ada</li>
                <li>Perbaikan bug dan masalah teknis</li>
                <li>Peningkatan keamanan</li>
                <li>Konten edukatif baru</li>
              </ul>
              <p className="mt-3">
                Pembaruan dapat dilakukan melalui Google Play Store atau platform distribusi lainnya. 
                Kami menyarankan Anda untuk selalu menggunakan versi terbaru aplikasi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Batasan Tanggung Jawab</h2>
              <p>
                Aplikasi ini disediakan "apa adanya" tanpa jaminan apapun. Kami tidak bertanggung jawab atas:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kerugian langsung atau tidak langsung yang timbul dari penggunaan aplikasi</li>
                <li>Gangguan atau ketidaktersediaan aplikasi</li>
                <li>Kehilangan data atau informasi yang tersimpan dalam aplikasi</li>
                <li>Kegagalan aplikasi untuk memenuhi kebutuhan spesifik pengguna</li>
              </ul>
              <p className="mt-3">
                Aplikasi ini dirancang sebagai alat bantu belajar dan tidak menggantikan pengajaran 
                formal atau pengawasan orang tua dalam proses belajar anak.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Penghentian Layanan</h2>
              <p>
                Kami berhak untuk menghentikan atau menangguhkan akses Anda ke aplikasi, dengan atau tanpa 
                pemberitahuan sebelumnya, jika:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Anda melanggar ketentuan layanan ini</li>
                <li>Anda menggunakan aplikasi dengan cara yang tidak pantas atau melanggar hukum</li>
                <li>Diperlukan untuk keamanan atau kepatuhan hukum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Perubahan Ketentuan</h2>
              <p>
                Kami dapat memperbarui ketentuan layanan ini dari waktu ke waktu. Perubahan akan diberitahukan 
                melalui pembaruan aplikasi atau pemberitahuan dalam aplikasi. Tanggal "Terakhir diperbarui" 
                di bagian atas dokumen ini akan diperbarui untuk mencerminkan perubahan.
              </p>
              <p className="mt-3">
                Penggunaan berkelanjutan aplikasi setelah perubahan ketentuan berarti Anda menerima 
                ketentuan yang telah diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang ketentuan layanan ini, silakan hubungi kami melalui:
              </p>
              <div className="bg-muted rounded-xl p-4 mt-4">
                <p className="font-semibold">Email: [Email Anda]</p>
                <p className="font-semibold mt-2">Website: [Website Anda]</p>
              </div>
              <p className="mt-4 text-sm">
                <strong>Catatan</strong>: Silakan ganti [Email Anda] dan [Website Anda] dengan informasi kontak 
                yang sebenarnya sebelum rilis aplikasi ke Play Store.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Hukum yang Berlaku</h2>
              <p>
                Ketentuan layanan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku. 
                Setiap sengketa yang timbul dari atau terkait dengan ketentuan ini akan diselesaikan 
                melalui jalur hukum yang sesuai.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Penerimaan</h2>
              <p>
                Dengan menggunakan aplikasi ini, Anda menyatakan bahwa Anda telah membaca, memahami, 
                dan setuju untuk terikat oleh semua ketentuan layanan ini. Jika Anda tidak setuju 
                dengan ketentuan ini, mohon untuk tidak menggunakan aplikasi ini.
              </p>
            </section>

            <div className="border-t pt-6 mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Ketentuan Layanan ini berlaku untuk <strong>Kuis Belajar Membaca</strong> versi {new Date().getFullYear()}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" onClick={onBack} className="bg-gradient-to-r from-primary to-accent">
              Kembali ke Pengaturan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;


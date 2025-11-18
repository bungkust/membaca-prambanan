import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
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
              Kebijakan Privasi
            </span>
          </h1>

          <div className="prose prose-sm sm:prose-base max-w-none space-y-6 text-muted-foreground">
            <div className="text-center text-sm mb-8">
              <p>Terakhir diperbarui: 9 Januari 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Pendahuluan</h2>
              <p>
                Selamat datang di <strong>Kuis Belajar Membaca</strong>! Kami menghargai privasi Anda dan berkomitmen 
                untuk melindungi informasi pribadi anak-anak yang menggunakan aplikasi kami. Kebijakan privasi ini 
                menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi dalam aplikasi ini.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Informasi yang Kami Kumpulkan</h2>
              <p>
                Kami berkomitmen untuk melindungi privasi anak-anak. Aplikasi ini dirancang untuk mematuhi 
                Children's Online Privacy Protection Act (COPPA) dan peraturan privasi anak-anak lainnya.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">2.1. Data Audio</h3>
              <p>
                Aplikasi ini menggunakan fitur Text-to-Speech (TTS) untuk membantu anak-anak belajar membaca. 
                Fitur ini memerlukan akses audio perangkat Anda <strong>hanya untuk output suara</strong>. 
                Kami <strong>TIDAK merekam, menyimpan, atau mengunggah audio</strong> ke server manapun.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">2.2. Data Penyimpanan Lokal</h3>
              <p>
                Aplikasi menyimpan data berikut secara lokal di perangkat Anda menggunakan localStorage browser:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Progress belajar (jawaban yang sudah dikerjakan)</li>
                <li>Riwayat sesi kuis (skor, waktu, bintang)</li>
                <li>Pengaturan aplikasi (jumlah soal per sesi, timer, dll)</li>
              </ul>
              <p className="mt-3">
                Data ini <strong>TIDAK dikirim ke server</strong> dan hanya tersimpan di perangkat Anda.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">2.3. Data yang TIDAK Kami Kumpulkan</h3>
              <p>Kami <strong>TIDAK mengumpulkan</strong>:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nama, alamat, atau informasi identitas pribadi</li>
                <li>Informasi kontak (email, nomor telepon)</li>
                <li>Foto atau video</li>
                <li>Lokasi GPS</li>
                <li>Data audio yang direkam</li>
                <li>Data dari aplikasi lain</li>
                <li>Cookies pelacakan atau identifikasi pengguna</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Izin yang Digunakan</h2>
              <p>Aplikasi ini memerlukan izin berikut untuk berfungsi:</p>
              
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">3.1. INTERNET</h3>
              <p>
                Digunakan untuk memuat konten aplikasi (HTML, CSS, JavaScript) dari server hosting. 
                Tidak digunakan untuk mengirim data pribadi ke server.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">3.2. ACCESS_NETWORK_STATE</h3>
              <p>
                Digunakan untuk memeriksa koneksi internet untuk memberikan pengalaman pengguna yang lebih baik. 
                Tidak mengumpulkan informasi jaringan pribadi.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-4 mb-3">3.3. Audio (Output Only)</h3>
              <p>
                Digunakan untuk memutar suara Text-to-Speech yang membantu anak-anak belajar membaca. 
                Aplikasi ini <strong>TIDAK merekam audio</strong> dan tidak memerlukan izin RECORD_AUDIO.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Bagaimana Kami Menggunakan Data</h2>
              <p>
                Data yang tersimpan secara lokal digunakan semata-mata untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menyimpan progress belajar anak</li>
                <li>Menampilkan riwayat sesi kuis sebelumnya</li>
                <li>Mengingat pengaturan aplikasi yang dipilih pengguna</li>
                <li>Menyediakan pengalaman belajar yang lebih personal</li>
              </ul>
              <p className="mt-3">
                Kami <strong>TIDAK membagikan, menjual, atau memindahkan data</strong> ke pihak ketiga manapun.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Kepatuhan COPPA</h2>
              <p>
                Aplikasi ini dirancang khusus untuk anak-anak berusia 3 tahun ke atas dan mematuhi 
                Children's Online Privacy Protection Act (COPPA). Kami:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tidak mengumpulkan informasi pribadi yang dapat diidentifikasi dari anak-anak</li>
                <li>Tidak menggunakan iklan yang menargetkan perilaku (behavioral advertising)</li>
                <li>Tidak meminta informasi kontak atau identitas</li>
                <li>Hanya menyimpan data yang diperlukan untuk fungsionalitas aplikasi</li>
                <li>Menyimpan data hanya di perangkat pengguna, bukan di server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Keamanan Data</h2>
              <p>
                Kami menerapkan langkah-langkah keamanan berikut:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Semua komunikasi menggunakan HTTPS (terenkripsi)</li>
                <li>Data disimpan secara lokal di perangkat, tidak dikirim ke server</li>
                <li>Tidak ada server database yang menyimpan data pengguna</li>
                <li>Aplikasi tidak memerlukan login atau akun pengguna</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Hak Pengguna</h2>
              <p>
                Sebagai pengguna aplikasi ini, Anda memiliki hak untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Menghapus Data</strong>: Anda dapat menghapus semua data dengan menggunakan fitur "Reset Progress" di menu Pengaturan</li>
                <li><strong>Mencabut Izin</strong>: Anda dapat mencabut izin aplikasi melalui pengaturan perangkat Android/iOS</li>
                <li><strong>Menghapus Aplikasi</strong>: Menghapus aplikasi akan menghapus semua data lokal yang tersimpan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Pembaruan Kebijakan Privasi</h2>
              <p>
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Tanggal "Terakhir diperbarui" 
                di bagian atas dokumen ini akan diperbarui untuk mencerminkan perubahan. Kami menyarankan Anda 
                untuk meninjau kebijakan ini secara berkala.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini atau praktik 
                privasi aplikasi kami, silakan hubungi kami melalui:
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
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Persetujuan</h2>
              <p>
                Dengan menggunakan aplikasi ini, Anda menyetujui kebijakan privasi ini. Jika Anda tidak setuju 
                dengan kebijakan ini, mohon untuk tidak menggunakan aplikasi ini.
              </p>
            </section>

            <div className="border-t pt-6 mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Kebijakan Privasi ini berlaku untuk <strong>Kuis Belajar Membaca</strong> versi {new Date().getFullYear()}
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

export default PrivacyPolicy;


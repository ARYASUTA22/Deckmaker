DECK MAKER
Dokumentasi dan Panduan Instalasi

DESKRIPSI
Aplikasi web untuk membuat, menyimpan, dan melihat strategi deck Clash Royale. Aplikasi ini dibangun menggunakan Next.js (App Router), TypeScript, Prisma ORM, dan database SQLite.

TEKNOLOGI
- Framework: Next.js 14/15
- Bahasa: TypeScript
- Database: SQLite
- ORM: Prisma
- CSS: Bootstrap 5
- API: Clash Royale Official API

PRASYARAT
Pastikan perangkat Anda telah terinstal:
1. Node.js (Versi 18 atau lebih baru)
2. Git

CARA INSTALASI

1. Clone Repository
   Buka terminal atau command prompt, lalu jalankan perintah berikut:
   git clone https://github.com/username-anda/nama-repo.git
   cd nama-repo

2. Instalasi Dependencies
   Jalankan perintah berikut untuk mengunduh pustaka yang dibutuhkan:
   npm install

3. Konfigurasi Environment Variable (.env)
   Aplikasi ini memerlukan konfigurasi database dan API Token.
   - Buat file baru bernama ".env" di direktori utama proyek (root folder).
   - Salin dan tempel konfigurasi berikut ke dalam file tersebut:

   DATABASE_URL="file:./dev.db"
   CLASH_TOKEN="masukkan_token_api_anda_disini"

   PENTING TENTANG API TOKEN:
   - Token dapat diperoleh dengan mendaftar di: https://developer.clashroyale.com/
   - Saat membuat token (Create New Key), Anda wajib memasukkan IP Address publik koneksi internet Anda.
   - Jika IP Address Anda berubah, Anda harus memperbarui konfigurasi di website developer tersebut agar data kartu dapat dimuat.

4. Setup Database
   Jalankan perintah berikut untuk membuat file database SQLite dan menerapkan skema tabel:
   npx prisma migrate dev --name init

   Selanjutnya, jalankan perintah ini untuk sinkronisasi klien Prisma:
   npx prisma generate

5. Menjalankan Aplikasi
   Untuk memulai server dalam mode pengembangan:
   npm run dev

   Buka browser dan akses alamat: http://localhost:3000

PEMECAHAN MASALAH UMUM (TROUBLESHOOTING)

1. Error: "SQLITE_BUSY: database is locked"
   Jika Anda mengalami error ini saat menyimpan deck, itu berarti file database sedang dibuka oleh aplikasi lain. SQLite hanya mengizinkan satu proses menulis dalam satu waktu.
   Solusi:
   - Tutup aplikasi pembuka database (seperti DB Browser for SQLite, DBeaver, atau ekstensi VS Code).
   - Pastikan tidak ada terminal lain yang sedang menjalankan "npx prisma studio".
   - Restart server development (Ctrl + C, lalu npm run dev lagi).

2. Kartu Tidak Muncul (Loading Terus menerus)
   Masalah ini biasanya disebabkan oleh Token API yang tidak valid atau IP Address yang diblokir.
   Solusi:
   - Cek kembali file .env Anda.
   - Pastikan IP Address publik Anda saat ini sudah didaftarkan di portal developer Clash Royale.

STRUKTUR PROYEK
- /app          : Halaman dan routing aplikasi (Next.js App Router)
- /app/api      : Backend API routes (Auth, Clash API, Database Deck)
- /prisma       : Skema database dan file database SQLite (dev.db)
- /components   : Komponen UI (jika ada)
- /lib          : Konfigurasi inisialisasi Prisma Client
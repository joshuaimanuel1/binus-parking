# Panduan Instalasi dan Setup Sistem Parkir Otomatis BINUS

## Persyaratan Sistem

- Node.js (v14 atau lebih baru)
- MySQL Server (XAMPP atau sejenisnya)
- Git
- Browser modern untuk menjalankan frontend (Chrome, Firefox, Edge, dll)

---

## Setup Backend

1. **Clone repository proyek:**

```bash
git clone https://github.com/username/binus-parking-otomatis.git
cd binus-parking-otomatis/backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Konfigurasi database:**

- Buat database MySQL baru, misalnya bernama `binus_parking`.
- Import skema database jika tersedia, atau buat tabel manual sesuai struktur:

  - `users`
  - `parking_slots`
  - `parking_records`

- Atur koneksi database di file konfigurasi (`.env` atau `config.js`), contoh isi `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=binus_parking
PORT=5000
```

4. **Jalankan backend server:**

```bash
npm start
```

Server backend akan berjalan di `http://localhost:5000`.

---

## Setup Frontend

1. Masuk ke direktori frontend:

```bash
cd ../frontend
```

2. Install dependencies frontend:

```bash
npm install
```

3. Jalankan frontend:

```bash
npm start
```

Frontend akan berjalan di `http://localhost:3000`.

---

## Penggunaan Sistem

- Buka frontend di browser pada `http://localhost:3000`.
- Gunakan fitur scan RFID untuk login dan mendapatkan slot parkir.
- Pantau status slot parkir dan riwayat parkir secara real-time.
- Gunakan akses manual jika perangkat RFID tidak tersedia.

---

## Troubleshooting

- Pastikan MySQL server sudah berjalan dan kredensial sudah benar.
- Pastikan port 5000 (backend) dan 3000 (frontend) tidak digunakan aplikasi lain.
- Cek terminal atau console log untuk mengetahui error yang muncul.

---

## Pengembangan Lanjutan

- Menambahkan fitur autentikasi dengan JWT.
- Integrasi sistem dengan hardware RFID dan kamera secara nyata.
- Dashboard admin untuk pengelolaan pengguna dan slot parkir.

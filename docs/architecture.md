# Arsitektur Sistem Sistem Parkir Otomatis BINUS

## 1. Gambaran Umum

Sistem Parkir Otomatis BINUS dirancang untuk mengelola akses dan monitoring parkir secara otomatis menggunakan teknologi RFID, kamera pemantau, serta backend berbasis Express.js dan frontend React.js.

## 2. Komponen Sistem

### a. Frontend (React.js)
- Menyediakan antarmuka pengguna untuk melakukan pemindaian RFID, akses manual, dan melihat status slot parkir.
- Menampilkan daftar slot parkir, status slot, dan pemantauan kamera secara real-time.
- Mengkonsumsi API backend untuk mengambil dan mengirim data.

### b. Backend (Express.js + Node.js)
- Menyediakan API RESTful untuk pengelolaan data parkir, slot, dan akses manual.
- Berinteraksi dengan database untuk penyimpanan data pengguna, slot parkir, dan riwayat akses.
- Memproses logika bisnis seperti verifikasi RFID dan update status slot parkir.

### c. Database (MySQL)
- Menyimpan data utama: users, parking_slots, parking_records.
- Mendukung operasi CRUD untuk slot parkir dan akses pengguna.

### d. Kamera & Deteksi Kendaraan
- Kamera yang terpasang pada slot parkir menangkap video secara real-time.
- Model Machine Learning (TensorFlow.js dengan COCO-SSD) mendeteksi kendaraan di slot parkir.
- Backend menerima update status slot berdasarkan deteksi kendaraan dari frontend.

## 3. Alur Kerja Sistem

1. Pengguna menempelkan kartu RFID di frontend.
2. Frontend mengirimkan request ke backend untuk verifikasi dan mendapatkan slot parkir.
3. Backend memvalidasi RFID dan mengembalikan slot yang tersedia atau yang sudah dipakai.
4. Kamera merekam kondisi parkir dan model mendeteksi apakah slot terisi.
5. Status slot diperbarui secara otomatis ke backend.
6. Pengguna juga dapat melakukan akses manual melalui form pada frontend.
7. Semua aktivitas dicatat dalam log dan histori parkir.

## 4. Diagram Arsitektur Sistem

- Frontend React.js berkomunikasi via HTTP API dengan Backend Express.js.
- Backend berinteraksi dengan Database MySQL.
- Frontend juga mengakses kamera lokal dan menjalankan model deteksi kendaraan.
- Status slot parkir terupdate secara real-time di backend dan frontend.

---
---
+--------------------+            +-----------------+
|    Frontend        | <--HTTP--> |   Backend       |
| (React.js)         |            | (Express.js)    |
|                    |            |                 |
| - Scan RFID        |            | - API Handling  |
| - Manual Input     |            | - Logic & DB    |
| - Camera + ML      |            |                 |
+--------------------+            +-----------------+
         |                                  |
         |                                  |
         v                                  v
    +------------+                   +------------+
    |  Kamera &  |                   |  Database  |
    | TensorFlow |                   |   MySQL    |
    +------------+                   +------------+

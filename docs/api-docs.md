## `api-docs.md`

Dokumentasi API backend (Express.js)

````markdown
# Dokumentasi API Backend Sistem Parkir Otomatis BINUS

Base URL: `http://localhost:5000/api`

---

## Endpoints Utama

### 1. Autentikasi dan Pengguna

- **POST /users/login**  
  Login pengguna dengan RFID.  
  **Request Body:**
  ```json
  {
    "rfid": "string"
  }
  ```
````

**Response:**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Nama User",
    "rfid": "rfid123"
  }
}
```

- **GET /users**
  Mendapatkan daftar semua pengguna.

---

### 2. Slot Parkir

- **GET /parking_slots**
  Mendapatkan daftar slot parkir beserta statusnya (tersedia/terisi).

- **POST /parking_slots**
  Menambahkan slot parkir baru.
  **Request Body:**

  ```json
  {
    "slot_number": "A1",
    "status": "available"
  }
  ```

- **PUT /parking_slots/\:id**
  Memperbarui status slot parkir.
  **Request Body:**

  ```json
  {
    "status": "occupied"
  }
  ```

---

### 3. Riwayat Parkir

- **GET /parking_records**
  Mendapatkan riwayat parkir semua pengguna.

- **POST /parking_records**
  Menambahkan riwayat parkir baru.
  **Request Body:**

  ```json
  {
    "user_id": 1,
    "slot_id": 5,
    "time_in": "2025-05-29T08:00:00Z",
    "time_out": null
  }
  ```

---

## Format Respon Umum

```json
{
  "success": true,
  "data": {}
}
```

## Catatan

- Semua endpoint menerima dan mengirim data dalam format JSON.
- Autentikasi sederhana berbasis RFID, tanpa token (dapat dikembangkan lebih lanjut).

````

---

## 3. `setupguide.md`
Panduan instalasi dan setup proyek

```markdown
# Panduan Instalasi dan Setup Sistem Parkir Otomatis BINUS

## Persyaratan Sistem

- Node.js (v14 atau lebih baru)
- MySQL Server
- Git
- Browser modern untuk frontend

---

## Setup Backend

1. Clone repository proyek:

```bash
git clone https://github.com/username/binus-parking-otomatis.git
cd binus-parking-otomatis/backend
````

2. Install dependencies:

```bash
npm install
```

3. Konfigurasi database

- Buat database MySQL, misalnya `binus_parking`
- Import skema database (jika ada file `.sql`) atau buat tabel sesuai struktur:

  - `users`
  - `parking_slots`
  - `parking_records`

4. Atur konfigurasi database di file `.env` atau di `config.js` (sesuaikan username, password, host):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=binus_parking
PORT=5000
```

5. Jalankan backend server:

```bash
npm start
```

Backend akan berjalan di `http://localhost:5000`

---

## Setup Frontend

1. Masuk ke folder frontend:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan frontend:

```bash
npm start
```

Frontend akan berjalan di `http://localhost:3000`

---

## Cara Menggunakan Sistem

- Akses frontend di browser.
- Gunakan fitur scan RFID untuk login dan mendapatkan slot parkir.
- Pantau status slot parkir secara real-time.
- Gunakan akses manual jika diperlukan.
- Pastikan backend dan database berjalan dengan baik.

---

## Troubleshooting

- Pastikan MySQL berjalan dan kredensial sudah benar.
- Pastikan port backend (default 5000) tidak digunakan aplikasi lain.
- Cek konsol untuk error pada backend dan frontend.

---

## Pengembangan Selanjutnya

- Implementasi autentikasi lebih aman dengan JWT.
- Penambahan fitur dashboard admin.
- Integrasi dengan sistem parkir fisik dan hardware RFID.

```

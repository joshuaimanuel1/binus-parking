Berikut ini adalah isi lengkap untuk dua file `README.md` — satu untuk folder `backend/` dan satu untuk `frontend/`. Kamu tinggal **copy-paste** ke masing-masing file tersebut:

---

### ✅ `backend/README.md`

```markdown
# 🔙 Backend - Sistem Parkir Otomatis BINUS

Ini adalah layanan backend dari proyek **Sistem Parkir Otomatis BINUS**. Backend dibangun menggunakan **Node.js** dan **Express.js**, dan terhubung ke database **MySQL** (XAMPP/phpMyAdmin).

## 📦 Dependencies

- express
- cors
- body-parser
- mysql

## 📁 Struktur Direktori
```

backend/
├── server.js
├── routes/ (jika ada)
├── db.js (opsional)
└── README.md

````

## 🚀 Cara Menjalankan

1. Pastikan **MySQL aktif** melalui XAMPP.
2. Import struktur database dari `../database/parking_db.sql` ke phpMyAdmin.
3. Jalankan server:

```bash
npm install
node server.js
````

Akses di `http://localhost:3001`

## 🔌 API Endpoint

### 🔐 Akses RFID

```http
POST /api/access-rfid
Body: { rfid: "123456" }
```

### ✍️ Akses Manual

```http
POST /api/manual-access
Body: { rfid, plat_nomor, slot_id }
```

### 📋 Daftar Slot Parkir

```http
GET /api/slots
```

### 📤 Update Status Slot

```http
POST /api/update-slot
Body: { slot_id, is_occupied }
```

## ⚙️ Konfigurasi Database

Pastikan `server.js` memiliki konfigurasi ini:

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "binus_parking",
});
```

## 🧪 Testing

Gunakan Postman untuk menguji endpoint seperti:

- POST `/api/access-rfid`
- GET `/api/slots`

---

## 📌 Catatan

- Pastikan backend dapat menerima request dari frontend (aktifkan CORS).
- Kamera dan deteksi kendaraan dilakukan dari frontend (TensorFlow\.js).

````

---

### ✅ `frontend/README.md`

```markdown
# 🖥️ Frontend - Sistem Parkir Otomatis BINUS

Ini adalah antarmuka pengguna dari proyek **Sistem Parkir Otomatis BINUS**, dibangun menggunakan **React.js**. Terhubung dengan backend Express dan database MySQL.

## 📦 Dependencies

- react
- axios
- @tensorflow/tfjs
- @tensorflow-models/coco-ssd
- tailwindcss (opsional, untuk styling)

## 📁 Struktur Direktori

````

frontend/
├── public/
│ └── index.html
├── src/
│ ├── App.js
│ ├── App.css
│ └── components/ (jika dipisah)
└── README.md

````

## 🚀 Cara Menjalankan

```bash
npm install
npm start
````

Frontend akan berjalan di: [http://localhost:3000](http://localhost:3000)

## ⚙️ Fitur UI

- 🚪 Akses RFID & Form Manual
- 📋 Daftar Slot Parkir (terisi/kosong)
- 🔎 Pencarian slot
- 📷 Deteksi kendaraan via webcam (mobil, truk, bus)
- 🧾 Log Aktivitas

## 🧠 Deteksi Kendaraan

Menggunakan **TensorFlow\.js + COCO-SSD** untuk mendeteksi objek `car`, `truck`, dan `bus`.

Contoh:

```js
const model = await cocoSsd.load();
const predictions = await model.detect(videoRef.current);
```

## 💡 Tips UI/UX

- Tambahkan notifikasi saat akses berhasil/gagal
- Tambah indikator status kamera
- Buat layout responsif (3 kolom: Akses | Slot | Kamera)

---

## 🙋 Developer

Frontend dikembangkan oleh Joshua Imanuel (Kris) sebagai bagian dari proyek sistem parkir otomatis di Universitas BINUS.

```

---

Kalau kamu mau, saya bisa bantu juga membuat satu **README.md utama** untuk root folder proyek (`/binus-parking-otomatis`) yang merangkum isi kedua folder tersebut. Apakah kamu ingin saya buatkan juga?
```

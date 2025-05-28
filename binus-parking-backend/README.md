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
├── routes
├── db.js
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

```

```

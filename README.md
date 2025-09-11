# 🚗 Sistem Parkir Otomatis BINUS

Proyek ini merupakan sistem parkir otomatis berbasis web yang terintegrasi dengan deteksi kendaraan dan RFID untuk universitas BINUS. Sistem ini dapat memindai kartu RFID, mengalokasikan slot parkir, serta memantau slot secara langsung melalui kamera. 

## 🧩 Fitur Utama

- 🚪 Akses otomatis dengan kartu RFID
- ✍️ Akses manual jika RFID gagal
- 📷 Pemantauan real-time dengan kamera (object detection menggunakan TensorFlow)
- 📊 Log aktivitas parkir
- 🔎 Pencarian dan status slot parkir 

---

## 🖥️ Teknologi yang Digunakan

### Frontend

- React.js
- CSS
- Axios

### Backend

- Node.js + Express
- MySQL
- TensorFlow.js (model COCO-SSD untuk deteksi kendaraan)

### Database

- MySQL (menggunakan XAMPP / phpMyAdmin)

---

## 🏁 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/joshuaimanuel1/binus-parking-otomatis.git
cd binus-parking-otomatis
```

### ✅ `frontend/README.md`

```markdown
# 🖥️ Frontend - Sistem Parkir Otomatis BINUS

Ini adalah antarmuka pengguna dari proyek **Sistem Parkir Otomatis BINUS**, dibangun menggunakan **React.js**. Terhubung dengan backend Express.js dan database MySQL.

## 📦 Dependencies

- react
- axios
- @tensorflow/tfjs
- @tensorflow-models/coco-ssd
- tailwindcss (jika digunakan)

## 📁 Struktur Direktori
```

frontend/
├── public/
│ └── index.html
├── src/
│ ├── App.js
│ ├── App.css
│ └── components/ (jika menggunakan komponen terpisah)
└── README.md

````

## 🚀 Cara Menjalankan

1. Pastikan backend sudah aktif di `http://localhost:3001`.
2. Jalankan frontend:

```bash
npm install
npm start
````

Frontend akan berjalan di: [http://localhost:3000](http://localhost:3000)

## ⚙️ Fitur Antarmuka

- 📇 **Akses RFID & Form Manual**
  Pengguna dapat mengakses dengan menempelkan kartu RFID atau memasukkan data manual.

- 📋 **Daftar Slot Parkir**
  Menampilkan seluruh slot parkir beserta statusnya (tersedia/terisi), termasuk fitur pencarian.

- 📷 **Pemantauan Kamera & Deteksi Kendaraan**
  Menggunakan webcam untuk mendeteksi kendaraan (mobil, truk, bus) secara real-time.

- 🧾 **Log Aktivitas**
  Menampilkan log riwayat akses parkir dan hasil deteksi kamera.

## 🧠 Deteksi Kendaraan (COCO-SSD)

Frontend menggunakan TensorFlow\.js dan model COCO-SSD untuk mendeteksi kendaraan.

Contoh kode deteksi:

```js
const model = await cocoSsd.load();
const predictions = await model.detect(videoRef.current);
```

Kendaraan yang dikenali:

- `car`
- `truck`
- `bus`

## 🎨 Saran UI/UX

- Tiga kolom horizontal:
  `Akses RFID & Manual` | `Daftar Slot` | `Kamera + Log`

- Gunakan notifikasi (misal: akses berhasil/gagal)

- Tambahkan animasi/indikator loading saat mendeteksi kendaraan

---

## 🙋 Developer

Frontend ini dikembangkan oleh **Joshua Imanuel sebagai bagian dari proyek **Sistem Parkir Otomatis\*\* untuk Universitas BINUS.

```

---

Silakan letakkan file ini di dalam folder `frontend/`. Bila kamu juga ingin `README.md` utama untuk folder root proyek (`binus-parking-otomatis/`), beri tahu saja, dan saya bantu buatkan.
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

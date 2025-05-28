const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Coba koneksi ke database
const db = require("./db"); // Import db.js

app.use(cors());
app.use(express.json());

// ✅ Import router yang berisi semua endpoint /api
const parkingRoutes = require("./routes/parking");
app.use("/api", parkingRoutes); // Semua endpoint diakses melalui prefix /api

// ✅ Cek apakah server berjalan dengan baik
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

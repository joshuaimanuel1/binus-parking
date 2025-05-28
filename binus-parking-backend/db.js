const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "binus_parking",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Koneksi database gagal:", err.message); // Tambahkan log error yang lebih jelas
    return;
  }
  console.log("✅ Terhubung ke database MySQL");
});

module.exports = db;

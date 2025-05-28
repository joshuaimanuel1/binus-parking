const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Koneksi database lokal
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "binus_parking",
});

// (1) Alokasikan slot terdekat dan menyimpan RFID saat alokasi
router.post("/parking", (req, res) => {
  const { rfid } = req.body; // RFID dari frontend

  db.query(
    "SELECT * FROM parking_slots WHERE is_occupied = 0 LIMIT 1",
    (err, results) => {
      if (err) {
        console.error("❌ Error mengambil slot:", err);
        return res.status(500).json({ message: "Error server" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Semua slot penuh" });
      }

      const slot = results[0];

      // Update status slot menjadi terisi dan menyimpan RFID
      db.query(
        "UPDATE parking_slots SET is_occupied = 1, rfid = ? WHERE id = ?",
        [rfid, slot.id],
        (updateErr) => {
          if (updateErr) {
            console.error("❌ Gagal update slot:", updateErr);
            return res.status(500).json({ message: "Error server" });
          }

          db.query(
            "INSERT INTO parking_records (user_id, slot_id, time_in) VALUES (?, ?, NOW())",
            [rfid, slot.id],
            (logErr) => {
              if (logErr) {
                console.error("❌ Gagal simpan log:", logErr);
                return res.status(500).json({ message: "Gagal simpan log" });
              }

              res.json({ rfid, slot: slot.slot_code });
            }
          );
        }
      );
    }
  );
});

// (2) Ambil semua slot parkir
router.get("/all-slots", (req, res) => {
  db.query("SELECT * FROM parking_slots", (err, results) => {
    if (err) {
      console.error("❌ Error ambil semua slot:", err);
      return res.status(500).json({ message: "Error server" });
    }
    res.json(results);
  });
});

// (3) Ambil slot yang masih kosong
router.get("/available-slots", (req, res) => {
  db.query(
    "SELECT * FROM parking_slots WHERE is_occupied = 0",
    (err, results) => {
      if (err) {
        console.error("❌ Error ambil slot kosong:", err);
        return res.status(500).json({ message: "Error server" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Semua slot penuh" });
      }

      res.json(results);
    }
  );
});

// (4) Update status slot (kosong / terisi) dan menyimpan RFID jika ada
router.post("/update-slot", (req, res) => {
  const { id, rfid, isOccupied } = req.body; // Menambahkan RFID

  // Pastikan kita mengupdate kolom is_occupied dan RFID
  const query =
    "UPDATE parking_slots SET is_occupied = ?, rfid = ? WHERE id = ?";

  db.query(query, [isOccupied, rfid, id], (err, result) => {
    if (err) {
      console.error("❌ Gagal update status:", err);
      return res.status(500).json({ message: "Gagal update slot" });
    }

    res.json({ message: "Status slot dan RFID berhasil diperbarui" });
  });
});

// (5) Kendaraan keluar parkir (kosongkan slot dan update time_out)
router.post("/exit-parking", (req, res) => {
  const { rfid } = req.body;

  const sqlFind = `
    SELECT pr.id, pr.slot_id 
    FROM parking_records pr 
    WHERE pr.user_id = ? AND pr.time_out IS NULL 
    ORDER BY pr.time_in DESC LIMIT 1
  `;

  db.query(sqlFind, [rfid], (err, results) => {
    if (err) {
      console.error("❌ Error cari record parkir aktif:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data parkir aktif untuk RFID ini" });
    }

    const record = results[0];

    const sqlUpdateTimeOut = `
      UPDATE parking_records SET time_out = NOW() WHERE id = ?
    `;
    const sqlFreeSlot = `
      UPDATE parking_slots SET is_occupied = 0, rfid = NULL WHERE id = ?
    `;

    db.query(sqlUpdateTimeOut, [record.id], (err1) => {
      if (err1) {
        console.error("❌ Gagal update time_out:", err1);
        return res.status(500).json({ message: "Gagal update waktu keluar" });
      }

      db.query(sqlFreeSlot, [record.slot_id], (err2) => {
        if (err2) {
          console.error("❌ Gagal kosongkan slot:", err2);
          return res.status(500).json({ message: "Gagal kosongkan slot" });
        }

        res.json({
          message: "✅ Slot berhasil dikosongkan dan waktu keluar tercatat",
        });
      });
    });
  });
});

// (6) Ambil daftar RFID dari slot yang terisi
router.get("/rfid-list", (req, res) => {
  // Query untuk mengambil slot yang terisi beserta RFID dan slot_code
  const query = `
    SELECT ps.slot_code, ps.rfid, ps.location
    FROM parking_slots ps
    WHERE ps.is_occupied = 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error mengambil daftar RFID:", err);
      return res.status(500).json({ message: "Error server" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Tidak ada slot yang terisi" });
    }

    // Kirim data daftar RFID yang terdaftar
    res.json(results);
  });
});

// (7) Ambil histori parkir per RFID
router.get("/parking-history/:rfid", (req, res) => {
  const rfid = req.params.rfid;

  if (!rfid) {
    return res.status(400).json({ message: "RFID harus diisi" });
  }

  const sql = `
    SELECT pr.id, pr.slot_id, ps.slot_code, pr.time_in, pr.time_out
    FROM parking_records pr
    JOIN parking_slots ps ON pr.slot_id = ps.id
    WHERE pr.user_id = ?
    ORDER BY pr.time_in DESC
  `;

  db.query(sql, [rfid], (err, results) => {
    if (err) {
      console.error("❌ Error ambil histori parkir:", err);
      return res.status(500).json({ message: "Error server" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada histori parkir untuk RFID ini" });
    }

    res.json(results);
  });
});

// (8) Input manual RFID + plat + slot
router.post("/manual-parking", (req, res) => {
  const { rfid, plat, slot } = req.body;

  if (!rfid || !plat || !slot) {
    return res
      .status(400)
      .json({ message: "RFID, plat, dan slot wajib diisi" });
  }

  // 1. Ambil slot_id berdasarkan slot_code
  const getSlotQuery = `SELECT id FROM parking_slots WHERE slot_code = ?`;

  db.query(getSlotQuery, [slot], (err, results) => {
    if (err) {
      console.error("❌ Gagal ambil slot:", err);
      return res.status(500).json({ message: "Server error saat ambil slot" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Slot tidak ditemukan" });
    }

    const slotId = results[0].id;

    // 2. Simpan data parkir ke parking_records
    const insertQuery = `
      INSERT INTO parking_records (user_id, plat, slot_id, time_in)
      VALUES (?, ?, ?, NOW())
    `;

    db.query(insertQuery, [rfid, plat, slotId], (err2) => {
      if (err2) {
        console.error("❌ Gagal simpan data parkir:", err2);
        return res.status(500).json({ message: "Gagal simpan data parkir" });
      }

      // 3. Update status slot menjadi terisi dan simpan RFID
      const updateSlotQuery = `
        UPDATE parking_slots SET is_occupied = 1, rfid = ? WHERE id = ?
      `;

      db.query(updateSlotQuery, [rfid, slotId], (err3) => {
        if (err3) {
          console.error("❌ Gagal update status slot:", err3);
          return res
            .status(500)
            .json({ message: "Data parkir disimpan, tapi gagal update slot" });
        }

        res.status(200).json({ message: "✅ Parkir manual berhasil dicatat" });
      });
    });
  });
});

module.exports = router;

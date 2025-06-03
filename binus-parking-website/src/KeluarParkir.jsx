import React, { useState, useEffect } from "react";
import axios from "axios";

function KeluarParkir() {
  const [rfid, setRfid] = useState(""); // RFID untuk keluar parkir
  const [occupiedSlots, setOccupiedSlots] = useState([]); // Daftar slot yang terisi
  const [loading, setLoading] = useState(false);

  // Ambil slot parkir yang terisi
  const fetchOccupiedSlots = () => {
    axios
      .get("http://localhost:5000/api/all-slots")
      .then((response) => {
        const occupied = response.data.filter((slot) => slot.is_occupied);
        setOccupiedSlots(occupied);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Fungsi untuk keluar parkir
  const handleExitParking = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/exit-parking", { rfid })
      .then((response) => {
        alert("Parkir keluar berhasil!");
        fetchOccupiedSlots(); // Refresh daftar slot
        setRfid(""); // Reset input RFID
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Gagal keluar parkir!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOccupiedSlots();
  }, []); // Menjalankan sekali saat komponen dimuat

  return (
    <div className="keluar-parkir">
      <h2>Keluar Parkir</h2>

      {/* Input RFID */}
      <input
        type="text"
        value={rfid}
        onChange={(e) => setRfid(e.target.value)}
        placeholder="Masukkan RFID untuk keluar"
        className="rfid-input"
      />

      {/* Tombol Keluar Parkir */}
      <button onClick={handleExitParking} disabled={loading || !rfid}>
        {loading ? "Loading..." : "Keluar Parkir"}
      </button>
    </div>
  );
}

export default KeluarParkir;

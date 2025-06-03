// src/components/ParkingHistory.jsx

import React, { useState } from "react";
import axios from "axios";

function ParkingHistory() {
  const [rfid, setRfid] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = () => {
    if (!rfid) {
      setError("Masukkan RFID terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setHistory([]);

    axios
      .get(`http://localhost:5000/api/parking-history/${rfid}`)
      .then((response) => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("Tidak ada histori parkir untuk RFID ini.");
        } else {
          setError("Gagal mengambil data histori.");
        }
        setLoading(false);
      });
  };

  return (
    <div className="parking-history">
      <h2>Histori Parkir per RFID</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Masukkan RFID"
          value={rfid}
          onChange={(e) => setRfid(e.target.value)}
          className="rfid-input"
        />
        <button
          onClick={fetchHistory}
          disabled={loading || !rfid}
          style={{ marginLeft: "10px" }}
        >
          {loading ? "Memuat..." : "Cari Histori"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {history.length > 0 && (
        <table
          border="1"
          style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>RFID</th>
              <th>Plat Nomor</th>
              <th>Slot</th>
              <th>Waktu Masuk</th>
              <th>Waktu Keluar</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.rfid}</td>
                <td>{record.plat}</td>
                <td>{record.slot_code}</td>
                <td>{new Date(record.time_in).toLocaleString()}</td>
                <td>
                  {record.time_out
                    ? new Date(record.time_out).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ParkingHistory;

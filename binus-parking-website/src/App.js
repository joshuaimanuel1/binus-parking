import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import KeluarParkir from "./KeluarParkir";
import ParkingHistory from "./ParkingHistory";

function App() {
  const [view, setView] = useState("keluar");
  const [rfid, setRfid] = useState("");
  const [slot, setSlot] = useState("");
  const [plat, setPlat] = useState("");
  const [manualSlot, setManualSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [allSlots, setAllSlots] = useState([]);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [logAktivitas, setLogAktivitas] = useState([]);
  const [showManualModal, setShowManualModal] = useState(false);
  const videoRefs = useRef([]);
  const modelRef = useRef(null);
  const [accessStatus, setAccessStatus] = useState("Siap memindai");
  const [lastAccess, setLastAccess] = useState(null);

  const handleGetSlot = () => {
    if (!rfid) return;
    setLoading(true);
    setAccessStatus("Memindai...");

    axios
      .post("http://localhost:5000/api/parking", { rfid })
      .then((response) => {
        setSlot(response.data.slot);
        setAccessStatus("Berhasil");
        setLastAccess({ id: rfid, time: new Date().toLocaleString() });
        log("Akses berhasil: " + rfid);
        setLoading(false);
        fetchAllSlots();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Gagal mendapatkan slot parkir");
        setAccessStatus("Gagal");
        log("Akses gagal: " + rfid);
        setLoading(false);
      });
  };

  const handleManualSubmit = () => {
    if (!rfid || !plat || !manualSlot) {
      alert("Mohon lengkapi semua kolom input");
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:5000/api/manual-parking", {
        rfid,
        plat,
        slot: manualSlot,
      })
      .then((res) => {
        alert("Akses manual berhasil");
        log(`Akses manual: ${rfid} - ${plat} ke slot ${manualSlot}`);
        setRfid("");
        setPlat("");
        setManualSlot("");
        fetchAllSlots();
        setLoading(false);
        setShowManualModal(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal melakukan akses manual");
        setLoading(false);
      });
  };

  const fetchAllSlots = () => {
    axios
      .get("http://localhost:5000/api/all-slots")
      .then((response) => {
        setAllSlots(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const detectCars = async () => {
    if (modelRef.current) {
      videoRefs.current.forEach(async (video, index) => {
        if (video && video.readyState === 4) {
          const predictions = await modelRef.current.detect(video);
          const hasCar = predictions.some(
            (pred) => pred.class === "car" || pred.class === "truck"
          );
          const currentSlot = allSlots[index];
          if (hasCar && currentSlot && !currentSlot.is_occupied) {
            axios
              .post("http://localhost:5000/api/update-slot", {
                id: currentSlot.id,
                isOccupied: true,
              })
              .then(() => {
                log("Slot terisi: " + currentSlot.slot_code);
                fetchAllSlots();
              });
          } else if (!hasCar && currentSlot && currentSlot.is_occupied) {
            axios
              .post("http://localhost:5000/api/update-slot", {
                id: currentSlot.id,
                isOccupied: false,
              })
              .then(() => {
                log("Slot kosong: " + currentSlot.slot_code);
                fetchAllSlots();
              });
          }
        }
      });
    }
  };

  const log = (message) => {
    setLogAktivitas((prev) => [
      { message, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9),
    ]);
  };

  useEffect(() => {
    if (view === "keluar") {
      fetchAllSlots();
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameraDevices(videoDevices);
      });
      cocoSsd.load().then((model) => {
        modelRef.current = model;
        setInterval(detectCars, 3000);
      });
    }
  }, [view]);

  useEffect(() => {
    if (view === "keluar") {
      cameraDevices.forEach((device, index) => {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: device.deviceId } })
          .then((stream) => {
            if (videoRefs.current[index]) {
              videoRefs.current[index].srcObject = stream;
            }
          })
          .catch((error) => {
            console.error("Error accessing camera:", error);
          });
      });
    }
  }, [cameraDevices, view]);

  return (
    <div className="App">
      <div className="container">
        <h1>Sistem Parkir Otomatis BINUS</h1>

        <nav style={{ marginBottom: 20 }}>
          <button
            onClick={() => setView("keluar")}
            disabled={view === "keluar"}
          >
            Keluar Parkir
          </button>
          <button
            onClick={() => setView("history")}
            disabled={view === "history"}
          >
            Histori Parkir
          </button>
        </nav>

        {view === "keluar" ? (
          <div className="horizontal-layout">
            {/* Kolom 1: Akses RFID */}
            <div className="column">
              <h3>Tempelkan kartu RFID Anda</h3>
              <div className="rfid-card-box">
                <input
                  type="text"
                  placeholder="Tempelkan kartu RFID..."
                  value={rfid}
                  onChange={(e) => setRfid(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGetSlot()}
                />
              </div>

              <p className={`access-status ${accessStatus.toLowerCase()}`}>
                Status: {accessStatus}
              </p>
              {lastAccess && (
                <p className="last-access">
                  Akses terakhir: ID {lastAccess.id} pada {lastAccess.time}
                </p>
              )}
              {slot && <div className="slot">Slot parkir kamu: {slot}</div>}

              <button
                className="get-slot-btn"
                style={{ marginTop: 20 }}
                onClick={() => setShowManualModal(true)}
              >
                🔧 Akses Manual
              </button>
            </div>

            {/* Kolom 2: Daftar Slot */}
            <div className="column">
              <h3>Daftar Slot Parkir</h3>
              <input
                type="text"
                placeholder="Cari slot parkir..."
                className="rfid-input-box"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="slot-grid">
                {allSlots
                  .filter((s) =>
                    s.slot_code
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((s) => (
                    <div
                      key={s.id}
                      className={`slot-box ${
                        s.is_occupied ? "occupied" : "available"
                      }`}
                    >
                      <div className="slot-code">{s.slot_code}</div>
                      <div className="slot-location">Lokasi: {s.location}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Kolom 3: Kamera dan Log */}
            <div className="column">
              <h3>Pemantauan Kamera</h3>
              <div className="slot-grid">
                {cameraDevices.map((device, index) => (
                  <div key={device.deviceId} className="slot-box available">
                    <p>Kamera ke-{index + 1}</p>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      autoPlay
                      playsInline
                      muted
                      className="camera-feed"
                    />
                  </div>
                ))}
              </div>
              <h3>Log Aktivitas</h3>
              <ul className="log-list">
                {logAktivitas.map((log, idx) => (
                  <li key={idx}>
                    {log.time} - {log.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <ParkingHistory />
        )}

        <div className="keluar-section">
          <KeluarParkir />
        </div>

        {/* Popup Modal Akses Manual */}
        {showManualModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>🔧 Akses Manual</h2>
              <input
                type="text"
                placeholder="ID Kartu RFID"
                className="rfid-input-box"
                value={rfid}
                onChange={(e) => setRfid(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nomor Plat Kendaraan"
                className="rfid-input-box"
                value={plat}
                onChange={(e) => setPlat(e.target.value)}
              />
              <select
                className="rfid-input-box"
                value={manualSlot}
                onChange={(e) => setManualSlot(e.target.value)}
              >
                <option value="">-- Pilih Slot Parkir --</option>
                {allSlots
                  .filter((s) => !s.is_occupied)
                  .map((s) => (
                    <option key={s.id} value={s.slot_code}>
                      {s.slot_code} - {s.location}
                    </option>
                  ))}
              </select>
              <div style={{ marginTop: 10 }}>
                <button onClick={handleManualSubmit} className="get-slot-btn">
                  Simpan
                </button>
                <button
                  onClick={() => setShowManualModal(false)}
                  style={{ marginLeft: 10 }}
                  className="get-slot-btn cancel"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useRef } from "react";

function WebcamTest() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Minta akses kamera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Gagal mengakses kamera", err);
        alert("Kamera tidak bisa diakses. Pastikan izin sudah diberikan.");
      });
  }, []);

  return (
    <div>
      <h2>Test Kamera</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
        style={{ border: "2px solid black" }}
      />
    </div>
  );
}

export default WebcamTest;

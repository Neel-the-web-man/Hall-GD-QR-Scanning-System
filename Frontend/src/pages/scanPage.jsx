import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../api";
import "./scanPage.css";

const ScanPage = () => {
  const [boarder, setBoarder] = useState(null);
  const [message, setMessage] = useState("");
  const [locked, setLocked] = useState(false);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const html5QrCode = new Html5Qrcode("admin-scanner-camera");
    html5QrCodeRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (!isMounted) return;

        if (devices && devices.length) {
          const cameraId = devices[0].id;
          await html5QrCode.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            onScanSuccess,
            () => {}
          );
        } else {
          setMessage("No camera found");
        }
      } catch (err) {
        console.error("Scanner start error:", err);
        setMessage("Camera access error");
      }
    };

    const timeoutId = setTimeout(startScanner, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);

      if (html5QrCodeRef.current) {
        try {
          const qr = html5QrCodeRef.current;
          if (qr._isScanning) {
            qr.stop().then(() => qr.clear()).catch(() => {});
          } else {
            qr.clear().catch(() => {});
          }
        } catch (err) {
          console.log("Error stopping scanner:", err);
        }
      }
    };
  }, []);

  const onScanSuccess = async (qrCodeMessage) => {
    if (locked) return;
    setLocked(true);

    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.pause(); // temporarily stop scanning
    }

    try {
      const res = await api.post("/scan", { qrCodeId: qrCodeMessage });
      setBoarder(res.data.boarder);
      setMessage("✅ Meal Confirmed");
    } catch (err) {
      if (err.response?.status === 404) setMessage("⚠️ Invalid QR");
      else if (err.response?.status === 400) setMessage("❌ Meal Already Taken");
      else setMessage("Error confirming meal");
      console.log(err);
    }
  };

  const handleNext = async () => {
    setBoarder(null);
    setMessage("");
    setLocked(false);
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.resume();
      } catch (e) {
        console.log("Failed to resume scanner:", e);
      }
    }
  };

  return (
    <div className="admin-scanner-container">
      <div className="admin-scanner-left">
        <h2 className="admin-scanner-title">QR Scanner</h2>
        <div id="admin-scanner-camera" className="admin-scanner-camera"></div>
      </div>
      <div className="admin-scanner-right">
        <div className="admin-scanner-card">
          {boarder ? (
            <>
              <p><strong>Name:</strong> {boarder.name}</p>
              <p><strong>Roll Number:</strong> {boarder.rollNo}</p>
              <p><strong>Room No:</strong> {boarder.roomNo}</p>
              <p><strong>Phone:</strong> {boarder.phoneNo}</p>
            </>
          ) : (
            <p style={{ fontStyle: "italic", color: "#555" }}>QR details:</p>
          )}
          {message && <p className="admin-scanner-status">{message}</p>}
          {locked && (
            <button className="admin-scanner-next" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js"; //using interceptor instance
import "./scanBoarder.css";

const ScanBoarder = () => {
  const { qrid } = useParams();
  const [boarder, setBoarder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const fetchBoarder = async () => {
      try {
        const res = await api.get(`/boarders/${qrid}`);
        setBoarder(res.data);
      } catch (err) {
        console.error("Error fetching boarder details:", err);
        setError(err.response?.data?.message || "Failed to fetch boarder details");
      } finally {
        setLoading(false);
      }
    };

    fetchBoarder();
  }, [qrid]);

  const handleConfirm = async () => {
    try {
      const res = await api.post("/scan", { qrCodeId: qrid });
      setConfirmed(true);
      setBoarder(res.data.boarder);
    } catch (err) {
      console.error("Error confirming meal:", err);
      setError(err.response?.data?.message || "Failed to confirm meal");
    }
  };

  if (loading) return <p className="scan-loading">Loading boarder data...</p>;
  if (error) return <p className="scan-error">{error}</p>;

  return (
    <div className="scan-container">
      <h2 className="scan-title">Boarder Details</h2>
      {boarder ? (
        <div className="scan-card">
          <p><strong>Name:</strong> {boarder.name}</p>
          <p><strong>Roll Number:</strong> {boarder.rollNo}</p>
          <p><strong>Room No:</strong> {boarder.roomNo}</p>
          <p><strong>Phone:</strong> {boarder.phoneNo}</p>

          {boarder.isScanned || confirmed ? (
            <p className="scan-already">✅ Meal Confirmed.</p>
          ) : (
            <button className="scan-confirm-btn" onClick={handleConfirm}>
              Confirm 
            </button>
          )}
        </div>
      ) : (
        <p className="scan-error">Boarder not found.</p>
      )}
    </div>
  );
};

export default ScanBoarder;

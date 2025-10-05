import React, { useState } from "react";
import api from "../api.js"; // axios instance with token interceptor
import "./downloadData.css";
import Navbar from "../components/navbar.jsx";

const DownloadData = () => {
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    setStatus("Preparing Excel file...");
    try {
      const res = await api.get("/export/studentsdata", { responseType: "blob" }); // backend route
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "boarders.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus("Excel file downloaded successfully!");
    } catch (err) {
      console.error("Error downloading Excel:", err);
      setStatus(
        err.response?.data?.message || "Failed to download Excel. Try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-export-container">
        <h1 className="admin-export-heading">Download Boarders Data</h1>
        <button className="admin-export-button" onClick={handleDownload}>
          Download Excel
        </button>
        {status && <p className="admin-export-status">{status}</p>}
      </div>
    </>
  );
};

export default DownloadData;

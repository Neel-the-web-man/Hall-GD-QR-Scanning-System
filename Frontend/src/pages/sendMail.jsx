import React, { useState } from "react";
import api from "../api.js"; // axios instance with token interceptor
import "./sendMail.css";
import Navbar from '../components/navbar.jsx' 

const AdminMail = () => {
  const [status, setStatus] = useState("");

  const handleSendMail = async () => {
    setStatus("Sending emails...");
    try {
      const res = await api.post("/admin/send-mails"); // backend endpoint
      setStatus(res.data.message || "Emails sent successfully!");
    } catch (err) {
      console.error("Error sending mails:", err);
      setStatus(
        err.response?.data?.message || "Failed to send emails. Try again."
      );
    }
  };

  return (<>
  <Navbar />
    <div className="admin-mail-container">
      <h1 className="admin-mail-heading">Send QR Codes to All Boarders</h1>
      <button className="admin-mail-button" onClick={handleSendMail}>
        Send Emails
      </button>
      {status && <p className="admin-mail-status">{status}</p>}
    </div>
  </>
  );
};

export default AdminMail;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import ScanBoarder from "./pages/scanBoarder.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import SendMail from "./pages/sendMail.jsx";
import ScanPage from "./pages/scanPage.jsx";
import DownloadData from "./pages/downloadData.jsx";

import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        <Route path="/admin/sendmails" element={
            <ProtectedRoute>
              <SendMail />
            </ProtectedRoute>
          } />
        <Route path="/admin/scan/boarder/:qrid" element={
            <ProtectedRoute>
              <ScanBoarder />
            </ProtectedRoute>
          } />
        <Route path="/admin/scanner" element={
            <ProtectedRoute>
              <ScanPage />
            </ProtectedRoute>
          } />
        <Route path="/admin/downloaddata" element={
            <ProtectedRoute>
              <DownloadData />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
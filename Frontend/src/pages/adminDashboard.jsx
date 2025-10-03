import React , {useState, useEffect} from 'react'
import Navbar from '../components/navbar.jsx'
import api from "../api.js";
import "./adminDashboard.css";
const AdminDashboard = () => {
    const [boarders, setBoarders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBoarders = async () => {
      try {
        const res = await api.get("/boarders"); // backend endpoint
        setBoarders(res.data);
      } catch (err) {
        console.error("Error fetching boarders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoarders();
  }, []);

  const filteredBoarders = boarders.filter((b) =>
    [b.name, b.rollNo, b.roomNo, b.phoneNo, b.email].some((field) =>
      field?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  return (
    <div>
      <Navbar/>
      <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>

      <input
        type="text"
        className="admin-dashboard-search"
        placeholder="Search by name, roll, room, phone, email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="admin-dashboard-loading">Loading...</div>
      ) : filteredBoarders.length === 0 ? (
        <div className="admin-dashboard-no-result">No results found</div>
      ) : (
        <div className="admin-dashboard-cards">
          {filteredBoarders.map((b) => (
            <div key={b._id} className="admin-dashboard-card">
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Roll No:</strong> {b.rollNo}</p>
              <p><strong>Room No:</strong> {b.roomNo}</p>
              <p><strong>Phone No:</strong> {b.phoneNo}</p>
              <p><strong>Email:</strong> {b.email}</p>
              <p><strong>Scanned:</strong> {b.isScanned ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    </div>
  )
}

export default AdminDashboard

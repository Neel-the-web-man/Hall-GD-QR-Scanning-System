import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js"; // axios instance

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await api.post("/admin/verify"); // backend will check Authorization header
        setIsAuth(true);
      } catch (err) {
        localStorage.removeItem("accessToken");
        setIsAuth(false);
        console.log("Not Authenticated:", err);
      }
    };
    verify();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
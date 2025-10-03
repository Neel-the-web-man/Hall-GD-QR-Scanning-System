import React ,{useState} from 'react'
import "./login.css";
import Navbar from '../components/navbar.jsx'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const Navigate = useNavigate();
  const validate = () => {
    const newErrors = {};

    // Email regex (basic validation)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    // Password regex: at least 6 chars, one letter, one number, one special char
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      newErrors.password =
        "Password must be at least 6 chars and include a number and special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      localStorage.setItem("accessToken", data.token);
      Navigate("/admin");
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  } else {
    console.log("Validation Failed");
  }
};

  return (<>
    <Navbar/>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Admin Login</h2>

        <div className="login-field">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            />
          {errors.email && <span className="login-error">{errors.email}</span>}
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            />
          {errors.password && (
            <span className="login-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
          </>
  );
}

export default Login

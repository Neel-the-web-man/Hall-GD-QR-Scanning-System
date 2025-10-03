import React ,{useState , useEffect} from 'react'
import './navbar.css'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate("/login");
    }

    const isLoggedIn = () => {
      return !!localStorage.getItem("accessToken");
    };

    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    useEffect(() => {
      setLoggedIn(isLoggedIn());
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      setLoggedIn(false);
      navigate("/");
    };

  return (
    <nav className='navbar-gc-qr-system'>
        <div className='nav-logo' onClick={() => navigate("/")}>
            <img src="/mmm-logo-small.jpg" width="80px" height="80px" alt="logo"/>
            <h1>MMM HALL</h1>
        </div>
        <div className="nav-heading">
            <h1>
            GD-QR-System
            </h1>
        </div>
        <div className='nav-auth'>
            {loggedIn ? (
              <button onClick={handleLogout}>Logout</button>
              ) : (
              <button onClick={handleLogin}>Login</button>
            )}
        </div>
    </nav>
  )
}

export default Navbar

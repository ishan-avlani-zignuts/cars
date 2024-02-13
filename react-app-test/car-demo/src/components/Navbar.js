import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onSearch }) {

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };
  const authToken = localStorage.getItem("authToken");

  const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Easy Go</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {authToken ?  
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/userdashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link"  onClick={handleLogout}>Logout</Link>
                </li>
              </>
                : (
          
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/userlogin">User Login</Link></li>
                  <li><Link className="dropdown-item" to="/adminlogin">Admin Login</Link></li>
                </ul>
              </li>
               )}
            {!authToken && (
              <li className="nav-item">
                <Link className="nav-link" to="/usersignup">Sign Up</Link>
              </li>
            )}
          
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
            <button className="btn btn-outline-danger" style={{ backgroundColor: "red" , color: "white" }} type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
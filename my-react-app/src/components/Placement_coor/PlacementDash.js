import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Admin/Dash.css';
import EmployerPage from './Employer';
import StudentManagement from "./ManageStudent"

function PlacementDash() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="placement-dashboard">
      <button className="toggle-button" onClick={toggleNavbar}>
        {navbarOpen ? "Close Navbar" : "Open Navbar"}
      </button>
      <h1 className="placement-name">Placement Coordinator</h1> 
      <nav className={navbarOpen ? "navbar active" : "navbar"}>
        <ul className="navbar-nav">
          <li className="nav-item"> 
            <Link to="/StudentManagement" className="nav-link">Manage Students</Link>
          </li>
          <li className="nav-item"> 
            <Link to="/EmployerPage" className="nav-link">Manage Employers</Link>
          </li>
          <li className="nav-item"> 
            <Link to="/jobs" className="nav-link">Manage Jobs</Link> 
          </li>
          <li className="nav-item"> 
            <Link to="/schedule" className="nav-link">Schedule Interview</Link> 
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PlacementDash;

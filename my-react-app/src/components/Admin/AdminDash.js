import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dash.css"
import AddStudent from './AddStudent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function AdminDash() {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-name">HI,Admin</h1>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        MENU
      </button>
      <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/AddStudent" className="nav-link">
              Add Student
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/manage-students" className="nav-link">
              Manage Students
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/generate-report" className="nav-link">
              Generate Report
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/master-management" className="nav-link">
              Master Management
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-profile" className="nav-link">
              Admin Profile
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/AddStudent" component={AddStudent} />
      </Routes>
    </div>
  );
}

export default AdminDash;

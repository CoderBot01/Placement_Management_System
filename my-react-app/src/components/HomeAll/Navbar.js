import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./menuitems";
import "./Navbarstyles.css";
import AdminProfile from "../Admin/Profile";
import PlacementDash from "../Placement_coor/PlacementDash";
import StudentDashboard from "../Student/StudentDashboard";
import AdminDash from "../Admin/AdminDash";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="navbaritems">
      <h1 className="navbar-logo">PLACEMENT CELL</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
        <li className="login-dropdown">
          <div className="dropdown">
            <button className="login-btn">Login</button>
            <div className="dropdown-content">
              <Link to="/AdminDash">Admin</Link>
              <Link to="/PlacementDash">Placement Coordinator</Link>
              <Link to="/StudentDashboard">Student</Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

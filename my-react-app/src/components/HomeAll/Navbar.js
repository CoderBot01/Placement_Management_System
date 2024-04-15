import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./menuitems";
import "./Navbarstyles.css";
import PlacementDash from "../Placement_coor/PlacementDash";
import StudentDashboard from "../Student/StudentDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LoginPage from "../Student/Login";
import LoginPage1 from "../Placement_coor/Pla_Login";

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
            <button className="login-btn">
              <FontAwesomeIcon icon={faUser} /> Login
            </button>
            <div className="dropdown-content">
              <Link to="/LoginPage1">Placement Coordinator</Link>
              <Link to="/LoginPage">Student</Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

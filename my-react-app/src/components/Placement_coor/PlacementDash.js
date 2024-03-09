import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "./PlacementDash.css"


function PlacementDash() {
  return (
    
      <div>
        <h1>Placement Coordinator</h1>
        <nav>
          <ul>
            <li>
              <Link to="/students">Manage Students</Link>
            </li>
            <li>
              <Link to="/employers">Manage Employers</Link>
            </li>
            <li>
              <Link to="/jobs">Manage Jobs</Link>
            </li>
          </ul>
        </nav>
       
        

        
         
      </div>
    
  );
}

export default PlacementDash;

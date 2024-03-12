import React, { useState } from 'react';
import './PlacementDash.css';
import EmployerPage from './Employer';
import StudentManagement from "./ManageStudent";
import JobPostingForm from "./Postjob";

function PlacementDash() {
    const [activeTab, setActiveTab] = useState('edit');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logout clicked");
    };

    return (
      <div className="placement-dashboard">
          <header className="placement-name">
              <h1>Placement Coordinator</h1>
              <div className="top-right-buttons">
                  <button onClick={() => handleTabChange('settings')} className="link">Settings</button>
                  <button onClick={handleLogout} className="link">Logout</button>
              </div>
          </header>
          <nav className="buttons">
              <button onClick={() => handleTabChange('manage_student')} className="button">Manage Students</button>
              <button onClick={() => handleTabChange('manage_employer')} className="button">Manage Employers</button>
              <button onClick={() => handleTabChange('manage_jobs')} className="button">Manage Jobs</button>
              <button onClick={() => handleTabChange('training')} className="button">Training and Development</button>
              <button onClick={() => handleTabChange('progress')} className="button">Progress Tracker</button>
              <button onClick={() => handleTabChange('schedule_interview')} className="button">Schedule Interview</button>
          </nav>
          <section>
              {activeTab === 'manage_student' && <StudentManagement/>}
              {activeTab === 'manage_employer' && <EmployerPage />}
              {activeTab === 'manage_jobs' && <JobPostingForm />}
              {/* Add other conditions for different tabs */}
          </section>
      </div>
  );
    }  

export default PlacementDash;

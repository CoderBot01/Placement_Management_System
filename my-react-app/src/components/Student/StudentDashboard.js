// StudentDashboard.js
import React, { useState } from 'react';
import "./StudentDahboard.css";
import ApplyJobPage from "./Applyjob";
import ResumeForm from "./Resume";
import TrainingDevelopmentPage from './Training';
import ViewProfilePage from './View';
import ProgressPage from './Progress';

function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('edit');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            
            <header>
                <h1>Student Dashboard</h1>
            </header>
            <nav>
                <button onClick={() => handleTabChange('view')}>View Profile</button>
                <button onClick={() => handleTabChange('apply')}>Apply for Job</button>
                <button onClick={() => handleTabChange('resume')}>Create Resume</button>
                <button onClick={() => handleTabChange('training')}>Training and Development</button>
                <button onClick={() => handleTabChange('progress')}>Progress Tracker</button>
                <button onClick={() => handleTabChange('recommendations')}>Job Recommendations</button>
            </nav>
            <section>
                {activeTab === 'view' && <ViewProfilePage/>}
                {activeTab === 'apply' && <ApplyJobPage />}
                {activeTab === 'resume' && <ResumeForm/>}
                {activeTab === 'training' && <TrainingDevelopmentPage/>}
                {activeTab === 'progress' && <ProgressPage/>}
                {activeTab === 'recommendations' && <h2>Job Recommendations</h2>}
                {/* Additional content for each section */}
            </section>
            <footer>
                <p>&copy; 2024 Student Dashboard</p>
            </footer>
        </div>
    );
}

export default StudentDashboard;

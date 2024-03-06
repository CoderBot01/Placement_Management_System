// StudentDashboard.js
import React, { useState } from 'react';
import "./StudentDahboard.css";

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
                <button onClick={() => handleTabChange('edit')}>Edit Profile</button>
                <button onClick={() => handleTabChange('apply')}>Apply for Job</button>
                <button onClick={() => handleTabChange('resume')}>Create Resume</button>
                <button onClick={() => handleTabChange('training')}>Training and Development</button>
                <button onClick={() => handleTabChange('progress')}>Progress Tracker</button>
                <button onClick={() => handleTabChange('recommendations')}>Job Recommendations</button>
            </nav>
            <section>
                {activeTab === 'edit' && <h2>Edit Profile</h2>}
                {activeTab === 'apply' && <h2>Apply for Job</h2>}
                {activeTab === 'resume' && <h2>Create Resume</h2>}
                {activeTab === 'training' && <h2>Training and Development</h2>}
                {activeTab === 'progress' && <h2>Progress Tracker</h2>}
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

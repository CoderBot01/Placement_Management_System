import React, { useState } from 'react';
import ApplyJobPage from "./Applyjob";
import ResumeForm from "./Resume";
import TrainingDevelopmentPage from './Training';
import ViewProfilePage from './View';
import ProgressPage from './Progress';
import Resume from './Resume';
import JobRecommendation from './Recommend';
import InterviewAt from "./Interview";

function StudentDashboard({ id }) {
    const [activeTab, setActiveTab] = useState('view');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        // Perform logout action here, e.g., clearing session or state
        // Redirect to login page or perform any other necessary action
        console.log("Logout clicked");
    };

    return (
        <div className="bg-dark text-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Student Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'view' ? 'active' : ''}`} onClick={() => handleTabChange('view')}>View Profile</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'apply' ? 'active' : ''}`} onClick={() => handleTabChange('apply')}>Apply for Job</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => handleTabChange('resume')}>Create Resume</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'training' ? 'active' : ''}`} onClick={() => handleTabChange('training')}>Training and Development</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => handleTabChange('progress')}>Progress Tracker</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => handleTabChange('recommendations')}>Job Recommendations</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => handleTabChange('interview')}>Interviews</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid py-4 bg-secondary">
                <section>
                    {activeTab === 'view' && <ViewProfilePage id={id} />}
                    {activeTab === 'apply' && <ApplyJobPage />}
                    {activeTab === 'resume' && <Resume />}
                    {activeTab === 'training' && <TrainingDevelopmentPage />}
                    {activeTab === 'progress' && <ProgressPage />}
                    {activeTab === 'recommendations' && <JobRecommendation />}
                    {activeTab === 'interview' && <InterviewAt />}
                </section>
            </div>
        </div>
    );
}

export default StudentDashboard;

import React, { useState } from 'react';
import "./StudentDahboard.css";
import ApplyJobPage from "./Applyjob";
import ResumeForm from "./Resume";
import TrainingDevelopmentPage from './Training';
import ViewProfilePage from './View';
import ProgressPage from './Progress';
import Resume from './Resume';
import JobRecommendation from './Recommend';
function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('edit');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="student-dashboard"> {/* Added class name */}
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
                {activeTab === 'resume' && <Resume/>}
                {activeTab === 'training' && <TrainingDevelopmentPage/>}
                {activeTab === 'progress' && <ProgressPage/>}
                {activeTab === 'recommendations' && <JobRecommendation/>}
                {/* Additional content for each section */}
            </section>
          
        </div>
    );
}

export default StudentDashboard;

// StudentProfile.js
import React, { useState } from 'react';
import './View.css';

const StudentProfile = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (index) => {
        setActiveSection(index === activeSection ? null : index);
    };

    return (
        <div className="student-profile">
            <section className={`section personal-info ${activeSection === 0 ? 'active' : ''}`} onClick={() => toggleSection(0)}>
                <h2>Personal Information</h2>
                <div className="section-content">
                    <p>Full Name: John Doe</p>
                    <p>Date of Birth: January 1, 2000</p>
                    <p>Contact Information: john.doe@email.com | 123-456-7890 | 123 Main St, City, State</p>
                    <p>Brief Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
            </section>

            <section className={`section academic-achievements ${activeSection === 1 ? 'active' : ''}`} onClick={() => toggleSection(1)}>
                <h2>Academic Achievements</h2>
                <div className="section-content">
                    <p>GPA: 3.8</p>
                    <p>Awards/Honors: Dean's List, Academic Excellence Award</p>
                    <p>Scholarships: Merit Scholarship</p>
                    <p>Extracurricular Activities: Math Club President, Science Fair Participant</p>
                </div>
            </section>
            <section className={`section skills ${activeSection === 2 ? 'active' : ''}`} onClick={() => toggleSection(2)}>
                <h2>Skills</h2>
                <div className={`section-content ${activeSection === 2 ? 'active' : ''}`}>
                    <p>Technical Skills: JavaScript, React.js, HTML/CSS</p>
                    <p>Soft Skills: Communication, Leadership, Teamwork</p>
                    <p>Language Proficiency: English (Fluent), Spanish (Intermediate)</p>
                </div>
            </section>
            <section className={`section certifications ${activeSection === 3 ? 'active' : ''}`} onClick={() => toggleSection(3)}>
                <h2>Certifications</h2>
                <div className={`section-content ${activeSection === 3 ? 'active' : ''}`}>
                    <p>React.js Certification</p>
                    <p>Date of Completion: January 2023</p>
                    <p>Issuing Organization: XYZ Certification Center</p>
                </div>
            </section>


            <section className={`section academic-records ${activeSection === 4 ? 'active' : ''}`} onClick={() => toggleSection(4)}>
                <h2>Academic Records</h2>
                <div className={`section-content ${activeSection === 4 ? 'active' : ''}`}>
                    <p>List of Courses Completed:</p>
                    <ul>
                        <li>Course 1: A</li>
                        <li>Course 2: B+</li>
                        <li>Course 3: A-</li>
                    </ul>
                    <p>Transcripts: Uploaded</p>
                    <p>Research Projects/Theses: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
            </section>


            <section className={`section portfolio ${activeSection === 5 ? 'active' : ''}`} onClick={() => toggleSection(5)}>
                <h2>Portfolio</h2>
                <div className={`section-content ${activeSection === 5 ? 'active' : ''}`}>
                    <p>Showcase any projects, papers, or presentations you're proud of</p>
                    <p>Provide links to online portfolios or repositories if available</p>
                </div>
            </section>

            <section className={`section extracurricular-activities ${activeSection === 6 ? 'active' : ''}`} onClick={() => toggleSection(6)}>
                <h2>Extracurricular Activities</h2>
                <div className={`section-content ${activeSection === 6 ? 'active' : ''}`}>
                    <p>Sports Involvement: Soccer Team Captain</p>
                    <p>Clubs/Organizations: Debate Club Member</p>
                    <p>Volunteer Work: Local Community Clean-up</p>
                    <p>Leadership Roles: Class Representative</p>
                </div>
            </section>

            <section className={`section work-experience ${activeSection === 7 ? 'active' : ''}`} onClick={() => toggleSection(7)}>
                <h2>Work Experience</h2>
                <div className={`section-content ${activeSection === 7 ? 'active' : ''}`}>
                    <p>Internships: ABC Company (Summer 2022)</p>
                    <p>Part-time Jobs: Retail Associate at XYZ Store</p>
                    <p>Relevant Work Experience: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
            </section>

            <section className={`section references ${activeSection === 8 ? 'active' : ''}`} onClick={() => toggleSection(8)}>
                <h2>References</h2>
                <div className={`section-content ${activeSection === 8 ? 'active' : ''}`}>
                    <p>Contact information for academic or professional references</p>
                </div>
            </section>




        </div>
    );
};

export default StudentProfile;

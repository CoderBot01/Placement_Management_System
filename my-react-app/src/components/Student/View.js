import React, { useState, useRef } from 'react';
import './View.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const StudentProfile = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const profileRef = useRef(null);

    const toggleSection = (index) => {
        setActiveSection(index === activeSection ? null : index);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const exportAsPDF = () => {
        const input = profileRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add additional data to the PDF
            pdf.setFontSize(12);
            pdf.text('Additional Data:', 10, imgHeight + 10); // Adjust position according to your needs
            pdf.text('Name: John Doe', 10, imgHeight + 20);
            pdf.text('Age: 24', 10, imgHeight + 30);
            pdf.text('Email: john.doe@example.com', 10, imgHeight + 40);

            // Example of adding data from the component state
            // if you have more complex data, you need to format it properly before adding it to the PDF
            pdf.text(`Active Section: ${activeSection}`, 10, imgHeight + 50);

            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('student_profile.pdf');
        });
    };
    return (
        <div ref={profileRef} className="student-profile">
            <button onClick={toggleEditing}>{isEditing ? 'Save Changes' : 'Edit'}</button>
            <section className={`section personal-info ${activeSection === 0 ? 'active' : ''}`} onClick={() => toggleSection(0)}>
                <h2>Personal Information</h2>
                <div className="section-content">
                    {isEditing ? (
                        <div>
                            <input type="text" defaultValue="John Doe" />
                            <input type="text" defaultValue="January 1, 2000" />
                            <input type="text" defaultValue="john.doe@email.com" />
                            <input type="text" defaultValue="123-456-7890" />
                            <input type="text" defaultValue="123 Main St, City, State" />
                            <textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." />
                        </div>
                    ) : (
                        <div>
                            <p>Full Name: John Doe</p>
                            <p>Date of Birth: January 1, 2000</p>
                            <p>Contact Information: john.doe@email.com | 123-456-7890 | 123 Main St, City, State</p>
                            <p>Brief Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section academic-achievements ${activeSection === 1 ? 'active' : ''}`} onClick={() => toggleSection(1)}>
                <h2>Academic Achievements</h2>
                <div className="section-content">
                    {isEditing ? (
                        <div>
                            <label>GPA: <input type="text" defaultValue="3.8" /></label>
                            <label>Awards/Honors: <input type="text" defaultValue="Dean's List, Academic Excellence Award" /></label>
                            <label>Scholarships: <input type="text" defaultValue="Merit Scholarship" /></label>
                            <label>Extracurricular Activities: <input type="text" defaultValue="Math Club President, Science Fair Participant" /></label>
                        </div>
                    ) : (
                        <div>
                            <p>GPA: 3.8</p>
                            <p>Awards/Honors: Dean's List, Academic Excellence Award</p>
                            <p>Scholarships: Merit Scholarship</p>
                            <p>Extracurricular Activities: Math Club President, Science Fair Participant</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section skills ${activeSection === 2 ? 'active' : ''}`} onClick={() => toggleSection(2)}>
                <h2>Skills</h2>
                <div className={`section-content ${activeSection === 2 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <label>Technical Skills: <input type="text" defaultValue="JavaScript, React.js, HTML/CSS" /></label>
                            <label>Soft Skills: <input type="text" defaultValue="Communication, Leadership, Teamwork" /></label>
                            <label>Language Proficiency: <input type="text" defaultValue="English (Fluent), Spanish (Intermediate)" /></label>
                        </div>
                    ) : (
                        <div>
                            <p>Technical Skills: JavaScript, React.js, HTML/CSS</p>
                            <p>Soft Skills: Communication, Leadership, Teamwork</p>
                            <p>Language Proficiency: English (Fluent), Spanish (Intermediate)</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section certifications ${activeSection === 3 ? 'active' : ''}`} onClick={() => toggleSection(3)}>
                <h2>Certifications</h2>
                <div className={`section-content ${activeSection === 3 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <label>Certification: <input type="text" defaultValue="React.js Certification" /></label>
                            <label>Date of Completion: <input type="text" defaultValue="January 2023" /></label>
                            <label>Issuing Organization: <input type="text" defaultValue="XYZ Certification Center" /></label>
                        </div>
                    ) : (
                        <div>
                            <p>React.js Certification</p>
                            <p>Date of Completion: January 2023</p>
                            <p>Issuing Organization: XYZ Certification Center</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section academic-records ${activeSection === 4 ? 'active' : ''}`} onClick={() => toggleSection(4)}>
                <h2>Academic Records</h2>
                <div className={`section-content ${activeSection === 4 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <p>List of Courses Completed:</p>
                            <ul>
                                <li>Course 1: <input type="text" defaultValue="A" /></li>
                                <li>Course 2: <input type="text" defaultValue="B+" /></li>
                                <li>Course 3: <input type="text" defaultValue="A-" /></li>
                            </ul>
                            <label>Transcripts: <input type="text" defaultValue="Uploaded" /></label>
                            <label>Research Projects/Theses: <textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." /></label>
                        </div>
                    ) : (
                        <div>
                            <p>List of Courses Completed:</p>
                            <ul>
                                <li>Course 1: A</li>
                                <li>Course 2: B+</li>
                                <li>Course 3: A-</li>
                            </ul>
                            <p>Transcripts: Uploaded</p>
                            <p>Research Projects/Theses: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section portfolio ${activeSection === 5 ? 'active' : ''}`} onClick={() => toggleSection(5)}>
                <h2>Portfolio</h2>
                <div className={`section-content ${activeSection === 5 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <label>Showcase any projects, papers, or presentations you're proud of: <textarea defaultValue="" /></label>
                            <label>Provide links to online portfolios or repositories if available: <input type="text" defaultValue="" /></label>
                        </div>
                    ) : (
                        <div>
                            <p>Showcase any projects, papers, or presentations you're proud of</p>
                            <p>Provide links to online portfolios or repositories if available</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section extracurricular-activities ${activeSection === 6 ? 'active' : ''}`} onClick={() => toggleSection(6)}>
                <h2>Extracurricular Activities</h2>
                <div className={`section-content ${activeSection === 6 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <label>Sports Involvement: <input type="text" defaultValue="Soccer Team Captain" /></label>
                            <label>Clubs/Organizations: <input type="text" defaultValue="Debate Club Member" /></label>
                            <label>Volunteer Work: <input type="text" defaultValue="Local Community Clean-up" /></label>
                            <label>Leadership Roles: <input type="text" defaultValue="Class Representative" /></label>
                        </div>
                    ) : (
                        <div>
                            <p>Sports Involvement: Soccer Team Captain</p>
                            <p>Clubs/Organizations: Debate Club Member</p>
                            <p>Volunteer Work: Local Community Clean-up</p>
                            <p>Leadership Roles: Class Representative</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section work-experience ${activeSection === 7 ? 'active' : ''}`} onClick={() => toggleSection(7)}>
                <h2>Work Experience</h2>
                <div className={`section-content ${activeSection === 7 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <label>Internships: <input type="text" defaultValue="ABC Company (Summer 2022)" /></label>
                            <label>Part-time Jobs: <input type="text" defaultValue="Retail Associate at XYZ Store" /></label>
                            <label>Relevant Work Experience: <textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." /></label>
                        </div>
                    ) : (
                        <div>
                            <p>Internships: ABC Company (Summer 2022)</p>
                            <p>Part-time Jobs: Retail Associate at XYZ Store</p>
                            <p>Relevant Work Experience: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={`section references ${activeSection === 8 ? 'active' : ''}`} onClick={() => toggleSection(8)}>
                <h2>References</h2>
                <div className={`section-content ${activeSection === 8 ? 'active' : ''}`}>
                    {isEditing ? (
                        <div>
                            <label>Contact information for academic or professional references: <input type="text" defaultValue="" /></label>
                        </div>
                    ) : (
                        <div>
                            <p>Contact information for academic or professional references</p>
                        </div>
                    )}
                </div>
            </section>

            <button onClick={exportAsPDF}>Export as PDF</button>




        </div>
    );
};

export default StudentProfile;

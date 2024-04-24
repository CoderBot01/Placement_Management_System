import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import BaseUrl from "./Constant.js";
import { getData, postData, deleteData } from './functions';

const StudentProfile = ({id}) => {
    // State for active section and editing mode
    const [activeSection, setActiveSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [students1, setStudents1] = useState([]);
    // State variables for personal information
    const [ID, setID] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    // State variables for academic achievements
    const [gpa, setGPA] = useState('');
    const [awards, setAwards] = useState('');
    const [scholarships, setScholarships] = useState('');
    const [extracurricularActivities, setExtracurricularActivities] = useState('');
    // State variables for skills
    const [technicalSkills, setTechnicalSkills] = useState('');
    const [softSkills, setSoftSkills] = useState('');
    const [languageProficiency, setLanguageProficiency] = useState('');
    // State variables for certifications
    const [certification, setCertification] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [issuingOrganization, setIssuingOrganization] = useState('');
    // State variables for academic records
    const [course1, setCourse1] = useState('');
    const [course1Grade, setCourse1Grade] = useState('');
    const [course2, setCourse2] = useState('');
    const [course2Grade, setCourse2Grade] = useState('');
    const [course3, setCourse3] = useState('');
    const [course3Grade, setCourse3Grade] = useState('');
    const [transcripts, setTranscripts] = useState('');
    const [researchProjects, setResearchProjects] = useState('');
    // State variables for portfolio
    const [portfolioProjects, setPortfolioProjects] = useState('');
    const [portfolioLinks, setPortfolioLinks] = useState('');
    // State variables for extracurricular activities
    const [sportsInvolvement, setSportsInvolvement] = useState('');
    const [clubs, setClubs] = useState('');
    const [volunteerWork, setVolunteerWork] = useState('');
    const [leadershipRoles, setLeadershipRoles] = useState('');
    // State variables for work experience
    const [internships, setInternships] = useState('');
    const [partTimeJobs, setPartTimeJobs] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    // State variable for references
    const [references, setReferences] = useState('');
    // Reference to the profile container
    const profileRef = useRef(null);

    // Function to toggle active section
    const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
    };

    // Function to toggle editing mode
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    // Function to handle input changes
    const handleInputChange = (setState, value) => {
        setState(value);
    };

    useEffect(() => {
        if (students1 && students1.length > 0) {
            setID(students1[0].student_id);
            setFullName(students1[0].name);
            setDateOfBirth(students1[0].dob);
            setEmail(students1[0].email);
            setPhone(students1[0].phone);
            setAddress(students1[0].address);
            setBio(students1[0].bio);
            setGPA(students1[0].cgpa);
            setAwards(students1[0].awards);
            setScholarships(students1[0].scholarships);
            setExtracurricularActivities(students1[0].extracurricular_activities);
            setTechnicalSkills(students1[0].technical_skills);
            setSoftSkills(students1[0].soft_skills);
            setLanguageProficiency(students1[0].language_proficiency);
            setCertification(students1[0].certification);
            setCompletionDate(students1[0].completion_date);
            setIssuingOrganization(students1[0].issuing_organization);
            setCourse1(students1[0].course1);
            setCourse1Grade(students1[0].course1_grade);
            setCourse2(students1[0].course2);
            setCourse2Grade(students1[0].course2_grade);
            setCourse3(students1[0].course3);
            setCourse3Grade(students1[0].course3_grade);
            setTranscripts(students1[0].transcripts);
            setResearchProjects(students1[0].research_projects);
            setPortfolioProjects(students1[0].portfolio_projects);
        } else {
            // Set ID to an empty string if students1 is empty
            setID('');
        }
    }, [students1]);

    useEffect(() => {
        const fetchStudents1 = async () => {
            try {
                const response = await getData(`/StudentInformation/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                console.log(data)
                setStudents1(data);
            } catch (error) {
                console.error('Error fetching students:', error);
                // Handle error
            }
        };

        fetchStudents1();
    }, [id]);

    useEffect(() => {
        console.log("Student name is:", students1.length > 0 ? students1[0].name : "No student data yet");
    }, [students1]);

    const addStudent1 = async () => {
        const newStudent1 = { ID, fullName, dateOfBirth, email, phone, address, bio, gpa, awards, scholarships, extracurricularActivities, technicalSkills, softSkills, languageProficiency, certification, completionDate, issuingOrganization, course1, course1Grade, course2, course2Grade, course3, course3Grade, transcripts, researchProjects, portfolioProjects, portfolioLinks, sportsInvolvement, clubs, volunteerWork, leadershipRoles, internships, partTimeJobs, workExperience, references };

        try {
            const addResponse = await postData('/StudentInformation', newStudent1);
            if (!addResponse.ok) {
                throw new Error('Failed to add StudentInformation');
            }

            setStudents1();

            setID('');
            setFullName('');
            setDateOfBirth('');
            setEmail('');
            setPhone('');
            setAddress('');
            setBio('');
            setGPA('');
            setAwards('');
            setScholarships('');
            setExtracurricularActivities('');
            setTechnicalSkills('');
            setSoftSkills('');
            setLanguageProficiency('');
            setCertification('');
            setCompletionDate('');
            setIssuingOrganization('');
            setCourse1('');
            setCourse1Grade('');
            setCourse2('');
            setCourse2Grade('');
            setCourse3('');
            setCourse3Grade('');
            setTranscripts('');
            setResearchProjects('');
            setPortfolioProjects('');
            setPortfolioLinks('');
            setSportsInvolvement('');
            setClubs('');
            setVolunteerWork('');
            setLeadershipRoles('');
            setInternships('');
            setPartTimeJobs('');
            setWorkExperience('');
            setReferences('');
        } catch (error) {
            console.error('Error adding student:', error);
            // Handle error
        }
    };

    // Function to export profile as PDF
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
            pdf.text(`Name: ${fullName}`, 10, imgHeight + 20);
            pdf.text(`Date of Birth: ${dateOfBirth}`, 10, imgHeight + 30);
            pdf.text(`Email: ${email}`, 10, imgHeight + 40);

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
            <button onClick={isEditing ? addStudent1 : toggleEditing}>
                {isEditing ? 'Save Changes' : 'Edit'}
            </button>

            {/* Personal Information Section */}
            <section className={`section personal-info ${activeSection === 0 ? 'active' : ''}`} onClick={() => toggleSection(0)}>
                <div className="card">
                    <div className="card-header">
                        <h2>Personal Information</h2>
                    </div>
                    <div className="card-body">
                        {isEditing ? (
                            <div>
                                <input type="text" className="form-control" placeholder="Student ID" value={ID} onChange={(e) => setID(e.target.value)} />
                                <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                <input type="date" className="form-control" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" className="form-control" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <textarea className="form-control" placeholder="Brief Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                        ) : (
                            <div>
                                <p>StudentID: {ID}</p>
                                <p>Full Name: {fullName}</p>
                                <p>Date of Birth: {dateOfBirth}</p>
                                <p>Contact Information: {email} | {phone} | {address}</p>
                                <p>Brief Bio: {bio}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            
<section className={`section skills ${activeSection === 1 ? 'active' : ''}`} onClick={() => toggleSection(1)}>
    <div className="card">
        <div className="card-header">
            <h2>Skills</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <input type="text" className="form-control" placeholder="Technical Skills" value={technicalSkills} onChange={(e) => setTechnicalSkills(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Soft Skills" value={softSkills} onChange={(e) => setSoftSkills(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Language Proficiency" value={languageProficiency} onChange={(e) => setLanguageProficiency(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Technical Skills: {technicalSkills}</p>
                    <p>Soft Skills: {softSkills}</p>
                    <p>Language Proficiency: {languageProficiency}</p>
                </div>
            )}
        </div>
    </div>
</section>


<section className={`section certifications ${activeSection === 2 ? 'active' : ''}`} onClick={() => toggleSection(2)}>
    <div className="card">
        <div className="card-header">
            <h2>Certifications</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <input type="text" className="form-control" placeholder="Certification" value={certification} onChange={(e) => setCertification(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Date of Completion" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Issuing Organization" value={issuingOrganization} onChange={(e) => setIssuingOrganization(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Certification: {certification}</p>
                    <p>Date of Completion: {completionDate}</p>
                    <p>Issuing Organization: {issuingOrganization}</p>
                </div>
            )}
        </div>
    </div>
</section>


<section className={`section academic-records ${activeSection === 3 ? 'active' : ''}`} onClick={() => toggleSection(3)}>
    <div className="card">
        <div className="card-header">
            <h2>Academic Records</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <input type="text" className="form-control" placeholder="Course 1" value={course1} onChange={(e) => setCourse1(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Grade" value={course1Grade} onChange={(e) => setCourse1Grade(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Course 2" value={course2} onChange={(e) => setCourse2(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Grade" value={course2Grade} onChange={(e) => setCourse2Grade(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Course 3" value={course3} onChange={(e) => setCourse3(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Grade" value={course3Grade} onChange={(e) => setCourse3Grade(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Transcripts" value={transcripts} onChange={(e) => setTranscripts(e.target.value)} />
                    <textarea className="form-control" placeholder="Research Projects/Theses" value={researchProjects} onChange={(e) => setResearchProjects(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Course 1: {course1} - Grade: {course1Grade}</p>
                    <p>Course 2: {course2} - Grade: {course2Grade}</p>
                    <p>Course 3: {course3} - Grade: {course3Grade}</p>
                    <p>Transcripts: {transcripts}</p>
                    <p>Research Projects/Theses: {researchProjects}</p>
                </div>
            )}
        </div>
    </div>
</section>


<section className={`section portfolio ${activeSection === 4 ? 'active' : ''}`} onClick={() => toggleSection(4)}>
    <div className="card">
        <div className="card-header">
            <h2>Portfolio</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <textarea className="form-control" placeholder="Projects, Papers, or Presentations" value={portfolioProjects} onChange={(e) => setPortfolioProjects(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Links to Online Portfolios or Repositories" value={portfolioLinks} onChange={(e) => setPortfolioLinks(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Projects, Papers, or Presentations: {portfolioProjects}</p>
                    <p>Links to Online Portfolios or Repositories: {portfolioLinks}</p>
                </div>
            )}
        </div>
    </div>
</section>


<section className={`section extracurricular-activities ${activeSection === 5 ? 'active' : ''}`} onClick={() => toggleSection(5)}>
    <div className="card">
        <div className="card-header">
            <h2>Extracurricular Activities</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <input type="text" className="form-control" placeholder="Sports Involvement" value={sportsInvolvement} onChange={(e) => setSportsInvolvement(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Clubs/Organizations" value={clubs} onChange={(e) => setClubs(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Volunteer Work" value={volunteerWork} onChange={(e) => setVolunteerWork(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Leadership Roles" value={leadershipRoles} onChange={(e) => setLeadershipRoles(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Sports Involvement: {sportsInvolvement}</p>
                    <p>Clubs/Organizations: {clubs}</p>
                    <p>Volunteer Work: {volunteerWork}</p>
                    <p>Leadership Roles: {leadershipRoles}</p>
                </div>
            )}
        </div>
    </div>
</section>


<section className={`section work-experience ${activeSection === 6 ? 'active' : ''}`} onClick={() => toggleSection(6)}>
    <div className="card">
        <div className="card-header">
            <h2>Work Experience</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <input type="text" className="form-control" placeholder="Internships" value={internships} onChange={(e) => setInternships(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Part-time Jobs" value={partTimeJobs} onChange={(e) => setPartTimeJobs(e.target.value)} />
                    <textarea className="form-control" placeholder="Relevant Work Experience" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Internships: {internships}</p>
                    <p>Part-time Jobs: {partTimeJobs}</p>
                    <p>Relevant Work Experience: {workExperience}</p>
                </div>
            )}
        </div>
    </div>
</section>

<section className={`section references ${activeSection === 7 ? 'active' : ''}`} onClick={() => toggleSection(7)}>
    <div className="card">
        <div className="card-header">
            <h2>References</h2>
        </div>
        <div className="card-body">
            {isEditing ? (
                <div>
                    <input type="text" className="form-control" placeholder="Contact Information for References" value={references} onChange={(e) => setReferences(e.target.value)} />
                </div>
            ) : (
                <div>
                    <p>Contact Information for References: {references}</p>
                </div>
            )}
        </div>
    </div>
</section>

            <button onClick={exportAsPDF}>Export as PDF</button>
        </div>
    );
};

export default StudentProfile;

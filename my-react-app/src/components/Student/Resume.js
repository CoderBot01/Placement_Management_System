import React, { useState, useRef } from 'react';
import './Resume.css'; // Import your CSS file
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Resume() {
  // Define state for dynamic content
  const [ID, setID] = useState('');
  const [students1, setStudents1] = useState([]);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [gpa, setGPA] = useState('');
  const [awards, setAwards] = useState('');
  const [scholarships, setScholarships] = useState('');
  const [extracurricularActivities, setExtracurricularActivities] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [languageProficiency, setLanguageProficiency] = useState('');
  const [certification, setCertification] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [issuingOrganization, setIssuingOrganization] = useState('');
  const [course1, setCourse1] = useState('');
  const [course1Grade, setCourse1Grade] = useState('');
  const [course2, setCourse2] = useState('');
  const [course2Grade, setCourse2Grade] = useState('');
  const [course3, setCourse3] = useState('');
  const [course3Grade, setCourse3Grade] = useState('');
  const [transcripts, setTranscripts] = useState('');
  const [researchProjects, setResearchProjects] = useState('');
  const [portfolioProjects, setPortfolioProjects] = useState('');
  const [portfolioLinks, setPortfolioLinks] = useState('');
  const [sportsInvolvement, setSportsInvolvement] = useState('');
  const [clubs, setClubs] = useState('');
  const [volunteerWork, setVolunteerWork] = useState('');
  const [leadershipRoles, setLeadershipRoles] = useState('');
  const [internships, setInternships] = useState('');
  const [partTimeJobs, setPartTimeJobs] = useState('');
  const [workExperience, setWorkExperience] = useState('');

  const contactInfo = {
    phone: phone,
    email: email
  };

  const educationDetails = [
    {
      institution: '',
      degree: ''
    }
  ];

  const experienceDetails = [
    {
      company: '',
      position: '',
      responsibilities: ['']
    }
  ];

  const skills = [''];

  const certifications = [''];

  // Function to download resume
  const resumeContentRef = useRef(null);

  // Function to download resume as PDF
  const downloadResume = () => {
    if (!resumeContentRef.current) {
      console.error("Resume content element not found.");
      return;
    }

    html2canvas(resumeContentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save('resume.pdf');
    });
  };


  return (
    <div>
      <header className="header">
        <h1>{fullName}</h1>
        <p className="contact-info">{contactInfo.phone} | {contactInfo.email}</p>
      </header>
      <main className="content" ref={resumeContentRef}>
        <h2 className="section-title">Summary</h2>
        <p>{bio}</p>
        <h2 className="section-title">Education</h2>
        <div className="education">
          {educationDetails.map((edu, index) => (
            <div key={index}>
              <h3>{edu.institution}</h3>
              <p>{edu.degree}</p>
            </div>
          ))}
        </div>
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience">
          {experienceDetails.map((exp, index) => (
            <div key={index}>
              <h3>{exp.company}</h3>
              <h4>{exp.position}</h4>
              <ul>
                {exp.responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h2 className="section-title">Skills</h2>
        <ul className="skills">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <h2 className="section-title">Certifications</h2>
        <ul className="certifications">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </main>
      {/* Download button */}
      <div className="download-button">
        <button onClick={downloadResume}>Download Resume</button>
      </div>
    </div>
  );
}

export default Resume;

import React from 'react';
import './Resume.css'; // Import your CSS file

function Resume() {
  // Define state for dynamic content
  const contactInfo = {
    phone: '(+___) ___-____',
    email: 'youremail@domain.com'
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

  return (
    <div>
      <header className="header">
        <h1>Your Name</h1>
        <p className="contact-info">{contactInfo.phone} | {contactInfo.email}</p>
      </header>
      <main className="content">
        <h2 className="section-title">Summary</h2>
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
    </div>
  );
}

export default Resume;

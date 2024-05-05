// StudentForm.js
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Resume() {
  const [formData, setFormData] = useState({
    student_id: '',
    dob: '',
    name: '',
    email: '',
    department: '',
    phone: '',
    address: '',
    password: '',
    bio: '',
    cgpa: '',
    awards: '',
    scholarships: '',
    extracurricularActivities: '',
    technicalSkills: '',
    softSkills: '',
    languageProficiency: '',
    certification: '',
    completionDate: '',
    issuingOrganization: '',
    course1: '',
    course1Grade: '',
    course2: '',
    course2Grade: '',
    course3: '',
    course3Grade: '',
    transcripts: '',
    researchProjects: '',
    portfolioProjects: '',
    portfolioLinks: '',
    sportsInvolvement: '',
    clubs: '',
    volunteerWork: '',
    leadershipRoles: '',
    internships: '',
    partTimeJobs: '',
    workExperience: '',
    student_references: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = () => {
    html2canvas(document.getElementById('form-container')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('student_data.pdf');
    });
  };

  return (
    <div id="form-container">
      <form>
        <div className="form-group">
          <label htmlFor="student_id">Student ID:</label>
          <input type="text" id="student_id" name="student_id" value={formData.student_id} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        {/* Add other form fields */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cgpa">CGPA:</label>
          <input type="text" id="cgpa" name="cgpa" value={formData.cgpa} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="awards">Awards:</label>
          <input type="text" id="awards" name="awards" value={formData.awards} onChange={handleChange} />
        </div>
        {/* Add more fields as needed */}
        <div className="form-group">
          <label htmlFor="scholarships">Scholarships:</label>
          <input type="text" id="scholarships" name="scholarships" value={formData.scholarships} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="extracurricularActivities">Extracurricular Activities:</label>
          <input type="text" id="extracurricularActivities" name="extracurricularActivities" value={formData.extracurricularActivities} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="technicalSkills">Technical Skills:</label>
          <input type="text" id="technicalSkills" name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="softSkills">Soft Skills:</label>
          <input type="text" id="softSkills" name="softSkills" value={formData.softSkills} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="languageProficiency">Language Proficiency:</label>
          <input type="text" id="languageProficiency" name="languageProficiency" value={formData.languageProficiency} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="certification">Certification:</label>
          <input type="text" id="certification" name="certification" value={formData.certification} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="completionDate">Completion Date:</label>
          <input type="date" id="completionDate" name="completionDate" value={formData.completionDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="issuingOrganization">Issuing Organization:</label>
          <input type="text" id="issuingOrganization" name="issuingOrganization" value={formData.issuingOrganization} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course1">Course 1:</label>
          <input type="text" id="course1" name="course1" value={formData.course1} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course1Grade">Course 1 Grade:</label>
          <input type="text" id="course1Grade" name="course1Grade" value={formData.course1Grade} onChange={handleChange} />
        </div>
        {/* Add more fields as needed */}
        <div className="form-group">
          <label htmlFor="course2">Course 2:</label>
          <input type="text" id="course2" name="course2" value={formData.course2} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course2Grade">Course 2 Grade:</label>
          <input type="text" id="course2Grade" name="course2Grade" value={formData.course2Grade} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course3">Course 3:</label>
          <input type="text" id="course3" name="course3" value={formData.course3} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course3Grade">Course 3 Grade:</label>
          <input type="text" id="course3Grade" name="course3Grade" value={formData.course3Grade} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="transcripts">Transcripts:</label>
          <input type="file" id="transcripts" name="transcripts" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="researchProjects">Research Projects:</label>
          <input type="text" id="researchProjects" name="researchProjects" value={formData.researchProjects} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="portfolioProjects">Portfolio Projects:</label>
          <input type="text" id="portfolioProjects" name="portfolioProjects" value={formData.portfolioProjects} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="portfolioLinks">Portfolio Links:</label>
          <input type="text" id="portfolioLinks" name="portfolioLinks" value={formData.portfolioLinks} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sportsInvolvement">Sports Involvement:</label>
          <input type="text" id="sportsInvolvement" name="sportsInvolvement" value={formData.sportsInvolvement} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="clubs">Clubs:</label>
          <input type="text" id="clubs" name="clubs" value={formData.clubs} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="volunteerWork">Volunteer Work:</label>
          <input type="text" id="volunteerWork" name="volunteerWork" value={formData.volunteerWork} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="leadershipRoles">Leadership Roles:</label>
          <input type="text" id="leadershipRoles" name="leadershipRoles" value={formData.leadershipRoles} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="internships">Internships:</label>
          <input type="text" id="internships" name="internships" value={formData.internships} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="partTimeJobs">Part-Time Jobs:</label>
          <input type="text" id="partTimeJobs" name="partTimeJobs" value={formData.partTimeJobs} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="workExperience">Work Experience:</label>
          <input type="text" id="workExperience" name="workExperience" value={formData.workExperience} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="student_references">Student References:</label>
          <input type="text" id="student_references" name="student_references" value={formData.student_references} onChange={handleChange} />
        </div>
        {/* Add more fields as needed */}

        <button type="button" onClick={handleDownload}>Download as PDF</button>
      </form>
    </div>
  );
}

export default Resume;

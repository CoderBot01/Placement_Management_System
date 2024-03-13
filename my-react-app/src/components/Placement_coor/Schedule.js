import React, { useState } from 'react';

function InterviewScheduler() {
  const [formData, setFormData] = useState({
    studentName: '',
    companyName: '',
    interviewTitle: '',
    interviewSession: '',
    link: '', // Renamed from updatedLink to match formData property
  });

  const [interviewLink, setInterviewLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'link') { // Only update interviewLink when 'link' field changes
      setInterviewLink(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Display confirmation message
    alert(JSON.stringify(formData, null, 2));
    // You can use any other method to display confirmation message, like modal, toast, etc.
  };

  return (
    <div>
      <h2>Schedule Interview</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentName">Student Name</label>
          <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="interviewTitle">Interview Title</label>
          <input type="text" id="interviewTitle" name="interviewTitle" value={formData.interviewTitle} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="link">Update Link</label>
          <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="interviewSession">Interview Session</label>
          <input type="datetime-local" id="interviewSession" name="interviewSession" value={formData.interviewSession} onChange={handleChange} required />
        </div>
       
        <div>
          <button type="submit">Schedule Interview</button>
        </div>
      </form>
      {interviewLink && (
        <div>
          Interview Link: <a href={interviewLink} target="_blank">{interviewLink}</a>
        </div>
      )}
    </div>
  );
}

export default InterviewScheduler;

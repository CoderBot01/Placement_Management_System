import React, { useState } from 'react';

function JobPostingForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the job posting data to your backend or perform any other necessary actions
    console.log('Job Title:', jobTitle);
    console.log('Job Description:', jobDescription);
    console.log('Job Location:', jobLocation);
    // Reset the form after submission
    setJobTitle('');
    setJobDescription('');
    setJobLocation('');
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Job Title:
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Job Description:
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Job Location:
            <input
              type="text"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JobPostingForm;

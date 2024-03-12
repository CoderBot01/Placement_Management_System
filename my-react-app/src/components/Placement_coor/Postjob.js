import React, { useState } from 'react';
import "./job.css";

function JobPostingForm() {
    const [jobs, setJobs] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyInfo,setCompanyInfo] = useState('');
    const [salary,setSalary] = useState('');
    const [searchedJobs, setSearchedJobs] = useState([]);




    const handlePostJob = (event) => {
        event.preventDefault();
        const newJob = {
            id: Date.now(), // You can generate a unique ID using any preferred method
            title: jobTitle,
            description: jobDescription
        };
        setJobs([...jobs, newJob]);
        setJobTitle('');
        setJobDescription('');
        setCompanyInfo('');
        setSalary('');
    };

    const handleDeleteJob = (jobId) => {
        const updatedJobs = jobs.filter(job => job.id !== jobId);
        setJobs(updatedJobs);
    };

    const addjobs = async () => {
      const newJob = { id, job_title, job_description, company_info, salary };

      // Check if the studentId already exists
      const isExistingJob = jobs.some(job => job.jobId === jobId);
      if (isExistingJob) {
          setAlertMessage('Student with the same ID already exists!');
          return; // Exit function
      } else {
          setAlertMessage(''); // Clear any existing alert
      }

      try {
          // Make a POST request to add the new student
          const addResponse = await fetch('http://localhost:3000/jobs', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newJob),
          });

          if (!addResponse.ok) {
              throw new Error('Failed to add Job');
          }

          // Assuming the response body contains the added student data
          const addedjobs = await addResponse.json();

          // Make a GET request to fetch the updated list of students
          const getResponse = await fetch('http://localhost:3000/jobs');
          if (!getResponse.ok) {
              throw new Error('Failed to fetch jobs');
          }

          const updatedJobs = await getResponse.json();

          // Update state with the updated list of students
          setJobs(updatedJobs);
          setSearchedJobs([...searchedJobs, addedjobs]); // Automatically add to displayed list
          // Clear input fields

      } catch (error) {
          console.error('Error adding student:', error);
          // Handle error
      }
  };


    return (
        <div>
            <h1>Job Management System</h1>
            <h2>Post a Job</h2>
            <form onSubmit={handlePostJob}>
                <label htmlFor="jobTitle">Job Title:</label><br />
                <input type="text" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required /><br />
                <label htmlFor="jobDescription">Job Description:</label><br />
                <textarea id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required></textarea><br />
                <label htmlFor="companyinfo">Company Information:</label><br />
                <textarea id="companyinfo" value={companyInfo} onChange={(e) => setCompanyInfo(e.target.value)} required></textarea><br />
                <label htmlFor="salary">Salary:</label><br />
                <textarea id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required></textarea><br />
                <button type="submit">Post Job</button>
            </form>

            <h2>Posted Jobs</h2>
            {jobs.map(job => (
                <div key={job.id} className="job">
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default JobPostingForm;

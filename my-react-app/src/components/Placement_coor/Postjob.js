import React, { useState } from 'react';
import "./job.css";

function JobPostingForm() {
    const [jobs, setJobs] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyInfo,setCompanyInfo] = useState('');
    const [salary,setSalary] = useState('');

    const addJob = async (event) => {
        event.preventDefault(); // Prevent form submission

        const newJob = { jobTitle, jobDescription, companyInfo, salary };

        try {
            // Make a POST request to add the new job
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

            // Assuming the response body contains the added job data
            const addedJob = await addResponse.json();

            // Update state with the newly added job
            setJobs([...jobs, addedJob]);
            // Clear input fields
            setJobTitle('');
            setJobDescription('');
            setCompanyInfo('');
            setSalary('');
        } catch (error) {
            console.error('Error adding job:', error);
            // Handle error
        }
    };

    const handleDeleteJob = (jobId) => {
        const updatedJobs = jobs.filter(job => job.id !== jobId);
        setJobs(updatedJobs);
    };
    

    return (
        <div>
            <h1>Job Management System</h1>
            <h2>Post a Job</h2>
            <form onSubmit={addJob}>
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

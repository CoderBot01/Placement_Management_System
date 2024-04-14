import React, { useState, useEffect } from 'react';
import "./job.css";
import { getData } from './functions';

function JobPostingForm() {
    const [jobs, setJobs] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [companyInfo, setCompanyInfo] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await getData('/jobs');
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            setJobs(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const addJob = async (event) => {
        event.preventDefault(); // Prevent form submission

        const newJob = { jobTitle, jobDescription, companyInfo, salary };

        try {
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

            await fetchJobs();

            setJobTitle('');
            setJobDescription('');
            setCompanyInfo('');
            setSalary('');
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            const deleteResponse = await fetch(`http://localhost:3000/jobs/${jobId}`, {
                method: 'DELETE',
            });
            if (!deleteResponse.ok) {
                throw new Error('Failed to delete job');
            }
            await fetchJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleRefreshJobs = async () => {
        await fetchJobs();
    };

    return (
        <div>
            <h1>Job Management System</h1>
            <h2 align="center">Post a Job</h2>
            <form onSubmit={addJob}>
                <label htmlFor="jobTitle">Job Title:</label><br />
                <input type="text" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required /><br />
                <label htmlFor="jobDescription">Job Description:</label><br />
                <textarea id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required></textarea><br />
                <label htmlFor="companyInfo">Company Information:</label><br />
                <textarea id="companyInfo" value={companyInfo} onChange={(e) => setCompanyInfo(e.target.value)} required></textarea><br />
                <label htmlFor="salary">Salary:</label><br />
                <input type="text" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required /><br />
                <button type="submit">Post Job</button>
            </form>

            <h2>Posted Jobs</h2>
            <button onClick={handleRefreshJobs}>Refresh Jobs</button>
            {jobs.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Job Description</th>
                            <th>Company Information</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job.id}>
                                <td>{job.job_title}</td>
                                <td>{job.job_description}</td>
                                <td>{job.company_info}</td>
                                <td>{job.salary}</td>
                                <td><button onClick={() => handleDeleteJob(job.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    );
}

export default JobPostingForm;

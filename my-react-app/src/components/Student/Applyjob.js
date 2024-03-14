import React, { useState, useEffect } from 'react';

class ApplyForJobPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };
    }

    componentDidMount() {
        this.fetchJobs();
    }

    fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:3000/jobs');
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            this.setState({ jobs: data });
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    applyForJob = (jobId) => {
        const job = this.state.jobs.find(job => job.id === jobId);
        if (job) {
            alert("You have applied for the position of " + job.job_title);
        } else {
            console.error("Job not found");
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Available Jobs</h1>
                <ul className="job-list">
                    {this.state.jobs.map((job) => (
                        <li className="job-item" key={job.id}>
                            <div className="job-title">{job.job_title} at {job.company}</div>
                            <div className="job-info">
                                <div><strong>Salary:</strong> {job.salary}</div>
                                <div><strong>Eligibility:</strong> {job.eligibility}</div>
                            </div>
                            <div className="job-description">{job.description}</div>
                            <button onClick={() => this.applyForJob(job.id)}>Apply</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ApplyForJobPage;

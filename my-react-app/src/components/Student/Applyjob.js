import React, { useState } from 'react';



class ApplyForJobPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                { 
                    company: "ABC Inc.",
                    position: "Software Developer",
                    salary: "$70,000 - $90,000",
                    eligibility: "Bachelor's degree in Computer Science or related field",
                    description: "We are seeking a skilled software developer to join our team..."
                },
                { 
                    company: "XYZ Corporation",
                    position: "Marketing Intern",
                    salary: "Unpaid",
                    eligibility: "Currently enrolled in a college or university program",
                    description: "We are looking for a marketing intern to assist our marketing team..."
                }
                // Add more job listings as needed
            ]
        };
    }

    applyForJob = (jobTitle) => {
        // You can customize this function to perform actions when applying for a job, such as displaying a form, etc.
        alert("You have applied for the position of " + jobTitle);
    }

    render() {
        return (
            <div className="container">
                <h1>Available Jobs</h1>
                <ul className="job-list">
                    {this.state.jobs.map((job, index) => (
                        <li className="job-item" key={index}>
                            <div className="job-title">{job.position} at {job.company}</div>
                            <div className="job-info">
                                <div><strong>Salary:</strong> {job.salary}</div>
                                <div><strong>Eligibility:</strong> {job.eligibility}</div>
                            </div>
                            <div className="job-description">{job.description}</div>
                            <button onClick={() => this.applyForJob(job.position)}>Apply</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ApplyForJobPage;

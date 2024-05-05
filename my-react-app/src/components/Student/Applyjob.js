import React, { useState, useEffect } from 'react';
import { getData, postData, deleteData } from './functions';
import "./Train.css";

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
            const response = await getData('/jobs')
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
                <h1 className="mt-4 mb-4 text-black">Available Jobs</h1>
                <div className="table-responsive">
                    {this.state.jobs.map((job, index) => (
                        <table key={index} className="table table-striped table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                    <th colSpan="2">{job.job_title} at {job.company_info}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Salary:</strong></td>
                                    <td>{job.salary} </td>
                                </tr>
                                <tr>
                                    <td><strong>Description:</strong></td>
                                    <td>{job.job_description}</td>
                                </tr>
                             
                                <tr>
                                    <td colSpan="2">
                                        <button className="btn btn-primary" onClick={() => this.applyForJob(job.id)}>Register</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        );
    }
}
       

export default ApplyForJobPage;

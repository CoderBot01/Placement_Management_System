import React, { useState, useEffect } from 'react';
import { getData, postData, deleteData } from './functions';

class InterviewAt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchInterviews();
    }

    fetchInterviews = async () => {
        try {
            const response = await getData('/interviews');
            if (!response.ok) {
                throw new Error('Failed to fetch interviews');
            }
            const data = await response.json();
            this.setState({ interviews: data, loading: false });
        } catch (error) {
            console.error('Error fetching interviews:', error);
            this.setState({ error: error.message, loading: false });
        }
    };

    applyForInterview = (id) => {
        const interview = this.state.interviews.find(interview => interview.id === id);
        if (interview) {
            alert("You have applied for the interview for " + interview.interview_title + " at " + interview.company_name);
        } else {
            console.error("Interview not found");
        }
    }

    render() {
        const { interviews, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className="container">
                <h1 className="mt-4 mb-4 text-black">Available Interviews</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Interview Title</th>
                                <th>Company Name</th>
                                <th>Student Name</th>
                                <th>Interview Session</th>
                                <th>Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map((interview) => (
                                <InterviewRow
                                    key={interview.id}
                                    interview={interview}
                                    applyForInterview={this.applyForInterview}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const InterviewRow = ({ interview, applyForInterview }) => (
    <tr>
        <td>{interview.interview_title}</td>
        <td>{interview.company_name}</td>
        <td>{interview.student_name}</td>
        <td>{interview.interview_session}</td>
        <td><a href={interview.link}>{interview.link}</a></td>
        <td><button className="btn btn-primary" onClick={() => applyForInterview(interview.id)}>Apply</button></td>
    </tr>
);

export default InterviewAt;

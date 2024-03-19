import React, { useState, useEffect } from 'react';
import "./Interview.css"

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
            const response = await fetch('http://localhost:3000/Interviews');
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
            alert("You have applied for the interview for " + interview.interviewTitle + " at " + interview.companyName);
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
                <h1>Available Interviews</h1>
                <div className="interview-column">
                    {interviews.map((interview) => (
                        <InterviewColumn
                            key={interview.id}
                            interview={interview}
                            applyForInterview={this.applyForInterview}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const InterviewColumn = ({ interview, applyForInterview }) => (
    <div className="interview-item">
        <div><strong>Interview Title:</strong> {interview.interviewTitle}</div>
        <div><strong>Company Name:</strong> {interview.companyName}</div>
        <div><strong>Student Name:</strong> {interview.studentName}</div>
        <div><strong>Interview Session:</strong> {interview.interviewSession}</div>
        <div><strong>Link:</strong> {interview.link}</div>
        <button onClick={() => applyForInterview(interview.id)}>Apply</button>
    </div>
);

export default InterviewAt;

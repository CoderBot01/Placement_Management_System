import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/Interviews';

function InterviewScheduler() {
    const [interviews, setInterviews] = useState([]);
    const [formData, setFormData] = useState({
        studentName: '',
        companyName: '',
        interviewTitle: '',
        interviewSession: '',
        link: ''
    });
    const [loading, setLoading] = useState(false);
    const { studentName, companyName, interviewTitle, interviewSession, link } = formData;

    useEffect(() => {
        fetchStudentInterviews();
    }, []);

    const fetchStudentInterviews = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch student interviews');
            }
            const data = await response.json();
            setInterviews(data);
        } catch (error) {
            console.error('Error fetching student interviews:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addStudentInterview = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add student interview');
            }

            await fetchStudentInterviews();
            resetForm();
        } catch (error) {
            console.error('Error adding student interview:', error.message);
        }
    };

    const handleDeleteInterview = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete student interview');
            }
            await fetchStudentInterviews();
        } catch (error) {
            console.error('Error deleting student interview:', error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            studentName: '',
            companyName: '',
            interviewTitle: '',
            interviewSession: '',
            link: ''
        });
    };

    return (
        <div>
            <h1>Student Interview Management System</h1>
            <h2 align="center">Schedule Student Interview</h2>
            <form onSubmit={addStudentInterview}>
                <label htmlFor="studentName">Student Name:</label><br />
                <input type="text" id="studentName" value={studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} required /><br />
                <label htmlFor="companyName">Company Name:</label><br />
                <input type="text" id="companyName" value={companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required /><br />
                <label htmlFor="interviewType">Interview Type:</label><br />
                <select id="interviewType" value={interviewTitle} onChange={(e) => setFormData({ ...formData, interviewTitle: e.target.value })} required>
                    <option value="">Select an interview type</option>
                    <option value="Aptitude Round">Aptitude Round</option>
                    <option value="Technical Round">Technical Round</option>
                    <option value="HR Round">HR Round</option>
                    <option value="Communication Round">Communication Round</option>
                    <option value="On-spot Articulation Round">On-spot Articulation Round</option>
                </select><br />

                <label htmlFor="interviewSession">Interview Session:</label><br />
                <input type="datetime-local" id="interviewSession" value={interviewSession} onChange={(e) => setFormData({ ...formData, interviewSession: e.target.value })} required /><br />
                <label htmlFor="link">Link:</label><br />
                <input type="text" id="link" value={link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} required /><br />
                <button type="submit">Schedule Interview</button>
            </form>

            <h2>Student Interviews</h2>
            <button onClick={fetchStudentInterviews}>Refresh Interviews</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                interviews.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Company Name</th>
                                <th>Interview Title</th>
                                <th>Interview Session</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map(interview => (
                                <tr key={interview.id}>
                                    <td>{interview.studentname}</td>
                                    <td>{interview.studentname}</td>
                                    <td>{interview.interviewtitle}</td>
                                    <td>{interview.interviewsession}</td>
                                    <td>{interview.link}</td>
                                    <td><button onClick={() => handleDeleteInterview(interview.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No interviews found.</p>
                )
            )}
        </div>
    );
}

export default InterviewScheduler;

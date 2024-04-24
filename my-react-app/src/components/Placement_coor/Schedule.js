import React, { useState, useEffect } from 'react';
import { getData, postData, deleteData } from './functions';



function InterviewScheduler() {
    const [interviews, setInterviews] = useState([]);
    const [formData, setFormData] = useState({
        student_id: '',
        student_name: '',
        company_name: '',
        interview_title: '',
        interview_session: '',
        link: ''
    });
    const [loading, setLoading] = useState(false);
    const { student_id, student_name, company_name, interview_title, interview_session, link } = formData;

    useEffect(() => {
        fetchStudentInterviews();
    }, []);

    const fetchStudentInterviews = async () => {
        setLoading(true);
        try {
            const response = await getData('/interviews');
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
            const response = await postData('/interviews', formData);
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
            const response = await deleteData(`/interviews/${id}`);
            await fetchStudentInterviews();
        } catch (error) {
            console.error('Error deleting student interview:', error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            student_id: '',
            student_name: '',
            company_name: '',
            interview_title: '',
            interview_session: '',
            link: ''
        });
    };

    return (
        <div>
            <h1>Student Interview Management System</h1>
            <h2 align="center">Schedule Student Interview</h2>
            <form onSubmit={addStudentInterview}>
            <label htmlFor="id">ID:</label><br />
                <input type="text" id="id" value={student_id} onChange={(e) => setFormData({ ...formData, student_id: e.target.value })} required /><br />
                <label htmlFor="student_name">Student Name:</label><br />
                <input type="text" id="student_name" value={student_name} onChange={(e) => setFormData({ ...formData, student_name: e.target.value })} required /><br />
                <label htmlFor="company_name">Company Name:</label><br />
                <input type="text" id="company_name" value={company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} required /><br />
                <label htmlFor="interviewType">Interview Type:</label><br />
                <select id="interviewType" value={interview_title} onChange={(e) => setFormData({ ...formData, interview_title: e.target.value })} required>
                    <option value="">Select an interview type</option>
                    <option value="Aptitude Round">Aptitude Round</option>
                    <option value="Technical Round">Technical Round</option>
                    <option value="HR Round">HR Round</option>
                    <option value="Communication Round">Communication Round</option>
                    <option value="On-spot Articulation Round">On-spot Articulation Round</option>
                </select><br />

                <label htmlFor="interview_session">Interview Session:</label><br />
                <input type="datetime-local" id="interview_session" value={interview_session} onChange={(e) => setFormData({ ...formData, interview_session: e.target.value })} required /><br />
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
                                    <td>{interview.student_name}</td>
                                    <td>{interview.interview_title}</td>
                                    <td>{interview.interview_session}</td>
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

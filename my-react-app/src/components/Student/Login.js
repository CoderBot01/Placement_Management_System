import React, { useState, useEffect } from 'react';
import './Login.css'; // Import CSS for custom styling
import LoginImage from "./Login.jpg"; // Make sure to import the image correctly
import BaseUrl from './Constant';
import StudentDashboard from './StudentDashboard'; // Import the Student Dashboard component

function LoginPage() {
    const [student_id, setStudent_id] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false); // State to manage authentication

    // Check for authentication status in local storage on component mount
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        setAuthenticated(isAuthenticated);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page refresh

        try {
            const response = await fetch(`${BaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ student_id: student_id, dob: dob })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Handle successful login
            localStorage.setItem('token', data.token); // Store token in local storage
            setAuthenticated(true); // Set authenticated to true
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error.message);
        }
    };

    // Render StudentDashboard if authenticated
    if (authenticated) {
        return <StudentDashboard id={student_id} />;
    }

    return (
        <div className="login-container position-relative">
            <img src={LoginImage} alt="Login" className="background-image img-fluid" />
            <div className="login-text position-absolute top-50 start-50 translate-middle text-center">
                <h1 className="t1">Let's begin to discover a training and development of skills </h1>
               
            </div>
            <div className="login-box">
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="student_id" className="form-label">Student Id:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="student_id"
                            value={student_id}
                            onChange={(e) => setStudent_id(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">DOB:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;

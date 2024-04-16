import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling
import Login from "./Login.jpg";
import BaseUrl from './Constant';
import StudentDashboard from './StudentDashboard'; // Import the Student Dashboard component

function LoginPage() {
    const [student_id, setStudent_id] = useState('');
    const [dob , setDob] = useState('');
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false); // State to manage authentication

    const handleSubmit = async (event) => {
        event.preventDefault();

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
        return <StudentDashboard id ={student_id} />;
    }

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Student Id:</label>
                    <input
                        type="text"
                        id="student_id"
                        value={student_id}
                        onChange={(e) => setStudent_id(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dob">DOB:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPage;

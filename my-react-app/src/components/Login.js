import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling
import Login from "./Login.jpg";
import CryptoJS from 'crypto-js';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const encryptData = (data) => {
        const key = 'your_secret_key'; // Replace with your secret key
        const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
        return encryptedData;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const encryptedUsername = encryptData(username);
            const encryptedPassword = encryptData(password);

            const response = await fetch(`${BaseUrl}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: encryptedUsername, password: encryptedPassword })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Handle successful login, e.g., store token in local storage, redirect, etc.
            console.log('Login successful:', data);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error.message);
        }
    };

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

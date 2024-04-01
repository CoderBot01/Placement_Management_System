import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling
import Login from "./Login.jpg";
import crypto  from 'crypto';
import BaseUrl from './Student/Constant';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const staticIV = Buffer.from('0123456789ABCDEF0123456789ABCDEF', 'hex');
const staticKey = Buffer.from('0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF', 'hex');

function encryptMessage(message, key, iv) {
    // Convert message to buffers
    const messageBuffer = Buffer.from(message, 'utf8');

    // Create cipher object with AES algorithm and CBC mode
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Pad the message
    let paddedData = Buffer.concat([messageBuffer, Buffer.alloc(16 - (messageBuffer.length % 16), 16 - (messageBuffer.length % 16))]);

    // Encrypt the message
    let encrypted = cipher.update(paddedData);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Return ciphertext
    return encrypted.toString('hex');
}

    // Example usage


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const encryptedUsername = encryptMessage(username);
            const encryptedPassword = encryptMessage(password);

            const response = await fetch(`${BaseUrl}/login`, {
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BaseUrl from './Constant';
import PlacementDash from './PlacementDash';
import image from './Login.jpg';

function LoginPage1() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);
            setAuthenticated(true);

            console.log('Login successful:', data);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error.message);
        }
    };

    if (authenticated) {
        return <PlacementDash />;
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">COORDINATOR LOGIN</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage1;

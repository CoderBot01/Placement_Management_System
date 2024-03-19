import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling
import Login from "./Login.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password');
    } else {
      console.log('Logging in with:', username, password);
      // Implement your authentication logic here
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <img src="Login.jpg" alt="Logo" className="logo" /> {/* Replace with your image */}
      </div>
      <div className="right-panel">
        <h2 className="login-title">Welcome Back!</h2>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
        <p className="forgot-password">Forgot your password?</p>
      </div>
    </div>
  );
};

export default LoginPage;

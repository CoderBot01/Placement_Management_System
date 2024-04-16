// App.js

import React, { useState } from 'react';
import axios from 'axios';

function recommend() {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/jobs?skill=${skill}&location=${location}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  return (
    <div>
      <h1>Job Recommendation Page</h1>
      <div>
        <input type="text" placeholder="Enter skill" value={skill} onChange={(e) => setSkill(e.target.value)} />
        <input type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Job Listings</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <a href={job.url} target="_blank" rel="noopener noreferrer">{job.title}</a>
              <p>{job.companyName}</p>
              <p>{job.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default recommend;




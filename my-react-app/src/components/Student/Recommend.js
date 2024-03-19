import React, { useState, useEffect } from 'react';

function JobsComponent() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/path/to/jobs.json'); // Update the path to your JSON file
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <a href={job.url}>Apply</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobsComponent;

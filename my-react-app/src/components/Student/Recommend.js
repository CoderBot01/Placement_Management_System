import React, { useState } from 'react';

const JobRecommendation = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const fetchRecommendedJobs = async () => {
    // Fetch recommended jobs from API or database
    // Example API call
    try {
      const response = await fetch('/api/recommended-jobs');
      const data = await response.json();
      setRecommendedJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
    }
  };

  return (
    <div>
      <h1>Recommended Jobs</h1>
      <button onClick={fetchRecommendedJobs}>Fetch Recommendations</button>
      <ul>
        {recommendedJobs.map((job, index) => (
          <li key={index}>
            <div>{job.title}</div>
            <div>{job.company}</div>
            <div>{job.location}</div>
            <div>{job.description}</div>
            <a href={job.link}>Apply Now</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRecommendation;

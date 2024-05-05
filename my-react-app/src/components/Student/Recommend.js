import React, { useState } from 'react';
import axios from 'axios';

function Recommend() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchJobs = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://linkedin-api8.p.rapidapi.com/search-jobs',
      params: {
        keywords: keyword,
        location: location,
        datePosted: 'anyTime',
        sort: 'mostRelevant',
        remote: 'false'
      },
      headers: {
        'X-RapidAPI-Key': '1368737352mshcdb226e6cce563fp16b3fcjsnab74d043c9f6',
        'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Job Recommendation Page</h1>
      <div>
        <label htmlFor="skill">Skill:</label>
        <input id="skill" type="text" placeholder="Enter skill" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <label htmlFor="location">Location:</label>
        <input id="location" type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={searchJobs}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && jobs.length > 0 && (
        <div>
          <h2>Job Listings</h2>
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                <h3><strong>Job Title:</strong>{job.title}</h3>
                <p><strong>company name:</strong>{job.company.name}</p>
                <p><strong>location:</strong>{job.location}</p>
                <p><strong>posted date:</strong>{job.postDate}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && jobs.length === 0 && <p>No jobs found.</p>}
    </div>
  );
}

export default Recommend;

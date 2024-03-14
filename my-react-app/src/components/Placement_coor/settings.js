import React, { useState } from 'react';

// Sample data for job listings
const jobListings = [
  { id: 1, title: 'Software Engineer Intern', company: 'Tech Company Inc.', location: 'San Francisco, CA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', deadline: 'March 31, 2024' },
  { id: 2, title: 'Marketing Intern', company: 'Marketing Agency LLC', location: 'New York, NY', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', deadline: 'April 15, 2024' },
  // Add more job listings as needed
];

const PlacementPage = () => {
  // State to manage selected job listing
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div>
      <h1>Placement Page</h1>

      {/* Job Listings */}
      <section>
        <h2>Job Listings</h2>
        <ul>
          {jobListings.map(job => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company} - {job.location}</p>
              <button onClick={() => setSelectedJob(job)}>View Details</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Selected Job Details */}
      {selectedJob && (
        <section>
          <h2>Job Details</h2>
          <h3>{selectedJob.title}</h3>
          <p>{selectedJob.company} - {selectedJob.location}</p>
          <p>{selectedJob.description}</p>
          <p>Deadline: {selectedJob.deadline}</p>
          <button onClick={() => setSelectedJob(null)}>Close</button>
        </section>
      )}

      {/* Resources */}
      <section>
        <h2>Resources</h2>
        {/* Add links to resources */}
        <ul>
          <li><a href="#">Resume Templates</a></li>
          <li><a href="#">Interview Tips</a></li>
          {/* Add more resources as needed */}
        </ul>
      </section>

      {/* Events and Workshops */}
      <section>
        <h2>Events and Workshops</h2>
        {/* Add details about upcoming events */}
        <p>No upcoming events currently.</p>
      </section>

      {/* Feedback and Support */}
      <section>
        <h2>Feedback and Support</h2>
        {/* Add feedback form or contact information */}
        <p>For any queries, please email: placement@example.com</p>
      </section>
    </div>
  );
};

export default PlacementPage;

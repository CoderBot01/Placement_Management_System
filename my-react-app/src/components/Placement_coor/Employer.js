import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EmployerList() {
  // Sample employer data (replace with your actual data)
  const [employers, setEmployers] = useState([
    { id: 1, name: 'Company A', industry: 'Technology' },
    { id: 2, name: 'Company B', industry: 'Finance' },
    { id: 3, name: 'Company C', industry: 'Healthcare' }
  ]);

  return (
    <div>
      <h2>Employer List</h2>
      <ul>
        {employers.map(employer => (
          <li key={employer.id}>
            <Link to={`/employers/${employer.id}`}>{employer.name}</Link> - {employer.industry}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmployerDetails({ match }) {
  const { id } = match.params;
  // Fetch employer details based on ID (you can replace this with your data fetching logic)
  const [employer, setEmployer] = useState({ id: id, name: 'Company A', industry: 'Technology', address: '123 Main St' });

  return (
    <div>
      <h2>{employer.name}</h2>
      <p><strong>Industry:</strong> {employer.industry}</p>
      <p><strong>Address:</strong> {employer.address}</p>
      <Link to={`/employers/${id}/edit`}>Edit</Link> {/* Link to edit employer details */}
    </div>
  );
}

function EmployerEdit({ match }) {
  const { id } = match.params;
  // Fetch employer details for editing (you can replace this with your data fetching logic)
  const [employer, setEmployer] = useState({ id: id, name: 'Company A', industry: 'Technology', address: '123 Main St' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (update employer details)
  };

  return (
    <div>
      <h2>Edit Employer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={employer.name} onChange={(e) => setEmployer({ ...employer, name: e.target.value })} />
        </div>
        <div>
          <label>Industry:</label>
          <input type="text" value={employer.industry} onChange={(e) => setEmployer({ ...employer, industry: e.target.value })} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={employer.address} onChange={(e) => setEmployer({ ...employer, address: e.target.value })} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function EmployerPage() {
    return (
      <div>
        <Link to="/employers/new">Add New Employer</Link>
        <hr />
        <Route exact path="/employers" component={EmployerList} /> {/* Use Route component */}
        <Route path="/employers/:id" component={EmployerDetails} /> {/* Use Route component */}
        <Route path="/employers/:id/edit" component={EmployerEdit} /> {/* Use Route component */}
      </div>
    );
  }

export default EmployerPage;

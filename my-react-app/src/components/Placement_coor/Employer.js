import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function EmployerList({ employers, deleteEmployer }) {
  return (
    <div>
      <h2>Employer List</h2>
      <ul>
        {employers.map(employer => (
          <li key={employer.id}>
            <Link to={`/employers/${employer.id}`}>{employer.name}</Link> - {employer.industry}
            <button onClick={() => deleteEmployer(employer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmployerDetails({ employers, match }) {
  const { id } = match.params;
  const employer = employers.find(emp => emp.id === parseInt(id));

  if (!employer) return <Navigate to="/employers" />;

  return (
    <div>
      <h2>{employer.name}</h2>
      <p><strong>Industry:</strong> {employer.industry}</p>
      <p><strong>Address:</strong> {employer.address}</p>
      <Link to={`/employers/${id}/edit`}>Edit</Link> {/* Link to edit employer details */}
    </div>
  );
}

function EmployerEdit({ employers, match }) {
  const { id } = match.params;
  const [employer, setEmployer] = useState(employers.find(emp => emp.id === parseInt(id)));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update employer details logic
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
  const [employers, setEmployers] = useState([
    { id: 1, name: 'Company A', industry: 'Technology', address: '123 Main St' },
    { id: 2, name: 'Company B', industry: 'Finance', address: '456 Wall St' },
    { id: 3, name: 'Company C', industry: 'Healthcare', address: '789 Broadway' }
  ]);

  const deleteEmployer = (id) => {
    setEmployers(prevEmployers => prevEmployers.filter(emp => emp.id !== id));
  };

  const addEmployer = (newEmployer) => {
    setEmployers(prevEmployers => [...prevEmployers, { id: prevEmployers.length + 1, ...newEmployer }]);
  };

  return (
    <div>
      <Link to="/employers/new">Add New Employer</Link>
      <hr />
      <Routes>
        <Route exact path="/employers">
          <EmployerList employers={employers} deleteEmployer={deleteEmployer} />
        </Route>
        <Route path="/employers/:id" element={<EmployerDetails employers={employers} />} />
        <Route path="/employers/:id/edit" element={<EmployerEdit employers={employers} />} />
        <Route path="/employers/new" element={<EmployerAdd addEmployer={addEmployer} />} />
      </Routes>
    </div>
  );
}

function EmployerAdd({ addEmployer }) {
  const [newEmployer, setNewEmployer] = useState({ name: '', industry: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployer(newEmployer);
    setNewEmployer({ name: '', industry: '', address: '' });
  };

  return (
    <div>
      <h2>Add New Employer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={newEmployer.name} onChange={(e) => setNewEmployer({ ...newEmployer, name: e.target.value })} />
        </div>
        <div>
          <label>Industry:</label>
          <input type="text" value={newEmployer.industry} onChange={(e) => setNewEmployer({ ...newEmployer, industry: e.target.value })} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={newEmployer.address} onChange={(e) => setNewEmployer({ ...newEmployer, address: e.target.value })} />
        </div>
        <button type="submit">Add Employer</button>
      </form>
    </div>
  );
}

export default EmployerPage;

import React, { useState } from 'react';
import { postData, deleteData } from './functions';

function EmployerPage() {
  const [employers, setEmployers] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [hrName, setHrName] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case 'companyName':
        setCompanyName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'about':
        setAbout(value);
        break;
      case 'hrName':
        setHrName(value);
        break;
      case 'contactDetails':
        setContactDetails(value);
        break;
      default:
        break;
    }
  };

  const fetchStudents = async () => {
    try {
        const response = await getData('/jobs');
        if (!response.ok) {
            throw new Error('Failed to fetch students. Server returned status: ' + response.status);
        }
        const data = await response.json();
        setStudents(data);
    } catch (error) {
        console.error('Error fetching students:', error);
        setAlertMessage('Failed to fetch students. Please try again later.');
    }
};

const addEmployer = async () => {
    const newEmployer = {employer: companyName, companyName, address, about, hrName, contactDetails};


    try {
        const addResponse = await postData('/employers', newEmployer);
        if (!addResponse.ok) {
            throw new Error('Failed to add emplyer');
        }

        fetchEmployer();

        setEmployers([...employers, newEmployer]);
        setCompanyName('');
        setAddress('');
        setAbout('');
        setHrName('');
        setContactDetails('');
    } catch (error) {

        console.error('Error adding employer:', error);
    }
};

const deleteEmployer = async (index) => {
    const employer = employers[index];
    try {
        const deleteResponse = await deleteData('/employers', employer);
        if (!deleteResponse.ok) {
            throw new Error('Failed to delete employer');
        } 
        fetchEmployer();
    }
    catch (error) {
        console.error('Error deleting employer:', error);
    }
}

const fetchEmployer = async () => {
    try {
        const response = await getData('/employers');
        if (!response.ok) {
            throw new Error('Failed to fetch employers. Server returned status: ' + response.status);
        }
        const data = await response.json();
        setEmployers(data);
    } catch (error) {
        console.error('Error fetching employers:', error);
    }
}




  return (
    <div className="container mt-5">
      <h1 className="mb-4">Employer Details</h1>
      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">Company Name:</label>
        <input
          type="text"
          className="form-control"
          id="companyName"
          value={companyName}
          onChange={(event) => handleInputChange(event, 'companyName')}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(event) => handleInputChange(event, 'address')}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="about" className="form-label">About:</label>
        <input
          type="text"
          className="form-control"
          id="about"
          value={about}
          onChange={(event) => handleInputChange(event, 'about')}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="hrName" className="form-label">HR Name:</label>
        <input
          type="text"
          className="form-control"
          id="hrName"
          value={hrName}
          onChange={(event) => handleInputChange(event, 'hrName')}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contactDetails" className="form-label">Contact Details:</label>
        <input
          type="text"
          className="form-control"
          id="contactDetails"
          value={contactDetails}
          onChange={(event) => handleInputChange(event, 'contactDetails')}
        />
      </div>
      <button className="btn btn-primary" onClick={addEmployer}>Add Employer</button>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Address</th>
            <th>About</th>
            <th>HR Name</th>
            <th>Contact Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employers.map((employer, index) => (
            <tr key={index}>
              <td>{employer.companyName}</td>
              <td>{employer.address}</td>
              <td>{employer.about}</td>
              <td>{employer.hrName}</td>
              <td>{employer.contactDetails}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteEmployer(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployerPage;

import React, { useState, useEffect } from 'react';
import { getData, postData, deleteData } from './functions';

function StudentInfo({ id }) {
  // State to store student data and edited data
  const [student, setStudent] = useState(null);
  const [editedStudent, setEditedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('view'); // State to track mode: 'view' or 'edit'

  // Ref to track if the component is mounted
  const isMounted = React.useRef(true);

  // Fetch student data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/StudentInformation/${id}`);
        if (!response.ok) {
          throw new Error('Failed fetch student data');
        }
        const data = await response.json();
        if (isMounted.current) {
          setStudent(data[0]);
          setEditedStudent(data[0]);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [id]);

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData(`/StudentInformation/${id}`, editedStudent);
      if (!response.ok) {
        throw new Error('Failed to update student data');
      }
      console.log('Student data updated successfully');
      // Fetch the updated student data again
      const updatedResponse = await getData(`/StudentInformation/${id}`);
      const updatedData = await updatedResponse.json();
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated student data');
      }
      setStudent(updatedData[0]);
      setMode('view'); // Switch to view mode after successful submission
    } catch (error) {
      setMode('view');
      console.error('Error updating student data:', error);
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setMode('edit'); // Switch to edit mode
  };

  // Render edit form in a table-like layout
 // Render edit form in a table-like layout with Bootstrap classes
// Render edit form in a table-like layout with Bootstrap classes and left-aligned content
const renderEditForm = () => {
  return (
    <form onSubmit={handleSubmit} className='bg-dark p-4 rounded'>
      <h1 className="text-light mb-4">Edit Student Information</h1>
      <div className="table-responsive">
        <table className="table table-dark table-bordered">
          <tbody>
            {Object.entries(editedStudent).map(([key, value]) => (
              <tr key={key}>
                <td style={{ width: "30%", textAlign: "right" }}>
                  <label htmlFor={key} className='text-light'>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                </td>
                <td className="text-left"> {/* Adjust alignment to the left */}
                  {key === 'student_id' || key === 'dob' || key === 'id' ? (
                    <input
                      type="text"
                      className="form-control bg-dark text-light"
                      id={key}
                      name={key}
                      value={value}
                      disabled // Disabling input for student_id and DOB
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control bg-dark text-light"
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
    </form>
  );
};

// Render student information in a table-like layout with Bootstrap classes and left-aligned content
const renderStudentInfo = () => {
  return (
    <div className="text-light">
      <h1 className="mb-4">Student Information</h1>
      <div className="table-responsive">
        <table className="table table-dark table-bordered">
          <tbody>
            {Object.entries(student).map(([key, value]) => (
              <tr key={key}>
                <td style={{ width: "30%", textAlign: "right" }}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                </td>
                <td className="text-left">{value}</td> {/* Adjust alignment to the left */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={toggleEdit} className="btn btn-primary mt-3">Edit</button>
    </div>
  );
};

  
  // Render content based on mode
  return (
    <div className="container mt-5 bg-dark">
      {loading && <p className="text-light">Loading...</p>}
      {error && <p className="text-danger">Error: {error.message}</p>}
      {student && (
        <div className="row">
         
            {mode === 'edit' ? renderEditForm() : renderStudentInfo()}
        
        </div>
      )}
    </div>
  );
}

export default StudentInfo;

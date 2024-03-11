import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "./Add.css";
import AdminDash from "./AdminDash"

function AddStudent() {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    department: '',
    email: '',
    password: '',
    yearOfJoining: '',
    yearOfGraduation: '',
    phoneNumber: '',
    address: '',
    resumeURL: '',
    graduationYear: '',
    gpa: ''
  });
  const [selectAll, setSelectAll] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = { ...formData };

    try {
        // Make a POST request to add the new student
        const addResponse = await fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        });

        if (!addResponse.ok) {
            throw new Error('Failed to add student');
        }

        // Assuming the response body contains the added student data
        const addedStudent = await addResponse.json();

        // Update state with the added student
        setStudents([...students, addedStudent]);

        // Clear input fields
        setFormData({
            student_id: '',
            name: '',
            department: '',
            email: '',
            password: '',
            yearOfJoining: '',
            yearOfGraduation: '',
            phoneNumber: '',
            address: '',
            resumeURL: '',
            graduationYear: '',
            gpa: ''
        });

        setShowForm(false);
    } catch (error) {
        console.error('Error adding student:', error);
        // Handle error
    }
  };

  const handleDelete = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleExportExcel = () => {
    const data = students.map(student => ({
      Name: student.name,
      Department: student.department,
      Email: student.email,
      'Year of Joining': student.yearOfJoining,
      'Year of Graduation': student.yearOfGraduation,
      'Phone Number': student.phoneNumber,
      Address: student.address,
      'Resume URL': student.resumeURL,
      'Graduation Year': student.graduationYear,
      GPA: student.gpa
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'students.xlsx');
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const studentsData = await response.json();
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
        // Handle error
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <AdminDash />

      <h1>Add Student</h1>
      <button onClick={toggleForm}>{showForm ? 'Hide Form' : 'Add Student'}</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          {/* Additional fields added */}
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="student_id" placeholder="student_id" value={formData.student_id} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="number" name="yearOfJoining" placeholder="Year of Joining" value={formData.yearOfJoining} onChange={handleChange} required />
          <input type="number" name="yearOfGraduation" placeholder="Year of Graduation" value={formData.yearOfGraduation} onChange={handleChange} required />
          <input type="number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="url" name="resumeURL" placeholder="Resume URL" value={formData.resumeURL} onChange={handleChange} required />
          <input type="number" name="graduationYear" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} required />
          <input type="number" name="gpa" placeholder="GPA" value={formData.gpa} onChange={handleChange} required />

          <button type="submit">Add</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Year of Joining</th>
            <th>Year of Graduation</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Resume URL</th>
            <th>Graduation Year</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" checked={selectAll} />
              </td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.email}</td>
              <td>{student.yearOfJoining}</td>
              <td>{student.yearOfGraduation}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.address}</td>
              <td>{student.resumeURL}</td>
              <td>{student.graduationYear}</td>
              <td>{student.gpa}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleExportExcel}>Export as Excel</button>
    </div>
  );
}

export default AddStudent;

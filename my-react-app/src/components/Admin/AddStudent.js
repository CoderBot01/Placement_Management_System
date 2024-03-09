import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "./Add.css";

function AddStudent() {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, formData]);
    setFormData({
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

  return (
    <div>
      <h1>Add Student</h1>
      <button onClick={toggleForm}>{showForm ? 'Hide Form' : 'Add Student'}</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          {/* Additional fields added */}
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="text" name="yearOfJoining" placeholder="Year of Joining" value={formData.yearOfJoining} onChange={handleChange} required />
          <input type="text" name="yearOfGraduation" placeholder="Year of Graduation" value={formData.yearOfGraduation} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input type="text" name="resumeURL" placeholder="Resume URL" value={formData.resumeURL} onChange={handleChange} />
          <input type="text" name="graduationYear" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} />
          <input type="text" name="gpa" placeholder="GPA" value={formData.gpa} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      )}

      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {/* Display all student information */}
            <strong>Name:</strong> {student.name}, <strong>Department:</strong> {student.department}, <strong>Email:</strong> {student.email}, <strong>Year of Joining:</strong> {student.yearOfJoining}, <strong>Year of Graduation:</strong> {student.yearOfGraduation}
            {/* Additional fields */}
            <strong>Phone Number:</strong> {student.phoneNumber}, <strong>Address:</strong> {student.address}, <strong>Resume URL:</strong> {student.resumeURL}, <strong>Graduation Year:</strong> {student.graduationYear}, <strong>GPA:</strong> {student.gpa}
            <button onClick={() => handleDelete(index)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>
    
      {/* Export button and Select All checkbox */}
      <h2>Export Student List</h2>
      <button onClick={handleExportExcel}>Export as Excel</button>
      <input type="checkbox" checked={selectAll} onChange={handleSelectAll} /> Select All
    </div>
  );
}

export default AddStudent;

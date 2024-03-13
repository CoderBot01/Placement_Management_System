import React, { useState } from 'react';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function TrainingPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [responses, setResponses] = useState([]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!title || !description || !duration) {
      alert('Please fill in all fields.');
      return;
    }
    const newPost = { title, description, duration };
    setResponses([]);
    setTitle('');
    setDescription('');
    setDuration('');
    setResponses([newPost]);
  };

  const handleResponse = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const department = e.target.department.value;
    const email = e.target.email.value;
    if (!name || !department || !email) {
      alert('Please fill in all fields.');
      return;
    }
    const newResponse = { name, department, email };
    setResponses([...responses, newResponse]);
    e.target.reset();
  };

  const handleExportPDF = () => {
    if (responses.length === 0) {
      alert('No responses to export.');
      return;
    }
    const doc = new jsPDF();
    doc.autoTable({ html: '#response-table' });
    doc.save('training_responses.pdf');
  };

  const handleExportExcel = () => {
    if (responses.length === 0) {
      alert('No responses to export.');
      return;
    }
    const data = responses.map(response => [response.name, response.department, response.email]);
    const ws = XLSX.utils.aoa_to_sheet([['Name', 'Department', 'Email'], ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    XLSX.writeFile(wb, 'training_responses.xlsx');
  };

  return (
    <div>
      <h1>Training and Development</h1>
      <form onSubmit={handlePost}>
        <label htmlFor="title">Title:</label><br />
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        /><br />
        <label htmlFor="description">Description:</label><br />
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows="4" 
          cols="50" 
          required 
        ></textarea><br />
        <label htmlFor="duration">Duration:</label><br />
        <input 
          type="text" 
          id="duration" 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
          required 
        /><br />
        <button type="submit">Post</button>
      </form>
      <h2>Responses</h2>
      <form onSubmit={handleResponse}>
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" required /><br />
        <label htmlFor="department">Department:</label><br />
        <input type="text" id="department" name="department" required /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br />
        <button type="submit">Submit Response</button>
      </form>
      <div>
        <table id="response-table" border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{response.name}</td>
                <td>{response.department}</td>
                <td>{response.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleExportPDF}>Export as PDF</button>
      <button onClick={handleExportExcel}>Export as Excel</button>
    </div>
  );
}

export default TrainingPage;

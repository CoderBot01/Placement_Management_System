import React, { useState, useEffect } from 'react';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './Train.css'; // Import your CSS file

function TrainingPage() {
  const [trainings, setTrainings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [fees, setFees] = useState('');

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('http://localhost:3000/trainings');
      if (!response.ok) {
        throw new Error('Failed to fetch Training Details');
      }
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      console.error('Error fetching training:', error);
    }
  };

  const addTraining = async (event) => {
    event.preventDefault(); // Prevent form submission

    const newTraining = { title, description, duration, fees };

    try {
      const addResponse = await fetch('http://localhost:3000/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTraining),
      });

      if (!addResponse.ok) {
        throw new Error('Failed to add Training');
      }

      await fetchTrainings();

      setTitle('');
      setDescription('');
      setDuration('');
      setFees('');
    } catch (error) {
      console.error('Error adding training:', error);
    }
  };

  const handleDeleteTraining = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/trainings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete Training');
      }
      await fetchTrainings();
    } catch (error) {
      console.error('Error deleting Training:', error);
    }
  };
 
  

  return (
    <div>
      <h1>Training and Development</h1>
      <form onSubmit={addTraining}>
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
        <label htmlFor="fees">Fees:</label><br />
        <input
          type="number"
          id="fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          required
        /><br />
        <button type="submit">Post</button>
      </form>

      <h2>Posted Trainings</h2>
      {trainings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map(training => (
              <tr key={training.id}>
                <td>{training.title}</td>
                <td>{training.description}</td>
                <td>{training.duration}</td>
                <td>{training.fees}</td>
                <td><button onClick={() => handleDeleteTraining(training.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Training found.</p>
      )}
    </div>
  );
}

export default TrainingPage;

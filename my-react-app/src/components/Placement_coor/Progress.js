import React, { useState } from 'react';

function ProgressTracker() {
  const [studentsCleared, setStudentsCleared] = useState(0);
  const [interviewsConducted, setInterviewsConducted] = useState(0);

  const clearStudent = () => {
    setStudentsCleared(prevCount => prevCount + 1);
  };

  const conductInterview = () => {
    setInterviewsConducted(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h2>Progress Tracker</h2>
      <div>
        <p>Students Cleared for Interview: {studentsCleared}</p>
        <p>Interviews Conducted: {interviewsConducted}</p>
      </div>
      <button onClick={clearStudent}>Clear Student for Interview</button>
      <button onClick={conductInterview}>Conduct Interview</button>
    </div>
  );
}

export default ProgressTracker;

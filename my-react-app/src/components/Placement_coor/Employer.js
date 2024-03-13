import React, { useState } from 'react';

function EmployerPage() {
  const [messages, setMessages] = useState({ employer: [], placementCoordinator: [] });
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (sender && message) {
      setMessages(prevState => ({
        ...prevState,
        [sender]: [...prevState[sender], message]
      }));
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Communication Page</h1>
      <label>
        Sender:
        <select value={sender} onChange={e => setSender(e.target.value)}>
          <option value="">Select</option>
          <option value="employer">Employer</option>
          <option value="placementCoordinator">Placement Coordinator</option>
        </select>
      </label>
      <br />
      <label>
        Message:
        <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
      </label>
      <br />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Employer Messages</h2>
      <ul>
        {messages.employer.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h2>Placement Coordinator Messages</h2>
      <ul>
        {messages.placementCoordinator.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default  EmployerPage;
  
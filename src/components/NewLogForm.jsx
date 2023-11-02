import React, { useState } from 'react';
import './NewLogForm.css'; // Import the CSS file

const NewLogForm = ({ logs, setLogs }) => {
  const [captainName, setCaptainName] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [mistakesWereMadeToday, setMistakesWereMadeToday] = useState(false);
  const [daysSinceLastCrisis, setDaysSinceLastCrisis] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLogId = logs.length;
    const newLog = {
      id: newLogId,
      captainName,
      title,
      post,
      mistakesWereMadeToday,
      daysSinceLastCrisis,
    };

    try {
      const response = fetch('http://localhost:8888/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLog),
      });

      if (!response.ok) {
        throw new Error('Failed to add log');
      }

      setLogs([...logs, newLog]);

      setCaptainName('');
      setTitle('');
      setPost('');
      setMistakesWereMadeToday(false);
      setDaysSinceLastCrisis(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-log-form"> {/* Apply a class for styling */}
      <h2 className="create-new">Create New Log</h2>
      <div className="label-container">
        <label>Captain's Name:</label>
        <input
          type="text"
          value={captainName}
          onChange={(e) => setCaptainName(e.target.value)}
          className="input"
        />
      </div>
      <div className="label-container">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
      </div>
      <div className="label-container">
        <label>Post:</label>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="input"
        />
      </div>
      <div className="label-container">
        <label>Mistakes Were Made Today:</label>
        <input
          type="checkbox"
          checked={mistakesWereMadeToday}
          onChange={(e) => setMistakesWereMadeToday(e.target.checked)}
          className="checkbox"
        />
      </div>
      <div className="label-container">
        <label>Days Since Last Crisis:</label>
        <input
          type="number"
          value={daysSinceLastCrisis}
          onChange={(e) => setDaysSinceLastCrisis(parseInt(e.target.value))}
          className="input"
        />
      </div>
      <div className="button-container">
        <button type="submit" className="add-log-button">
          Add Log
        </button>
        <button type="button" className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewLogForm;

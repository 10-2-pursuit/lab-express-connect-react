import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateLogForm.css'; // Import the CSS file

function UpdateLogForm({ id }) {
  const [updatedLog, setUpdatedLog] = useState({
    captainName: '',
    title: '',
    post: '',
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });
  const API_URL = `http://localhost:8888/logs/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setUpdatedLog(data);
        }
      })
      .catch((error) => console.error('Error fetching log:', error));
  }, [API_URL]);

  const handleUpdate = () => {
    fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLog),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Log updated successfully:', data);
        navigate(`/logs/${id}`);
      })
      .catch((error) => console.error('Error updating log:', error));
  };

  const handleCancel = () => {
    navigate(`/logs/${id}`);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setUpdatedLog({
      ...updatedLog,
      [name]: newValue,
    });
  };

  return (
    <div className="container">
      <h1>Edit Log</h1>
      <form className="form">
        <label>Captain's Name:</label>
        <input
          type="text"
          name="captainName"
          value={updatedLog.captainName}
          onChange={handleInputChange}
        />
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={updatedLog.title}
          onChange={handleInputChange}
        />
        <label>Post:</label>
        <input
          type="text"
          name="post"
          value={updatedLog.post}
          onChange={handleInputChange}
        />
        <label>Mistakes Were Made Today:</label>
        <input
          type="checkbox"
          name="mistakesWereMadeToday"
          checked={updatedLog.mistakesWereMadeToday}
          onChange={handleInputChange}
        />
        <label>Days Since Last Crisis:</label>
        <input
          type="number"
          name="daysSinceLastCrisis"
          value={updatedLog.daysSinceLastCrisis}
          onChange={handleInputChange}
        />
      </form>
      <div className="button-container">
        <button className="update-button" onClick={handleUpdate}>
          Update Log
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateLogForm;

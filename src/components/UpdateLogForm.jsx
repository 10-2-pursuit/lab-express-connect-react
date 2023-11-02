import React, { useState, useEffect } from 'react';

export default function UpdateLogForm({ id }) {
  const [updatedLog, setUpdatedLog] = useState({
    captainName: '',
    title: '',
    post: '',
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });
  const API_URL = `http://localhost:8888/logs/${id}`; // Replace with your API endpoint

  useEffect(() => {
    // Fetch the specific log data to populate the form
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Check if data is valid, and then set the updatedLog state
        if (data && typeof data === 'object') {
          setUpdatedLog(data);
        }
      })
      .catch((error) =>console.error('Error fetching log:', error));
  }, [API_URL]);

  const handleUpdate = () => {
    // Make a PUT request to update the specific log
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
        // Redirect to the log's details page or another location
        // Replace window.location.href with your preferred routing logic
        window.location.href = `/logs/${id}`;
      })
      .catch((error) => console.error('Error updating log:', error));
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
    <div>
      <h1>Edit Log</h1>
      <form>
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
      <button onClick={handleUpdate}>Update Log</button>
    </div>
  );
}

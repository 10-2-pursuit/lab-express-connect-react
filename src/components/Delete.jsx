import React from 'react';

export default function DeleteLog({ id }) {
  const API_URL = `http://localhost:8888/logs/${id}`; // Replace with your API endpoint

  const handleDelete = () => {
    // Make a DELETE request to remove the specific log
    fetch(API_URL, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          // Successful deletion, redirect or perform other actions
          // Replace window.location.href with your preferred routing logic
          window.location.href = '/logs';
        } else {
          console.error('Error deleting log:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting log:', error));
  };

  return (
    <div>
      <h1>Delete Log</h1>
      <p>Are you sure you want to delete this log?</p>
      <button onClick={handleDelete}>Delete Log</button>
    </div>
  );
}

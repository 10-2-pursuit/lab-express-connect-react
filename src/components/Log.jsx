import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Log = ({ id }) => {
  const [log, setLog] = useState(null);
  const API_URL = `http://localhost:8888/logs/${id}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setLog(data);
      })
      .catch((error) => console.error('Error fetching log:', error));
  }, [id]);

  if (!log) {
    return <div>Loading...</div>;
  }

  const keys = Object.keys(log);

  return (
    <div>
      <h2>Captain's Log</h2>
      <ul>
        {keys.map((key) => (
          <li key={key}>
            <strong>{key}:</strong> {log[key].toString()}
          </li>
        ))}
      </ul>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default Log;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IndexPage.css';

function IndexPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch the list of logs from your API
    fetch('http://localhost:8888/logs')
      .then((response) => response.json())
      .then((logs) => setLogs(logs))
      .catch((error) => console.error('Error fetching logs:', error));
  }, []);

  return (
    <div className="Index">
      <h2>Logs</h2>
      <div className="logs">
        {logs.map((log) => (
          <div key={log.id}>
            <p>
              <strong>Captain's Name:</strong> {log.captainName}, &nbsp;&nbsp;&nbsp;
              <Link to={`/logs/${log.id}`}><strong>Title:</strong> {log.title}</Link>, &nbsp;&nbsp;&nbsp;
              <strong>Mistakes Were Made Today:</strong> {log.mistakesWereMadeToday ? <span role="img" aria-label="Fire">🔥</span> : 'No'}, &nbsp;&nbsp;&nbsp;
              <strong>Days Since Last Crisis:</strong> {log.daysSinceLastCrisis}
            </p>
            <p><strong>Post:</strong> {log.post}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexPage;

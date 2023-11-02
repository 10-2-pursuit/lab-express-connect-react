import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Show.css'; // Import the CSS file

function Show() {
  const { id } = useParams();
  const logId = parseInt(id, 10) - 1; // Adjust the ID to match your 1-based indices
  const [log, setLog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the log details based on the ID
    fetch(`http://localhost:8888/logs/${logId}`)
      .then((response) => response.json())
      .then((log) => setLog(log))
      .catch((error) => console.error('Error fetching log:', error));
  }, [logId]);

  const handleEdit = () => {
    navigate(`/logs/${id}/edit`);
  };

  const handleDelete = () => {
    const httpOptions = { method: 'DELETE' };

    fetch(`http://localhost:8888/logs/${logId}`, httpOptions)
      .then((res) => {
        console.log(res);
        alert('Hey - log was deleted! Way to go!');
        navigate('/logs/');
      })
      .catch((err) => console.error(err));
  };

  if (!log) {
    return <div>Loading...</div>;
  }

  return (
    <div className="LogShowPage">
      <h2>Log Details</h2>
      <img src={`../assets/${log.captainName}.jpg`} alt={log.title} className="log-image" />
      <h3>Captain's Name: {log.captainName}</h3>
      <p>Title: {log.title}</p>
      <p>Post: {log.post}</p>
      <p className="mistakes">
        Mistakes Were Made Today: {log.mistakesWereMadeToday ? <span role="img" aria-label="Fire">🔥</span> : 'No'}
      </p>
      <p>Days Since Last Crisis: {log.daysSinceLastCrisis}</p>
      <div className="button-container">
        <Link to="/logs">
          <button className="go-back-button">Go Back</button>
        </Link>
        <button className="edit-button" onClick={handleEdit}>
          Edit Log
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete Log
        </button>
      </div>
    </div>
  );
}

export default Show;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Show() {
  const { id } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    // Fetch the log details based on the ID
    fetch(`http://localhost:8888/logs/${id}`)
      .then((response) => response.json())
      .then((log) => setLog(log))
      .catch((error) => console.error('Error fetching log:', error));
  }, [id]); // Execute this effect whenever the ID changes

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/logs/${id}/edit`);
  };

  const handleDelete = () => {
    const httpOptions = { method: "DELETE" };

    // We know we need to delete a specific resource
    fetch(`http://localhost:8888/logs/${id}`, httpOptions)
      .then((res) => {
        console.log(res);
        alert("Hey - log was deleted! Way to go!");
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
      <h3>Captain's Name: {log.captainName}</h3>
      <p>Title: {log.title}</p>
      <p>Post: {log.post}</p>
      <p>Mistakes Were Made Today: {log.mistakesWereMadeToday ? 'Yes' : 'No'}</p>
      <p>Days Since Last Crisis: {log.daysSinceLastCrisis}</p>
      <Link to="/logs">
        <button>Go Back</button>
      </Link>
      <button onClick={handleEdit}>Edit Log</button>
      <button onClick={handleDelete}>Delete Log</button>
    </div>
  );
}

export default Show;

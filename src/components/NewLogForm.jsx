import React, { useState } from 'react';

const NewLogForm = ({ logs, setLogs }) => {
  const [captainName, setCaptainName] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [mistakesWereMadeToday, setMistakesWereMadeToday] = useState(false);
  const [daysSinceLastCrisis, setDaysSinceLastCrisis] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newLogId = logs.length;
    // Create a new log object
      const newLog = {
        id: newLogId,
        captainName,
        title,
        post,
        mistakesWereMadeToday,
        daysSinceLastCrisis
      };

      
    try {
      // Send a POST request to add the new log
      const response = fetch('http://localhost:8888/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLog)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add log');
      }
  
      // Update the list of logs by adding the new log to the end
      setLogs([...logs, newLog]);
  
      // Reset the form fields
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
    <form onSubmit={handleSubmit}>
      <h2 className="create-new">Create New Log</h2>
      <div>
        <label className="name">Captain's Name:</label>
        <input type="text" value={captainName} onChange={(e) => setCaptainName(e.target.value)} />
      </div>
      <div>
        <label className="title">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="post">Post:</label>
        <textarea value={post} onChange={(e) => setPost(e.target.value)} />
      </div>
      <div>
        <label class="mistakes">Mistakes Were Made Today:</label>
        <input type="checkbox" checked={mistakesWereMadeToday} onChange={(e) => setMistakesWereMadeToday(e.target.checked)} />
      </div>
      <div>
        <label className="crisis">>Days Since Last Crisis:</label>
        <input type="number" value={daysSinceLastCrisis} onChange={(e) => setDaysSinceLastCrisis(parseInt(e.target.value))} />
      </div>
      <button className="add-log" type="submit">Add Log</button>
    </form>
  );
};

export default NewLogForm;

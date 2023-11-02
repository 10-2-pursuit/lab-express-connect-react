import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to the Logs App!</h1>
      <p>Click on the links below to navigate:</p>
      <ul>
        <li><Link to="/logs">View All Logs</Link></li>
        <li><Link to="/logs/new">Create New Log</Link></li>
      </ul>
    </div>
  );
}

function IndexPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:8888/logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
      <h1>All Logs</h1>
      {logs.map(log => (
        <div key={log.id}>
          <Link to={`/logs/${log.id}`}>{log.title}</Link>
        </div>
      ))}
    </div>
  );
}

function ShowPage({ match, history }) {
  const [log, setLog] = useState(null);

  useEffect(() => {
    fetchLog(match.params.id);
  }, [match.params.id]);

  const fetchLog = async (id) => {
    try {
      const response = await fetch(`http://localhost:8888/logs/${id}`);
      const data = await response.json();
      setLog(data);
    } catch (error) {
      console.error('Error fetching log:', error);
    }
  };

  const handleUpdateLog = async (updatedLog) => {
    try {
      const response = await fetch(`http://localhost:8888/logs/${updatedLog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLog)
      });
      const data = await response.json();
      setLog(data);
    } catch (error) {
      console.error('Error updating log:', error);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await fetch(`http://localhost:8888/logs/${id}`, {
        method: 'DELETE'
      });
      history.push('/logs');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  if (!log) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{log.title}</h1>
      <p>Captain's Name: {log.captainsname}</p>
      <p>Posts: {log.posts}</p>
      <p>Mistakes Were Made: {log.mistakes ? 'Yes' : 'No'}</p>
      <p>Days Since Last Crisis: {log.daysSinceLastCrisis}</p>
      {log.image && <img src={log.image} alt="Log Image" />}
      <button onClick={() => history.goBack()}>Go Back</button>
      <button onClick={() => history.push(`/logs/${log.id}/update`)}>Update Log</button>
      <button onClick={() => handleDeleteLog(log.id)}>Delete Log</button>
    </div>
  );
}

function UpdatePage({ match, history }) {
  const [log, setLog] = useState(null);
  const [captainsname, setCaptainsName] = useState('');
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState('');
  const [mistakes, setMistakes] = useState(false);
  const [daysSinceLastCrisis, setDaysSinceLastCrisis] = useState(0);

  useEffect(() => {
    fetchLog(match.params.id);
  }, [match.params.id]);

  const fetchLog = async (id) => {
    try {
      const response = await fetch(`http://localhost:8888/logs/${id}`);
      const data = await response.json();
      setLog(data);
      setCaptainsName(data.captainsname);
      setTitle(data.title);
      setPosts(data.posts);
      setMistakes(data.mistakes);
      setDaysSinceLastCrisis(data.daysSinceLastCrisis);
    } catch (error) {
      console.error('Error fetching log:', error);
    }
  };

  const handleUpdateLog = async () => {
    try {
      const updatedLog = {
        id: log.id,
        captainsname,
        title,
        posts,
        mistakes,
        daysSinceLastCrisis
      };
      
      const response = await fetch(`http://localhost:8888/logs/${log.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLog)
      });
      
      if (response.ok) {
        history.push(`/logs/${log.id}`);
      } else {
        console.error('Error updating log:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating log:', error);
    }
  };

  if (!log) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Log</h1>
      <form onSubmit={handleUpdateLog}>
        <label htmlFor="captainsname">Captain's Name:</label>
        <input id="captainsname" type="text" value={captainsname} onChange={(e) => setCaptainsName(e.target.value)} />
        
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <label htmlFor="posts">Posts:</label>
        <input id="posts" type="text" value={posts} onChange={(e) => setPosts(e.target.value)} />
        
        <label htmlFor="mistakes">Mistakes Were Made:</label>
        <input id="mistakes" type="checkbox" checked={mistakes} onChange={(e) => setMistakes(e.target.checked)} />
        
        <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis:</label>
        <input id="daysSinceLastCrisis" type="number" value={daysSinceLastCrisis} onChange={(e) => setDaysSinceLastCrisis(parseInt(e.target.value))} />
        
        <button type="submit">Update</button>
        <button onClick={() => history.goBack()}>Go Back</button>
        <Link to="/logs">Home</Link>
        <Link to="/logs/new">New Log</Link>
      </form>
    </div>
  );
}

function NewLogPage({ history }) {
  const [captainsname, setCaptainsName] = useState('');
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState('');
  const [mistakes, setMistakes] = useState(false);
  const [daysSinceLastCrisis, setDaysSinceLastCrisis] = useState(0);

  const handleCreateLog = async (event) => {
    event.preventDefault();

    try {
      const newLog = {
        captainsname,
        title,
        posts,
        mistakes,
        daysSinceLastCrisis
      };
      
      const response = await fetch('http://localhost:8888/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog)
      });
      
      if (response.ok) {
        history.push('/logs');
      } else {
        console.error('Error creating log:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating log:', error);
    }
  };

  return (
    <div>
      <h1>Create New Log</h1>
      <form onSubmit={handleCreateLog}>
        <label htmlFor="captainsname">Captain's Name:</label>
        <input id="captainsname" type="text" value={captainsname} onChange={(e) => setCaptainsName(e.target.value)} />
        
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <label htmlFor="posts">Posts:</label>
        <input id="posts" type="text" value={posts} onChange={(e) => setPosts(e.target.value)} />
        
        <label htmlFor="mistakes">Mistakes Were Made:</label>
        <input id="mistakes" type="checkbox" checked={mistakes} onChange={(e) => setMistakes(e.target.checked)} />
        
        <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis:</label>
        <input id="daysSinceLastCrisis" type="number" value={daysSinceLastCrisis} onChange={(e) => setDaysSinceLastCrisis(parseInt(e.target.value))} />
        
        <button type="submit">Create</button>
        <Link to="/logs">Go Back</Link>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WelcomePage

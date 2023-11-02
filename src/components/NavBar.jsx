import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  listStyle: 'none',
  padding: 0,
  margin: '0 15px', // Add margins
};

const listItemStyle = {
  margin: '0 10px',
};

function NavBar() {
  return (
    <nav>
      <ul style={navStyle}>
        <li style={listItemStyle}>
          <Link to="/">Home</Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/logs">Logs</Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/logs/new">Create New Log</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/logs">Logs</Link>
        </li>
        <li>
          <Link to="/logs/new">Create New Log</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

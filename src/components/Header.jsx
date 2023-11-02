import React from 'react';

const headerStyle = {
  textAlign: 'center', // Center the text
};

const h1Style = {
  textDecoration: 'underline', // Underline the text
};

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>My Captain's Log</h1>
    </header>
  );
}

export default Header;

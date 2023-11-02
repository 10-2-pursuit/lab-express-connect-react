import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import IndexPage from './Pages/IndexPage';
import Show from './Pages/Show';

import FourOFour from './Pages/FourOFour';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import New from './Pages/New';




function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logs" element={<IndexPage />} />
            <Route path="/logs/:id" element={<Show />} />
            <Route path="/logs/:id/edit" element={<Edit />} />
            <Route path="/logs/new" element={<New />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;

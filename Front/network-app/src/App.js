import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddConnection from './pages/AddConnection';
import Networks from './pages/Networks';
import FindConnections from './pages/FindConnections';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <div className="title-container">
          <h1>Network Connect</h1>
        </div>

        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddConnection />} />
            <Route path="/networks" element={<Networks />} />
            <Route path="/find" element={<FindConnections />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;



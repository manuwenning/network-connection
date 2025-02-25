import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Componente da HomePage
import AddConnection from './pages/AddConnection'; // Página para adicionar conexões
import Networks from './pages/Networks'; // Página para ver as conexões

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="background-overlay"></div>
        <div className="app-container">
          <h1>Network Connect</h1>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddConnection />} />
            <Route path="/networks" element={<Networks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
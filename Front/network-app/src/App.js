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
        {/* Wrapper para centralizar o título */}
        <div className="title-container">
          <h1>Network Connect</h1>
        </div>

        <div className="app-container">
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

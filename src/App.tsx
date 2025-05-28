import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menucomponent from './components/menu';
import Addform from './pages/addform';

function HomePage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center border p-5 rounded shadow bg-white">
        <h1 className="mb-3 text-primary">Welcome to My React App</h1>
        <p className="lead text-muted">This is a simple CRUD Application in NODE-REACT.</p>
        <Menucomponent />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Add-Form" element={<Addform />} />
      </Routes>
    </Router>
  );
}

export default App;

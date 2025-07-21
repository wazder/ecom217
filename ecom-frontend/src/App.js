import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>E-Commerce App</h1>
          {isAuthenticated && (
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="logout-btn"
            >
              Logout
            </button>
          )}
        </header>
        
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/products" 
              element={isAuthenticated ? <Products /> : <Navigate to="/login" />} 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
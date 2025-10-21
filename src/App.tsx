import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsList from './components/TransactionsList';
import TransactionDetail from './components/TransactionDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TransactionsList />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

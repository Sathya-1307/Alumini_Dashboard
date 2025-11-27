import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentorshipDashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MentorshipDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
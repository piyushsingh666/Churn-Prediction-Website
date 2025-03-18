import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChurnInput from './components/churnInput'; // Ensure the correct casing

function App() {
  return (
    <Router>
      <div className='content'>
        <Routes>
          <Route path="/" element={<ChurnInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

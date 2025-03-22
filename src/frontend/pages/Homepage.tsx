import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>Welcome</h1>
      <p>Choose your portal:</p>
      <button onClick={() => navigate('/patient')}>Patient</button>
      <button onClick={() => navigate('/doctor')}>Doctor</button>
    </div>
  );
};

export default Homepage;

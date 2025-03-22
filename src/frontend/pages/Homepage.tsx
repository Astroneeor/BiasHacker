import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <Header />
      <div className="content">
        <div className="text-center">
          <h1>Welcome</h1>
          <p>Choose your portal:</p>
          <button className="btn btn-primary m-2" onClick={() => navigate('/patient')}>Patient</button>
          <button className="btn btn-secondary m-2" onClick={() => navigate('/doctor')}>Doctor</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

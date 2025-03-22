import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <div className="home-container">
        <header className="header">
          <h1>HeyDoc!</h1>
          <p>Welcome to your healthcare assistant, who are we helping today?</p>
        </header>
        <main className="main-content">
          <p>Are you a patient or a doctor?</p>
          <div className="button-container">
            <button className="patient-btn" onClick={() => navigate('/survey')}>For Patients</button>
            <button className="doctor-btn" onClick={() => navigate('/login')}>For Doctors</button>
          </div>
        </main>
      </div>
    );
  };
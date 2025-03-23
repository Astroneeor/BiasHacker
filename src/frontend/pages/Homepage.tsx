import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container" style={homepageContainerStyle}>
      <div className="container grid-lg" style={containerStyle}>
        <div className="columns">
          <div className="column col-12 text-center">
            <h1 className="text-primary text-dark" style={headingStyle}>Welcome to HeyDoc!</h1>
            <p className="text dark" style={paragraphStyle}>Choose your portal:</p>
            <button className="btn btn-primary m-2" onClick={() => navigate('/patient')}>Patient</button>
            <button className="btn btn-secondary m-2" onClick={() => navigate('/doctor')}>Doctor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const homepageContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '60px',
  boxSizing: 'border-box',
};

const containerStyle: React.CSSProperties = {
  textAlign: 'center',
};

const headingStyle: React.CSSProperties = {
  fontSize: '3.2em',
  lineHeight: '1.1',
  marginBottom: '20px'
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.2em',
  marginBottom: '20px',
};

export default Homepage;

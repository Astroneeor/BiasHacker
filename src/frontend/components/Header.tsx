import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MainLogoHeyDoc.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header
      className="navbar p-2"
      style={{
        backgroundColor: '#38bdf8',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="navbar-section">
        <img src={logo} alt="HeyDoc Logo" style={{ height: '40px', width: '40px' }} />
      </div>

      <div className="navbar-center">
        <h4 style={{ color: 'white', fontWeight: '600', margin: 0 }}>HeyDoc Portal</h4>
      </div>

      <div className="navbar-section">
        <button
          className="btn"
          style={{
            backgroundColor: 'white',
            borderColor: 'white',
            color: '#38bdf8',
            fontWeight: '500',
          }}
          onClick={() => navigate('/')}
        >
          Homepage
        </button>
      </div>
    </header>
  );
};

export default Header;

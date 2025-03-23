import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/MainLogoHeyDoc.png';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div >
      <img src={MainLogo} style={{ width: '100px' }} />
      <h1 className="text-dark" >Welcome to HeyDoc!</h1>
      <p className="text dark">Choose your portal:</p>
      <button className="text-dark m-2" style={{ backgroundColor: '#eb9393' }} onClick={() => navigate('/patient')}>Patient</button>
      <button className="text-dark m-2" style={{ backgroundColor: '#dbdbdb' }} onClick={() => navigate('/doctor')}>Doctor</button>
    </div>
  );
};

export default Homepage;
//#96d0ee

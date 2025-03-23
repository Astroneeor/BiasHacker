// src/frontend/pages/DoctorDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard: React.FC = () => {
  const [uniqueKey, setUniqueKey] = useState('');
  const [patientData, setPatientData] = useState<any>(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const pastelBlue = '#A4D3F5';
  const darkBg = '#121212';
  const darkText = '#e0e0e0';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueKey(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/patientfile/${uniqueKey}`);
      setPatientData(response.data);
      setError('');
    } catch (err) {
      setError('Patient not found');
      setPatientData(null);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.body.style.background = darkMode ? darkBg : '#ffffff';
    document.body.style.color = darkMode ? darkText : '#000000';
  }, [darkMode]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '4rem 2rem',
        fontFamily: 'Arial, sans-serif',
        background: darkMode ? darkBg : '#ffffff',
        color: darkMode ? darkText : '#000000'
      }}
    >
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: darkMode ? '#333' : pastelBlue,
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '10px 20px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src="/MainLogoHeyDoc.png"
          alt="HeyDoc Logo"
          style={{ height: '60px', marginBottom: '0.5rem' }}
        />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Doctor Dashboard</h2>
        <p style={{ fontSize: '1rem', color: darkMode ? '#aaa' : '#666' }}>Access patient records</p>
      </header>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '1rem',
          width: '80vw',
          maxWidth: '600px'
        }}
      >
        <input
          type="text"
          value={uniqueKey}
          onChange={handleInputChange}
          placeholder="Enter Patient Unique Key"
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            width: '100%',
            backgroundColor: darkMode ? '#1e1e1e' : 'white',
            color: darkMode ? darkText : '#000',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: pastelBlue,
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            height: '100%',
            transition: 'background-color 0.2s ease',
            boxShadow: '0 0 10px rgba(164, 211, 245, 0.6)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Search
        </button>
      </div>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      {patientData && (
        <div
          style={{
            marginTop: '2rem',
            border: '1px solid #ccc',
            borderRadius: '20px',
            padding: '2rem',
            width: '80vw',
            maxWidth: '700px',
            backgroundColor: darkMode ? '#1e1e1e' : '#f9f9f9',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Patient Data</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <th style={getCellStyle(darkMode)}>Age</th>
                <td style={getCellStyle(darkMode)}>{patientData.age}</td>
              </tr>
              <tr>
                <th style={getCellStyle(darkMode)}>Gender</th>
                <td style={getCellStyle(darkMode)}>{patientData.gender}</td>
              </tr>
              <tr>
                <th style={getCellStyle(darkMode)}>Ethnicity</th>
                <td style={getCellStyle(darkMode)}>{patientData.ethinicity}</td>
              </tr>
              <tr>
                <th style={getCellStyle(darkMode)}>Symptom Category</th>
                <td style={getCellStyle(darkMode)}>{patientData.symptom_category}</td>
              </tr>
              <tr>
                <th style={getCellStyle(darkMode)}>Biases</th>
                <td style={getCellStyle(darkMode)}>
                  {Array.isArray(patientData.biases)
                    ? patientData.biases.join(', ')
                    : patientData.biases}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const getCellStyle = (darkMode: boolean): React.CSSProperties => ({
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
  fontSize: '1rem',
  backgroundColor: darkMode ? '#2a2a2a' : 'white',
  color: darkMode ? '#e0e0e0' : '#000000'
});

export default DoctorDashboard;

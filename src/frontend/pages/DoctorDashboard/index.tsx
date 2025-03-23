// src/frontend/pages/DoctorDashboard.tsx
import React, { useState } from 'react';
import axios from 'axios';

const DoctorDashboard: React.FC = () => {
  const [uniqueKey, setUniqueKey] = useState('');
  const [patientData, setPatientData] = useState<any>(null);
  const [error, setError] = useState('');

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

  return (
    <div
      className="doctor-dashboard"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Doctor Dashboard</h2>
      
      <div
        className="form-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '1rem',
        }}
      >
        <input
          className="form-input"
          type="text"
          value={uniqueKey}
          onChange={handleInputChange}
          placeholder="Enter Patient Unique Key"
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #7f5af0',
            fontSize: '1rem',
            width: '250px',
          }}
        />
      <button
        className="btn btn-primary"
        onClick={handleSearch}
        style={{
          backgroundColor: '#7f5af0',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '35.5px', // match input height if needed
        }}
      >
        Search
      </button>
      </div>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      {patientData && (
        <div
          className="patient-data"
          style={{
            marginTop: '2rem',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Patient Data</h3>
          <table
            className="table"
            style={{ width: '100%', borderCollapse: 'collapse' }}
          >
            <tbody>
              <tr>
                <th style={cellStyle}>Age</th>
                <td style={cellStyle}>{patientData.age}</td>
              </tr>
              <tr>
                <th style={cellStyle}>Gender</th>
                <td style={cellStyle}>{patientData.gender}</td>
              </tr>
              <tr>
                <th style={cellStyle}>Ethnicity</th>
                <td style={cellStyle}>{patientData.ethinicity}</td>
              </tr>
              <tr>
                <th style={cellStyle}>Symptom Category</th>
                <td style={cellStyle}>{patientData.symptom_category}</td>
              </tr>
              <tr>
                <th style={cellStyle}>Biases</th>
                <td style={cellStyle}>
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

const cellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default DoctorDashboard;

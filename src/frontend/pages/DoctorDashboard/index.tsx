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
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>
      <div className="form-group">
        <input
          className="form-input col-5"
          type="text"
          value={uniqueKey}
          onChange={handleInputChange}
          placeholder="Enter Patient Unique Key"
          style={{ marginRight: '10px' }}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {patientData && (
        <div className="patient-data">
          <h3>Patient Data</h3>
          <table className="table table-striped table-hover">
            <tbody>
              <tr>
                <th>Age</th>
                <td>{patientData.age}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{patientData.gender}</td>
              </tr>
              <tr>
                <th>Ethnicity</th>
                <td>{patientData.ethinicity}</td>
              </tr>
              <tr>
                <th>Symptom Category</th>
                <td>{patientData.symptom_category}</td>
              </tr>
              <tr>
                <th>Biases</th>
                <td>{patientData.biases}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const DoctorDashboard: React.FC = () => {
  const [doctor, setDoctor] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/doctor'); // if not logged in
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch dashboard');

        setDoctor(data.doctor);
        setPatients(data.patients);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div className="dashboard-container">
    <Header />
      <h2>Doctor Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {doctor && (
        <div>
          <h3>Welcome, {doctor.name}</h3>
          <p>Email: {doctor.email}</p>
        </div>
      )}

      <h4>Patients:</h4>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            {patient.name}, Age: {patient.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;

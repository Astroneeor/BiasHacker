import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PatientSurvey from './pages/Survey';
import DoctorDashboard from './pages/DoctorDashboard';
import './App.css';
import 'spectre.css/dist/spectre.min.css';

function PatientSurvey() {
  return <h2>Patient Survey Page</h2>; // placeholder
}

function DoctorDashboard() {
  return <h2>Doctor Dashboard</h2>; // placeholder
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patient" element={<PatientSurvey />} />
        <Route path="/patient/success" element={<PatientCode />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

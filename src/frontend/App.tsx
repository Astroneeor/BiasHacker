import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DoctorDashboard from './pages/DoctorDashboard';
import './App.css';
import 'spectre.css/dist/spectre.min.css';
import PatientSuccess from './pages/PatientSuccess';
import PatientSurvey from './pages/PatientSurvey';
import Homepage from './pages/Homepage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patient" element={<PatientSurvey />} />
        <Route path="/patient/success" element={<PatientSuccess />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

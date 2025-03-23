import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DoctorLogin from './pages/DoctorLogin';
import './App.css';
import 'spectre.css/dist/spectre.min.css';
import PatientSurvey from './pages/PatientSurvey';
import PatientCode from './pages/PatientSuccess';


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
        <Route path="/doctor" element={<DoctorLogin />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

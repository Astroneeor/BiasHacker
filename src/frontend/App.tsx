import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import DoctorDashboard from './pages/DoctorDashboard';
import './App.css';
import 'spectre.css/dist/spectre.min.css';
import PatientSuccess from './pages/PatientSuccess';
import PatientSurvey from './pages/PatientSurvey';


function App() {
  return (
    <Router>
      <div className = "App">
        <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patient" element={<PatientSurvey />} />
        <Route path="/patient/success" element={<PatientSuccess />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;

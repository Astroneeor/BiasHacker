import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // assuming you're using React Router

function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Example hardcoded values (replace with your own)
    const validEmail = 'doctor@example.com';
    const validPassword = '123456';

    // Hardcoded check
    if (email === validEmail && password === validPassword) {
      // Hardcoded URL redirect (or navigate to a protected route)
      navigate('/doctor-dashboard'); // or window.location.href = '/doctor-dashboard';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default DoctorLogin;

import React, { useState } from 'react';

const DoctorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      setToken(data.token);
      console.log('Login successful:', data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Doctor Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {token && <p>Logged in successfully!</p>}
    </div>
  );
};

export default DoctorLogin;

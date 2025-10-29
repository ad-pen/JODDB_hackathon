import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/styles_login.scss';
import Logo from '../assets/cover_login.png';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      if (data.success) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            email,
            role: data.role,
            username: data.username || (email ? email.split('@')[0] : 'Username'),
          })
        );
        if (data.role === 'technician') navigate('/start-task');
        else if (data.role === 'supervisor') navigate('/admin');
        else if (data.role === 'planner' || data.role === 'Planner') navigate('dashboard');
        else setError('Unknown user role');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
    console.log('Login submitted', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src={Logo} alt='JODDB'/>
        </div>

        <h1 className="login-title"></h1>
        <p className="login-subtitle">  </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder='user@domain.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
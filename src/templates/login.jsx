import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/styles_login.scss';
import Logo from '../assets/cover_login.png';

const API_URL = process.env.REACT_APP_API_URL || ''; // set REACT_APP_API_URL=http://localhost:8000 in .env or leave empty to use proxy

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
      const res = await fetch(`${API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // If server returned non-json (like HTML "Cannot POST"), read text and surface it
      const ct = res.headers.get('content-type') || '';
      let data;
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || 'Unexpected non-JSON response from server');
      }

      if (!res.ok || !data.token) {
        setError(data.detail || 'Invalid email or password');
        setLoading(false);
        return;
      }
      localStorage.setItem(
        'user',
        JSON.stringify({ token: data.token, role: data.user?.role, username: data.user?.username })
      );
      const role = (data.user?.role || '').toLowerCase();
      if (role === 'planner') navigate('/dashboard');
      else if (role === 'supervisor') navigate('/admin');
      else if (role === 'technician') navigate('/start-task');
      else navigate('/'); // fallback
    } catch (err) {
      // show the real error (e.g., HTML page text or CORS/network error)
      setError(err.message || 'Network error');
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/styles_login.scss';
import Logo from '../assets/cover_login.png';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password });
    navigate('/start-task');
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

          <button type="submit" className="login-button">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
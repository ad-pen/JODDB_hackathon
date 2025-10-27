import React, { useState } from 'react';
import './styles.scss'; // This import is correct

const LoginPage = () => {
  const [email, setEmail] = useState('hello@reallygreatsite.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { email, password });
  };

  return (
    // Use .login-container from your SCSS
    <div className="login-container">
      {/* Use .login-card */}
      <div className="login-card">
        {/* Use .logo */}
        <div className="logo">
          {/* Use .logo-text, .logo-j, .logo-main */}
          <div className="logo-text">
            <span className="logo-j">j</span>
            <span className="logo-main">ODDB</span>
            {/* The ® is added by the CSS ::after pseudo-element in .logo-text */}
          </div>
          {/* Use .logo-subtitle-ar */}
          <div className="logo-subtitle-ar">
            المركز الأردني للتصميم والتطوير
          </div>
          {/* Use .logo-subtitle-en */}
          <div className="logo-subtitle-en">
            JORDAN DESIGN & DEVELOPMENT BUREAU
          </div>
        </div>

        {/* Use .login-title */}
        <h1 className="login-title">Login</h1>
        {/* Use .login-subtitle */}
        <p className="login-subtitle">Sign in to continue</p>

        {/* Use .login-form and handle submit here */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Use .form-group */}
          <div className="form-group">
            {/* Use .form-label */}
            <label htmlFor="email" className="form-label">
              EMAIL
            </label>
            {/* Use .form-input */}
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Use .form-group */}
          <div className="form-group">
            {/* Use .form-label */}
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>
            {/* Use .form-input */}
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>

          {/* Use .login-button and set type="submit" */}
          <button type="submit" className="login-button">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
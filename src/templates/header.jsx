import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Logo from '../assets/cover_login.png';
import '../static/styles_header.scss'
import Eng from '../assets/eng.png';
import Bell from '../assets/bell.svg';
import Menu from '../assets/menu.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    if (isMenuOpen == false)
      setIsMenuOpen(true);
    else
      setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <Link to="/start-task" className="logo-container">
        <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
      </Link>
      
      <div className="user-container">
        
        <div className="user-profile">
          <div className="user-icon"><img src={Eng} alt="User Avatar" /></div>
          <span className="username">Username</span>
        </div>
        <span className="language-toggle">عربي</span>
        <div className="menu-icon">
          <img src={Bell} alt="Notifications" className="icon-bell" />
        </div>
        <button className="menu-icon menu-trigger" onClick={toggleMenu}>
          <img src={Menu} alt="Menu" className="icon-menu" />
        </button>
      </div>
      <div className={`dropdown-container ${isMenuOpen ? 'is-open' : ''}`}>
          <nav className="dropdown-menu">
          <Link to="/submitted-tasks" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Submitted Tasks</Link>
          <Link to="/start-task" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Tasks</Link>
          <Link to="/" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Logout</Link>
        </nav>
      </div>

    </header>
  );
};

export default Header;
import React, { useState } from 'react';
// 1. Import Link from react-router-dom
import { Link } from 'react-router-dom';
import Logo from '../assets/cover_login.png';
import '../static/styles_header.scss'
import Eng from '../assets/eng.png';
import Bell from '../assets/bell.svg';
import Menu from '../assets/menu.png';

/**
 * The Dropdown Menu component.
 * Now uses <Link> tags for navigation.
 */

/**
 * The main Header component.
 */
const Header = () => {
  // State to manage if the dropdown is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    if (isMenuOpen == false)
      setIsMenuOpen(true);
    else
      setIsMenuOpen(false);
  };

  return (
    // We add position: relative here so the absolute dropdown is positioned correctly
    <header className="header">
      {/* 4. Made the logo a link to the main "start-task" page */}
      <Link to="/start-task" className="logo-container">
        <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
      </Link>
      
      <div className="user-container">
        
        {/* --- User Profile Group --- */}
        <div className="user-profile">
          <div className="user-icon"><img src={Eng} alt="User Avatar" /></div>
          <span className="username">Username</span>
        </div>
        {/* --------------------------- */}

        <span className="language-toggle">عربي</span>

        {/* Bell Icon */}
        <div className="menu-icon">
          <img src={Bell} alt="Notifications" className="icon-bell" />
        </div>
        
        {/* Menu Icon - converted to a <button> for accessibility */}
        <button className="menu-icon menu-trigger" onClick={toggleMenu}>
          <img src={Menu} alt="Menu" className="icon-menu" />
        </button>
      </div>
      
      {/* This container holds the dropdown. 
        We add/remove the 'is-open' class to trigger the animation.
      */}
      <div className={`dropdown-container ${isMenuOpen ? 'is-open' : ''}`}>
          <nav className="dropdown-menu">
          {/* 2. Changed <a> to <Link> and href to to="" */}
          <Link to="/submitted-tasks" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Submitted Tasks</Link>
          <Link to="/start-task" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Tasks</Link>
          {/* 3. Logout link now points to the login page (path="/") */}
          <Link to="/" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Logout</Link>
        </nav>
      </div>

    </header>
  );
};

export default Header;
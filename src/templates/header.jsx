import React, { useState } from 'react';
import Logo from '../assets/cover_login.png';
import '../static/styles_header.scss'
import Eng from '../assets/eng.png';
import Bell from '../assets/bell.svg';
import Menu from '../assets/menu.png';

/**
 * The Dropdown Menu component.
 * It's rendered by the Header.
 */
const DropdownMenu = () => (
  <nav className="dropdown-menu">
    <a href="#" className="dropdown-item">Submitted Tasks</a>
    <a href="#" className="dropdown-item">Tasks</a>
    <a href="#" className="dropdown-item">Logout</a>
  </nav>
);

/**
 * The main Header component.
 */
const Header = () => {
  // State to manage if the dropdown is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // We add position: relative here so the absolute dropdown is positioned correctly
    <header className="header">
      <div className="logo-container">
        <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
      </div>
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
        <DropdownMenu />
      </div>

    </header>
  );
};

export default Header;

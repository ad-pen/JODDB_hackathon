import React from 'react';
import Logo from '../assets/cover_login.png';
import '../static/styles_header.scss'

const Header = () => (
  <header className="header">
    <div className="logo-container">
      <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
    </div>
    <div className="user-container">
      <div className="user-icon">[User Icon]</div>
      <span className="username">Username</span>
      <span className="language-toggle">عربي</span>
      <div className="menu-icon">[Menu]</div>
      {/* Per your description, the "notifications" and "submitted tasks" 
        buttons would be rendered inside this menu when clicked.
      */}
    </div>
  </header>
);


export default Header;
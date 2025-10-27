import React from 'react';
import Logo from '../assets/cover_login.png';
import '../static/styles_header.scss'
import Eng from '../assets/eng.png';
import Bell from '../assets/bell.svg';
import Menu from '../assets/menu.png';
const Header = () => (
  <header className="header">
    <div className="logo-container">
      <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
    </div>
    <div className="user-container">
      
      {/* --- This is the new group --- */}
      <div className="user-profile">
        <div className="user-icon"><img src={Eng} /></div>
        <span className="username">Username</span>
      </div>
      {/* --------------------------- */}

      <span className="language-toggle">عربي</span>
        <div className="menu-icon"><img src={Bell} alt="bell ring ring" /></div>
      <div className="menu-icon"><img src={Menu} /></div>
      
    </div>
  </header>
);

export default Header;

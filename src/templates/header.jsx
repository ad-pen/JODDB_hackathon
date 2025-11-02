import React, { useState, useEffect } from 'react';
// 1. Import Link from react-router-dom
import { Link } from 'react-router-dom';
import Logo from '../assets/cover_login.png';
import '../static/styles_header.scss'
import Eng from '../assets/eng.png';
import Bell from '../assets/bell.svg';
import Menu from '../assets/menu.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [whatInTheMenu, setWhatInTheMenu] = useState([]);
  const [username, setUsername] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      return u?.username || u?.email || 'Username';
    } catch {
      return 'Username';
    }
  });

  // helper to map role -> menu keys
  const setMenuForRole = (role) => {
    if (!role) return ['logout'];
    const r = String(role).toLowerCase();
    if (r === 'planner' || r === 'planer')
      return ['dashboard', 'productivity', 'utilization', 'efficiency', 'logout'];
    if (r === 'supervisor')
      return ['admin', 'logout'];
    if (r === 'technician')
      return ['start-task', 'submitted-tasks', 'logout'];
    return ['logout'];
  };

  const getUserFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const u = getUserFromLocalStorage();
    setUsername(u?.username || u?.email || 'Username');
    setWhatInTheMenu(setMenuForRole(u?.role));

    const onStorage = (e) => {
      if (e.key === 'user') {
        const nu = getUserFromLocalStorage();
        setUsername(nu?.username || nu?.email || 'Username');
        setWhatInTheMenu(setMenuForRole(nu?.role));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Function to toggle the menu state
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // map menu keys to routes & labels
  const menuMap = {
    'submitted-tasks': { to: '/submitted-tasks', label: 'Submitted Tasks' },
    'start-task': { to: '/start-task', label: 'Tasks' },
    'admin': { to: '/admin', label: 'Admin' },
    'dashboard': { to: '/dashboard', label: 'Dashboard' },
    'productivity': { to: '/productivity', label: 'Productivity' },
    'utilization': { to: '/utilization', label: 'Utilization' },
    'efficiency': { to: '/efficiency', label: 'Efficiency' },
    'logout': { to: '/', label: 'Logout' },
  };

  return (
    <header className="header">
        <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
      <div className="user-container">
        
        <div className="user-profile">
          <div className="user-icon"><img src={Eng} alt="User Avatar" /></div>
          <span className="username">{username}</span>
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
            {whatInTheMenu.map(key => {
              const item = menuMap[key];
              if (!item) return null;
              return (
                <Link key={key} to={item.to} className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
      </div>

    </header>
  );
};

export default Header;
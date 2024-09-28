import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import { motion } from 'framer-motion'; // Import Framer Motion
import './component-styles/Sidebar.css'; // External CSS for styling

const Sidebar = () => { 
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [name, setName] = useState(''); // State for user's name
  const [badgeNumber, setBadgeNumber] = useState(''); // State for user's badge number

  // Check localStorage for login state and user details when Sidebar mounts
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    if (storedName && storedBadgeNumber) {
      setName(storedName); // Set name from localStorage
      setBadgeNumber(storedBadgeNumber); // Set badgeNumber from localStorage
      setIsLoggedIn(true); // Set logged in state
    }
  }, []);

  const sidebarVariants = {
    hidden: { x: -250 },
    visible: { x: 0 },
  };

  return (
    <motion.aside
      className={`sidebar ${theme}`}
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      transition={{ type: 'tween', stiffness: 300 }}
    >
      <div className="sidebar-header">
        <h1>LawAI</h1>
        <span className="material-icons">gavel</span>
      </div>

      {/* Display User info if logged in */}
      {isLoggedIn && (
        <div className="user-info" style={{ textAlign: 'left', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <div className="profile-icon" style={{ marginBottom: '15px' }}>
          {/* Random profile icon from an external link */}
          <img 
            src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Images.png" // Example random profile image
            alt="User Profile" 
            style={{ borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover' }} 
          />
        </div>
        <p className="user-name" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{name}</p> {/* Display name */}
        <p className="user-badge-number" style={{ fontSize: '16px', color: '#6c757d' }}>Badge No : {badgeNumber}</p> {/* Display badge number */}
      </div>
      
      )}

      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/home/query" activeClassName="active">AI Lawyer</NavLink></li>
          <li><NavLink to="/bareacts" activeClassName="active">Bare Acts</NavLink></li>
          <li><NavLink to="/home/database" activeClassName="active">Database</NavLink></li>
          <li>
            {isLoggedIn ? (
              <NavLink to="/home/login" activeClassName="active">Logged In</NavLink>
            ) : (
              <NavLink to="/home/login" activeClassName="active">Login</NavLink>
            )}
          </li>
          <li><NavLink to="/home/settings" activeClassName="active">Settings</NavLink></li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;

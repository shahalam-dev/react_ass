import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Careerlyl</Link>
                {/* <div className="navbar-search">
                    <input type="text" placeholder="Search..." />
                    <button><FaSearch /></button>
                </div> */}
                <ul className="navbar-menu">
            
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/webinar">Webinar</Link></li>
                    <li className="navbar-dropdown">
                        <button className="dropdown-toggle">
                            <FaUserCircle /> Account
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to="/profile">Settings</Link></li>
                            <li><Link to="/terms">Terms</Link></li>
                            <li><Link to="/privacy">Privacy</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Nav() {

    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#about" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                    <a href="#services" className="nav-link">Services</a>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;

import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
        <nav className="site-navigation">
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/work">Work</Link></li>
                <li><Link to="/skills">Skills</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

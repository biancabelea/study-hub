import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage">
            <a className="logo" href="/home">logo aici</a>
            <nav className="navbar">
                <a href="/home" className="nav-button">Home</a>
                <a href="/register" className="nav-button">Register</a>
                <a href="/login" className="nav-button">Login</a>
            </nav>
        </div>
    );
}

export default HomePage;

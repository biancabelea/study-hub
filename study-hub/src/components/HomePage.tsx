import React from 'react';
import './HomePage.css';
import logo from '../imgs/img.png'

function HomePage() {
    return (
        <div className="homepage">
            <img className="logo" src={logo} alt="logo"></img>
            <nav className="navbar">
                <a href="/register" className="nav-button">Register</a>
                <a href="/login" className="nav-button">Login</a>
            </nav>
            <div className="homeContent">
            <p>Study Hub: Connect, Learn, Thrive. Quality tutoring at your fingertips!</p>
            <div className="buttons">
                <a href="/mentors-search" className="mentors-button">
                    <button>Search for mentors</button>
                </a>
                <a href="/resources" className="resources-button">
                    <button>Resources</button>
                </a>
            </div>
            </div>
        </div>
    );
}

export default HomePage;

import React, {useEffect, useState} from 'react';
import './HomePage.css';
import logo from '../imgs/img.png'
import Logout from "./Logout";
import {auth} from "../firebaseConfig";

function HomePage() {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="homepage">
            <img className="logo" src={logo} alt="logo"></img>
            <nav className="navbar">
                {
                    loggedIn ? (
                        <nav>
                            <Logout/>
                        </nav>
                    ) : (
                        <nav>
                            <a href="/register" className="nav-button">
                                Register
                            </a>
                            <a href="/login" className="nav-button">
                                Login
                            </a>
                        </nav>
                    )
                }
            </nav>
            <div className="homeContent">

                <p>Study Hub: Connect, Learn, Thrive. Quality tutoring at your fingertips!</p>
                <div className="buttons">
                    {
                        loggedIn ? (
                            <nav>
                                <a href="/mentors-search" className="mentors-button">
                                    <button>Search for mentors</button>
                                </a>
                                <a href="/resources" className="resources-button">
                                    <button>Resources</button>
                                </a>
                            </nav>
                        ) : (
                            <nav>

                            </nav>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;

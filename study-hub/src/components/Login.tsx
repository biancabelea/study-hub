import React, { useState } from 'react';
import './Login.css'
import { useNavigate} from "react-router-dom";
import {auth, database} from "../firebaseConfig";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedEmail, setLoggedEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const {user} = await auth.signInWithEmailAndPassword(email, password);
            const userId = user?.uid

            const userRef = database.collection('users').doc(userId)
            const userDoc = await userRef.get();

            if(userDoc.exists){
                const userData = userDoc.data();
                const userName = userData?.userName;
                const userYear = userData?.userYear;
                const userRole = userData?.userRole;
                const userSkills = userData?.userSkills;


                setLoggedEmail(email);
                setEmail('');
                setPassword('');
                setLoggedIn(true);

                if (typeof userId === "string") {
                    localStorage.setItem('userId', userId);
                }
                localStorage.setItem('userName', userName);
                localStorage.setItem('userYear', userYear);
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('userSkills', userSkills);
                navigate('/');
            }

        } catch (error) {
            console.error('Error to log in:', error);}
    };

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/register');
    }

    return (
        <div className="body-login">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="title">Login</div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div className="prompt">
                    Don't have an account?
                    <a className= "redirect" onClick={() => handleLoginClick()}> Register</a>
                </div>
            </form>
        </div>
    );
};

export default Login;

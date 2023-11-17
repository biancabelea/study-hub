import React, { useState } from 'react';
import { login } from '../api/authAPI';
import './Login.css'
import { useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const data = await login(email, password);
            console.log(data);
        } catch (error) {
            console.error(error);}
    };

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/register');
    }

    return (
        <div>
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

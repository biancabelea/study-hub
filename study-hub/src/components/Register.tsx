import React, {useState} from 'react';
import {IUser} from '../dto/IUser';
import './Register.css';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate} from 'react-router-dom';
import {auth, database} from "../firebaseConfig";
import firebase from "firebase/compat/app";

const skills = [
    'React',
    'NodeJS',
    '.NET',
    'Java',
    'Python',
    'C++',
    'JavaScript',
    'Ruby',
    'Swift',
    'HTML',
    'CSS',
    'Angular',
    'Vue',
    'Django',
    'REST API',
    'Kotlin',
    'Git',
    'Agile',
    'SQL',
    'NoSQL',
    'Docker',
    'Data structures',
    'Cybersecurity',
    'Networking',
    'Unit testing',
];

function Register() {

    const [user, setUser] = useState<IUser>({
        userName: '',
        userEmail: '',
        userPass: '',
        userYear: '',
        userRole: '',
        userSkills: []
    });

    const [value, setValue] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        if (name === 'userName' || name === 'userEmail' || name === 'userPass') {
            setUser({...user, [name]: value});
        } else if (name === 'userRole') {
            setUser({...user, userRole: value});
        } else if (name === 'userYear') {
            setUser({...user, userYear: value});
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authUser = await auth.createUserWithEmailAndPassword(user.userEmail, user.userPass);
            const userId = authUser.user?.uid;
            const userRef = database.collection('users').doc(userId);
            const userData = {
                userName: user.userName,
                userEmail: user.userEmail,
                userYear: user.userYear,
                userRole: user.userRole,
                userSkills: value,
            };

            await userRef.set(userData)
            navigate('/login');
            console.log('Registration successful', authUser);
        } catch (error) {
            console.error('Registration failed', error);
        }
    };


    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleGoBackClick =()=>{
        navigate('/');
    }

    return (
        <div className="body-register">
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="title">Create an account</div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="userName" value={user.userName} onChange={handleChange}
                           required/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="userEmail" value={user.userEmail} onChange={handleChange}
                           required/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="userPass" value={user.userPass} onChange={handleChange}
                           required/>
                </div>

                <div>
                    <label htmlFor="yearOfStudy">Year of Study:</label>
                    <select id="year" name="userYear" value={user.userYear} onChange={handleChange} required>
                        <option value="" disabled selected>Select a year</option>
                        <option value="1st Bachelor">1st Bachelor</option>
                        <option value="2nd Bachelor">2nd Bachelor</option>
                        <option value="3rd Bachelor">3rd Bachelor</option>
                        <option value="4th Bachelor">4th Bachelor</option>
                        <option value="1st Masters">1st Masters</option>
                        <option value="2nd Masters">2nd Masters</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="role">Role:</label>
                    <select id="role" name="userRole" value={user.userRole} onChange={handleChange} required>
                        <option value="" disabled selected>Select a role</option>
                        <option value="Student">Student</option>
                        <option value="Mentor">Mentor</option>
                    </select>
                </div>

                <div>
                    {user.userRole === 'Mentor' && (
                        <>
                            <label>Skills:</label>
                            <Autocomplete
                                multiple
                                id="fixed-tags-demo"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                options={skills.sort()}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            label={option}
                                            {...getTagProps({index})}
                                        />
                                    ))
                                }
                                style={{backgroundColor: 'white'}}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </>
                    )}
                </div>
                <button type="submit">Register</button>
                <div className="prompt">
                    Already have an account?
                    <a className="redirect" onClick={() => handleLoginClick()}> Login</a>
                </div>

                <a className="go-back" onClick={()=> handleGoBackClick()}>
                    <button>Back</button>
                </a>
            </form>
        </div>
    );
};

export default Register;

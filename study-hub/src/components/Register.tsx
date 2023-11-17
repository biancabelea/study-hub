import React, { useState } from 'react';
import { IUser } from '../dto/IUser';
import { registerUser } from '../api/userAPI';
import './Register.css';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const skills = [
    'React',
    'Node',
    '.NET'
];

function Register () {
    const [user, setUser] = useState<IUser>({
        userName: '',
        userEmail: '',
        userPass: '',
        userYear: '',
        userRole: '',
        userSkills: []
    });

    const [value, setValue] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setUser({ ...user, userRole: value });
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setUser({ ...user, userYear: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await registerUser(user);
            console.log('Registration successful', response);
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div>

        <form className="registration-form" onSubmit={handleSubmit}>
            <div className="title">Create an account</div>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={user.userName} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={user.userEmail} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={user.userPass} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="yearOfStudy">Year of Study:</label>
                <select id="year" name="year" value={user.userYear} onChange={handleYearChange} required>
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
                <select id="role" name="role" value={user.userRole} onChange={handleRoleChange} required>
                    <option value="" disabled selected>Select a role</option>
                    <option value="Student">Student</option>
                    <option value="Mentor">Mentor</option>
                </select>
            </div>

            <div>
                <label>Skills:</label>
                <Autocomplete
                    multiple
                    id="fixed-tags-demo"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    options={skills}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    style={{ backgroundColor: 'white' }}
                    renderInput={(params) => (
                        <TextField {...params}/>
                    )}
                />
            </div>

            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { IUser } from '../dto/IUser';

import { registerUser } from '../api/userAPI';

const Register: React.FC = () => {
    const [user, setUser] = useState<IUser>({
        userName: '',
        userEmail: '',
        userPass: '',
        userYear: '',
        userRole: '',
        userSkills: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setUser({ ...user, userRole: value });
    };

    const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUser({ ...user, userSkills: value.split(',').map(skill => skill.trim()) });
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
        <form onSubmit={handleSubmit}>
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
                <input type="text" id="yearOfStudy" name="yearOfStudy" value={user.userYear} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" value={user.userRole} onChange={handleRoleChange} required>
                    <option value="Student">Student</option>
                    <option value="Mentor">Mentor</option>
                </select>
            </div>

            <div>
                <label htmlFor="skills">Skills:</label>
                <input type="text" id="skills" name="skills" placeholder="Enter skills separated by commas" onChange={handleSkillChange} />
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

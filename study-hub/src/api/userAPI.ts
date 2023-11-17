import { IUser } from '../dto/IUser';

const API_URL = 'http://localhost:5000/api/users/';

export const registerUser = async (userData: IUser) => {
    try {
        const response = await fetch(API_URL + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};

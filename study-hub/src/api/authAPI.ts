// Adjust to your backend API
const API_URL = 'http://localhost:5000/api/auth/';

export const login = async (email: string, password: string) => {
    const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred during login.');
    }

    return response.json();
};

import React, { useState } from 'react';
import { URL } from '../const';
import { useDispatch } from 'react-redux';
import { login, signUp } from '../redux/slices/authSlices';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
    username: string;
    password: string;
}

type ErrorType = string | null;

export const AuthForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                const newUser: User = { username, password };

                const response = await axios.get(`${URL}/users`, {
                    params: { username },
                });

                if (response.data.length > 0) {
                    setError('Username already exists. Please choose another one.');
                    return;
                }
let token = "test"
                const createResponse = await axios.post(`${URL}/users`, newUser);
                dispatch(signUp({ user: createResponse.data },token));
                resetForm();
            } else {
                const response = await axios.get(`${URL}/users`, {
                    params: { username, password },
                });

                const user = response.data.find(
                    (user: User) => user.username === username && user.password === password
                );

                if (user) {
                    let token = "test"
                    dispatch(login({ user ,token}))
                    navigate('/dashboard')
                    resetForm();
                } else {
                    setError('Invalid username or password');
                }
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setError('An error occurred during authentication.');
        }
    };

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setError(null);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
            </button>
        </div>
    );
};

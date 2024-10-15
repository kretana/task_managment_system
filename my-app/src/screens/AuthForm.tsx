import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";

export const AuthForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            await dispatch(login({ username, password })).unwrap();
            navigate('/dashboard');  // Navigate to dashboard after successful login
        } catch (error: any) {
            setLoading(false);
            setErrorMessage('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br px-4">
            <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold  mb-8 text-center">
                    Log In
                </h2>
                <form onSubmit={handleLogin} className="space-y-8">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition duration-300 ease-in-out hover:shadow-md"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition duration-300 ease-in-out hover:shadow-md"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-center text-sm">
                            {errorMessage}
                        </p>
                    )}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

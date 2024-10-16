import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { login } from "../redux/slices/auth/authThunk";
import {RootState} from "../redux/store";
import { AppDispatch } from "../redux/store";
import Input from "../components/common/Input";
import Button from "../components/common/Button"

export const AuthForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: RootState | any) => state.auth);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await dispatch(login({ username, password })).unwrap();
            navigate('/dashboard');
        } catch (error: any) {
            console.log('Failed to login. Please check your credentials.');
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
                        <Input
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="mt-4"
                            labelClassName="text-black"
                            inputClassName="mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-4"
                            labelClassName="text-black"
                            inputClassName="mt-1 block w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-center text-sm">
                            Failed to login. Please check your credentials.
                        </p>
                    )}
                    <div className="flex items-center justify-center">
                        <Button
                            label={loading ? 'Loading...' : 'Submit'}
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

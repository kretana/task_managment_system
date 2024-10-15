import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../../config/const'

interface Credentials {
    username: string;
    password: string;
}

interface LoginResponse {
    user: {
        id: string;
        name: string;
        role: string;
    };
    token: string;
}

export const login = createAsyncThunk<LoginResponse, Credentials>(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.get(`${URL}/users`, {
                params: {
                    username: credentials.username,
                    password: credentials.password
                }
            });

            const user = response.data[0];
            if (user) {
                return {
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    },
                    token: user.token
                };
            } else {
                return thunkAPI.rejectWithValue('Invalid credentials');
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue('Failed to log in');
        }
    }
);


// Log out by clearing localStorage
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('token');
    }
);

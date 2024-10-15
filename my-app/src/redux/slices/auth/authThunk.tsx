import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../../../config/const'



interface User {
    id: string;
    name: string;
    role: string;
}

export const login = createAsyncThunk<
    { user: User; token: string },
    { username: string; password: string },
    { rejectValue: string }
    >('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response =  await axios.get(`${URL}/users`, {
            params: {
                username: credentials.username,
                password: credentials.password
            }
        });
        return { user: response.data.user, token: response.data.token };
    } catch (error) {
        return rejectWithValue('Failed to log in');
    }
});


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('token');
    }
);

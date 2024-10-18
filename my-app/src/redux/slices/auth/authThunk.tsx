import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../../../config/const'
import {User} from "../../../types/authTypes";


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
        return { user: response.data, token: response.data[0].token };
    } catch (error) {
        return rejectWithValue('Failed to log in');
    }
});


export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'auth/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/users`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch users');
        }
    }
);




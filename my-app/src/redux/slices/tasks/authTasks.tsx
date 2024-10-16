import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../../../config/const'

interface TaskUpdate {
    id: number;
    status: string;
}


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get(`${URL}/tasks`);
    return response.data;
});

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, status }: TaskUpdate) => {
        await axios.patch(`${URL}/tasks/${id}`, {
            status,
        });

        return { id, status };
    }
);

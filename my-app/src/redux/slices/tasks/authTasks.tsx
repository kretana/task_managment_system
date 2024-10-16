import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../../../config/const'
import {Task} from "./taskSlice";

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


export const getTaskById = createAsyncThunk('tasks/getTaskById', async (id: number) => {
    try {
        const response = await axios.get(`${URL}/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch task');
    }
});


export const editTaskById = createAsyncThunk(
    'tasks/editTask',
    async (taskData: Task) => {
        const response = await axios.put(`${URL}/tasks/${taskData.id}`, taskData);
        return response.data;
    }
);

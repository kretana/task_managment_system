import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../../../config/const'
import {Task, TaskUpdate} from "../../../types/taskTypes";


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ({ createdAt, completedAt , searchTerm}: { createdAt?: string, completedAt?: string , searchTerm?: string}) => {
    let url = `${URL}/tasks`;

    const params = new URLSearchParams();
    if (createdAt) {
        params.append('createdAt', createdAt);
    }
    if (completedAt) {
        params.append('completedAt', completedAt);
    }

    if (searchTerm) {
        params.append('searchTerm', searchTerm);
    }
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const response = await axios.get(url);
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


export const deleteTaskById = createAsyncThunk(
    'tasks/deleteTaskById',
    async (taskId: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${URL}/tasks/${taskId}`);
            return taskId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to edit task");

        }
    }
);

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (newTask: Task, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL}/tasks`, newTask, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create task");
        }
    }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, updateTask } from './authTasks';

export interface Task {
    id: number;
    name: string;
    status: string;
}

interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<{ id: number; status: string }>) => {
                state.status = 'succeeded';
                const { id, status } = action.payload;
                const existingTask = state.tasks.find((task) => task.id === id);
                if (existingTask) {
                    existingTask.status = status;
                }
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update task';
            });
    },
});

export default tasksSlice.reducer;
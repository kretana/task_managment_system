import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, updateTask } from './authTasks';

interface Task {
    id: number;
    name: string;
    status: string;
}

interface TasksState {
    tasks: Task[];
    status: string;
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
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const existingTask = state.tasks.find((task) => task.id === id);
                if (existingTask) {
                    existingTask.status = status;
                }
            });
    },
});

export default tasksSlice.reducer;

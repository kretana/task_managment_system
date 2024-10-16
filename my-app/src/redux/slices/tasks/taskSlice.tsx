import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {editTaskById, fetchTasks, getTaskById, updateTask} from './authTasks';

export interface Task {
    id: number;
    name: string;
    status: string;
    description: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
}

interface TasksState {
    tasks: Task[];
    selectedTask?: Task;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    selectedTask: undefined,
    status: 'idle',
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all the tasks
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
            // get task by id
            .addCase(getTaskById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
                state.status = 'succeeded';
                state.selectedTask = action.payload;
                state.error = null;
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch the task';
            })
            // update a specific task
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
            })
            // edit task by id,put
            .addCase(editTaskById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
                state.status = 'succeeded';
                const updatedTask = action.payload;
                const index = state.tasks.findIndex(task => task.id === updatedTask.id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
                state.selectedTask = updatedTask;
                state.error = null;
            })
            .addCase(editTaskById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to edit task';
            });
    },
});

export default tasksSlice.reducer;

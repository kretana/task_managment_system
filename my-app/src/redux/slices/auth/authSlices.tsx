import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllUsers, login } from './authThunk';
import { AuthState, User } from "../../../types/authTypes";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    token: null,
    isAuthenticated: false,
    totalUsers: [],
    developers: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem("authToken", action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to log in';
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUsers = action.payload;
                // Filter developers from the fetched users
                state.developers = action.payload.filter(user => user.role === 'developer');
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch users';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

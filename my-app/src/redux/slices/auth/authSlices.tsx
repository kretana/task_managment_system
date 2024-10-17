import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './authThunk';
import {AuthState, User} from "../../../types/authTypes";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    token: null,
    isAuthenticated: false,
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

                localStorage.setItem('authToken', action.payload.token);
            })
            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to log in';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

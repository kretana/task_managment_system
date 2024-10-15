import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import { login } from '../actions/authActions';

interface User {
    id: string;
    name: string;
    role: string;
}

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: User | null;
    token: string | null;
}

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
            .addCase(login.pending, (state: Draft<AuthState>) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;

                // Save the token to localStorage
                localStorage.setItem('authToken', action.payload.token);
            })

            .addCase(login.rejected, (state: Draft<AuthState>, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to log in';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;



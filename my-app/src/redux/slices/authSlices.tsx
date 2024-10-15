import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: { id: number; username: string } | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};


interface User {
    id: number;
    username: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state,action: PayloadAction<{ user: { id: number; username: string }; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout(state,action: PayloadAction<{ user: { id: number; username: string }; token: string }>) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        signUp(state, action:any) {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
    },
});

export const { login, logout, signUp } = authSlice.actions;
export default authSlice.reducer;

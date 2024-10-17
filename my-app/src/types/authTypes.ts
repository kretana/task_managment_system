export interface User {
    id: string;
    name: string;
    role: string;
}


export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: User | null;
    token: string | null;
}
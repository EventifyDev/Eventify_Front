import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../config/axios';
import { TokenService } from '../services/token.service';

interface LoginResponse {
    access_token: string;
    user: any;
}

interface User {
    _id: string;
    email: string;
    username: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterResponse {
    user: User;
}

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post<RegisterResponse>('/auth/register', credentials);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            return rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post<LoginResponse>('/auth/login', credentials);
            const { access_token, user } = response.data;

            // Stockage du token
            TokenService.setToken(access_token);

            return { user };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const getProfile = createAsyncThunk(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<User>('/auth/profile');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as User | null,
        isAuthenticated: TokenService.isAuthenticated(),
        error: null as string | null,
        registrationSuccess: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.registrationSuccess = false;
            TokenService.clearToken();
        },
        clearError: (state) => {
            state.error = null;
        },
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.error = null;
                state.registrationSuccess = false;
            })
            .addCase(register.fulfilled, (state) => {
                state.registrationSuccess = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string;
                state.registrationSuccess = false;
            })

            // Login
            .addCase(login.pending, (state) => {
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError, clearRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: { auth: ReturnType<typeof authSlice.reducer> }) => state.auth;

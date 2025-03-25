import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService, LoginCredentials, RegisterCredentials, User } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Permission } from '../types/role.type';

export const register = createAsyncThunk('auth/register', async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
        const response = await AuthService.register(credentials);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
        const response = await AuthService.login(credentials);
        if ('requiresDeviceVerification' in response) {
            return { requiresDeviceVerification: true, email: response.email };
        }
        return { user: response.user };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const getProfile = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
    try {
        return await AuthService.getProfile();
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ email, otpCode }: { email: string; otpCode: string }, { rejectWithValue }) => {
    try {
        return await AuthService.verifyOtp(email, otpCode);
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
});

export const resendOtp = createAsyncThunk('auth/resendOtp', async (email: string, { rejectWithValue }) => {
    try {
        return await AuthService.resendOtp(email);
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to resend OTP');
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string, { rejectWithValue }) => {
    try {
        return await AuthService.forgotPassword(email);
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Password reset request failed');
    }
});

export const verifyDevice = createAsyncThunk('auth/verifyDevice', async ({ email, otpCode }: { email: string; otpCode: string }, { rejectWithValue }) => {
    try {
        const response = await AuthService.verifyDevice(email, otpCode);
        return { user: response.user };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
});

export const selectHasPermission = (permission: Permission) => (state: { auth: AuthState }) => {
    const role = state.auth.user?.role;
    if (!role) return false;

    if (role.name === 'Super Admin') return true;
    return (role.permissions || []).includes(permission);
};

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    registrationSuccess: boolean;
    otpVerified: boolean;
    passwordResetRequested: boolean;
    deviceVerified: boolean;
    loading: boolean;
    requiresDeviceVerification: boolean;
    deviceVerificationEmail: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: TokenService.isAuthenticated(),
    error: null,
    registrationSuccess: false,
    otpVerified: false,
    passwordResetRequested: false,
    deviceVerified: false,
    loading: false,
    requiresDeviceVerification: false,
    deviceVerificationEmail: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            AuthService.logout();
            state.user = null;
            state.isAuthenticated = false;
            state.registrationSuccess = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
        clearOtpVerified: (state) => {
            state.otpVerified = false;
        },
        clearPasswordResetRequested: (state) => {
            state.passwordResetRequested = false;
        },
        clearDeviceVerified: (state) => {
            state.deviceVerified = false;
        },
        setGoogleAuth: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            AuthService.googleLogin(accessToken, refreshToken);
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.error = null;
                state.registrationSuccess = false;
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.registrationSuccess = true;
                state.error = null;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.registrationSuccess = false;
                state.loading = false;
            })

            // Login
            .addCase(login.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                if ('requiresDeviceVerification' in action.payload) {
                    state.requiresDeviceVerification = true;
                    state.deviceVerificationEmail = action.payload.email || null;
                } else {
                    state.isAuthenticated = true;
                    state.user = action.payload.user || null;
                }
                state.error = null;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.loading = false;
            })

            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload || null;
                state.loading = false;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.loading = false;
            })

            // Verify OTP
            .addCase(verifyOtp.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpVerified = true;
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.loading = false;
            })

            // Resend OTP
            .addCase(resendOtp.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.loading = false;
            })

            // Forgot Password
            .addCase(forgotPassword.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.passwordResetRequested = true;
                state.loading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.loading = false;
            })

            // Verify Device
            .addCase(verifyDevice.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(verifyDevice.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user || null;
                state.deviceVerified = true;
                state.requiresDeviceVerification = false;
                state.deviceVerificationEmail = null;
                state.loading = false;
            })
            .addCase(verifyDevice.rejected, (state, action) => {
                state.error = action.payload ? (action.payload as string) : null;
                state.loading = false;
            });
    },
});

export const { logout, clearError, clearRegistrationSuccess, clearOtpVerified, clearPasswordResetRequested, clearDeviceVerified, setGoogleAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectRegistrationSuccess = (state: { auth: AuthState }) => state.auth.registrationSuccess;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;

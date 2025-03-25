import { api } from '../config/axios';
import { TokenService } from '../services/token.service';
import { Role } from '../types/role.type';
import { RoleService } from './role.service';

export interface User {
  _id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  role?: Role;
  createdAt: string;
  updatedAt: string;
  verifiedDevices: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
}

export const AuthService = {
  async register(credentials: RegisterCredentials): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/register', credentials);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse | { requiresDeviceVerification: true; email: string }> {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.requiresDeviceVerification) {
        return { requiresDeviceVerification: true, email: response.data.email };
      }
      
      if (response.data.accessToken) {
        TokenService.setToken(response.data.accessToken);
      }
      if (response.data.refreshToken) {
        TokenService.setRefreshToken(response.data.refreshToken);
      }
      
      return {
        ...response.data,
        user: {
          _id: response.data.userId,
          email: response.data.email,
          username: ''
        }
      };
    } catch (error: any) {
      if (error.response?.data?.requiresDeviceVerification) {
        return { requiresDeviceVerification: true, email: credentials.email };
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    TokenService.clearTokens();
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    const userData = response.data;
    
    if (typeof userData.role === 'string') {
      const roleService = RoleService.getInstance();
      const roleDetails = await roleService.getRoleById(userData.role);
      if (roleDetails) {
        userData.role = roleDetails;
      }
    }
    
    return userData;
  },

  async verifyOtp(email: string, otpCode: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>('/auth/verify-otp', {
      email,
      otpCode
    });
    return response.data;
  },

  async resendOtp(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>('/auth/resend-otp', {
      email
    });
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>('/auth/forgot-password', {
      email
    });
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>('/auth/reset-password', data);
    return response.data;
  },

  async verifyDevice(email: string, otpCode: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/verify-device', { email, otpCode });
    
    if (response.data.accessToken) {
      TokenService.setToken(response.data.accessToken);
    }
    if (response.data.refreshToken) {
      TokenService.setRefreshToken(response.data.refreshToken);
    }
    
    return response.data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh');
    
    if (response.data.accessToken) {
      TokenService.setToken(response.data.accessToken);
    }
    if (response.data.refreshToken) {
      TokenService.setRefreshToken(response.data.refreshToken);
    }
    
    return response.data;
  },

  async googleLogin(accessToken: string, refreshToken: string): Promise<void> {
    TokenService.setToken(accessToken);
    TokenService.setRefreshToken(refreshToken);
  },

  async updateProfile(data: UpdateProfileDto): Promise<User> {
    const profile = await this.getProfile();
    const response = await api.put<User>(`/users/${profile._id}`, data);
    return response.data;
  },

};
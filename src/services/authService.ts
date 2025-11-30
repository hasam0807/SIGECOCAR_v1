import apiClient from '../lib/api';
import { AuthResponse, LoginRequest } from '../types/api';

export const authService = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const payload: LoginRequest = {
      username,
      password,
    };

    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },
};

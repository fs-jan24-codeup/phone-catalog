import { AxiosResponse } from 'axios';
import { authClient } from '../http/authClient';

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  // Define the structure of the response as needed
  accessToken: string;
  refreshToken?: string;
}

function register({ email, password }: AuthCredentials): Promise<AxiosResponse<AuthResponse>> {
  return authClient.post<AuthResponse>('/registration', { email, password });
}

function login({ email, password }: AuthCredentials): Promise<AxiosResponse<AuthResponse>> {
  return authClient.post<AuthResponse>('/login', { email, password });
}

function logout(): Promise<AxiosResponse<void>> {
  return authClient.post<void>('/logout');
}

function refresh(): Promise<AxiosResponse<AuthResponse>> {
  return authClient.get<AuthResponse>('/refresh');
}

export const authService = { register, login, logout, refresh };

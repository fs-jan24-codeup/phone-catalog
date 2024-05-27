import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

export const httpClient: AxiosInstance = createClient();

httpClient.interceptors.request.use(onRequest as any);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request: AxiosRequestConfig): AxiosRequestConfig {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request as InternalAxiosRequestConfig; // Cast the request as InternalAxiosRequestConfig
}

function onResponseSuccess<T>(response: AxiosResponse<T>): T {
  return response.data;
}

async function onResponseError(error: AxiosError): Promise<AxiosResponse | void> {
  const originalRequest = error.config;

  if (!originalRequest || error.response?.status !== 401) {
    throw error;
  }

  try {
    const response = await authService.refresh();
    const accessToken = response.data.accessToken;
    accessTokenService.save(accessToken);

    if (originalRequest.headers) {
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return httpClient.request(originalRequest);
  } catch (refreshError) {
    throw refreshError;
  }
}

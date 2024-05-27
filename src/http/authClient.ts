import { AxiosInstance, AxiosResponse } from 'axios';
import { createClient } from './index';

export const authClient: AxiosInstance = createClient();

authClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse['data'] => response.data
);
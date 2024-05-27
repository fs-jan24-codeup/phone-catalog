import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: process.env.VITE_API_URL,
    withCredentials: true,
  });
}
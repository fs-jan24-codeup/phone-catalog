import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loginRequest, registerRequest } from '../utils/fetchData';
import { accessTokenService } from '../services/accessTokenService';

interface AuthContextType {
  user: User | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: number;
  email: string;
  name?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }
  }, [user]);

  const login = async (userData: { email: string; password: string }) => {
    const response = await loginRequest(userData);
    if (response && response.token) {
      accessTokenService.save(response.token);
      setUser(response.user);
      localStorage.setItem('userData', JSON.stringify(response.user));
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name?: string;
  }) => {
    await registerRequest(userData);
  };

  const logout = () => {
    accessTokenService.remove();
    setUser(null);
    localStorage.removeItem('userData');
    window.location.reload(); 
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

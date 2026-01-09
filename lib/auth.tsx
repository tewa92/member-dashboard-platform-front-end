'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from './api';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  image: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = api.getToken();
      if (token) {
        const userData = await api.getMe();
        setUser(userData);
      }
    } catch (error) {
      api.setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = api.getGoogleAuthUrl();
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  const setToken = async (token: string) => {
    api.setToken(token);
    try {
      const userData = await api.getMe();
      setUser(userData);
    } catch (error) {
      api.setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

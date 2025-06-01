import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (provider: 'google' | 'apple' | 'email', email?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('social-swift-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an auth API
  const login = async (provider: 'google' | 'apple' | 'email', email?: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock user based on provider
      const mockUser: User = {
        id: crypto.randomUUID(),
        provider,
        email: email || `user@example.com`
      };
      
      // Add name and image for Google/Apple
      if (provider === 'google') {
        mockUser.name = 'Google User';
        mockUser.image = 'https://randomuser.me/api/portraits/women/68.jpg';
      } else if (provider === 'apple') {
        mockUser.name = 'Apple User';
        mockUser.image = 'https://randomuser.me/api/portraits/men/32.jpg';
      }
      
      setUser(mockUser);
      localStorage.setItem('social-swift-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('social-swift-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
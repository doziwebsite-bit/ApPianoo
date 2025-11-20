import React, { createContext, useContext, useState } from 'react';
import { User, AuthProvider, Order } from '../types';
import { MOCK_ORDERS } from '../constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (provider: AuthProvider) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProviderContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // In a real app, fetch orders from DB. Here we use mock.
  const [orders, setOrders] = useState<Order[]>([]); 

  const login = async (provider: AuthProvider) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'user-123',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatarUrl: 'https://picsum.photos/seed/user/100/100'
    };
    
    setUser(mockUser);
    setOrders(MOCK_ORDERS); // Load mock orders on login
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      orders, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProviderContext');
  return context;
};
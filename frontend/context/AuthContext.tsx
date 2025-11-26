import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthProvider, Order } from '../types';
import { MOCK_ORDERS } from '../constants';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (provider: AuthProvider, userData?: Partial<User>) => Promise<void>;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProviderContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // In a real app, fetch orders from DB. Here we use mock.
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders(prev => {
      // Avoid duplicates
      if (prev.some(o => o.orderId === order.orderId)) return prev;
      return [order, ...prev];
    });
  };

  const login = async (provider: AuthProvider, userData?: Partial<User>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Use provided user data or fallback to mock user
    const newUser: User = {
      id: userData?.id || 'user-123',
      name: userData?.name || 'Utilisateur Démo',
      email: userData?.email || 'demo@example.com',
      avatarUrl: userData?.avatarUrl || 'https://ui-avatars.com/api/?name=User&background=random'
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setOrders(MOCK_ORDERS); // Load mock orders on login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setOrders([]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      orders,
      login,
      logout,
      addOrder
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
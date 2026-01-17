import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthProvider, Order } from '../types';
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

  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders when user changes
  useEffect(() => {
    if (user && user.id) {
      const fetchOrders = async () => {
        try {
          const response = await api.get(`/orders/user/${user.id}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      };

      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const addOrder = (order: Order) => {
    setOrders(prev => {
      // Avoid duplicates
      if (prev.some(o => o.orderId === order.orderId)) return prev;
      return [order, ...prev];
    });
  };

  const login = async (provider: AuthProvider, userData?: Partial<User>) => {
    try {
      let endpoint = '';
      let payload = {};

      if (provider === AuthProvider.GOOGLE) {
        endpoint = '/auth/google';
        payload = {
          googleId: userData?.googleId,
          email: userData?.email,
          name: userData?.name,
          avatarUrl: userData?.avatarUrl
        };
      } else {
        endpoint = '/auth/email';
        // Demo/Email login usually requires password but here we just register/login by email as per existing logic
        payload = {
          email: 'demo@example.com',
          name: 'Utilisateur Démo'
        };
      }

      const response = await api.post(endpoint, payload);

      const { user: apiUser, token } = response.data;

      // Ensure the ID is a string (it should be from backend)
      const newUser: User = {
        ...apiUser,
        id: apiUser.id || apiUser._id
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
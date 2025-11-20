import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProviderContext } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Media from './pages/Media';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Fallback for development if key is missing
const GOOGLE_CLIENT_ID = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID || "MOCK_KEY_FOR_DEV";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AuthProviderContext>
          <CartProvider>
            <HashRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </HashRouter>
          </CartProvider>
        </AuthProviderContext>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
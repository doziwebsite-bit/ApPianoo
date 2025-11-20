import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
import { ENV } from './constants';

const App: React.FC = () => {
  // Fallback if key is missing to prevent crash, but auth won't work
  const clientId = ENV.GOOGLE_CLIENT_ID || "MISSING_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={clientId}>
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
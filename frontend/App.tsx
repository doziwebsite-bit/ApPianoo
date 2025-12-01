import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { MentionsLegales, PolitiqueConfidentialite, CGU, CGV } from './pages/Legal';
import { ENV } from './constants';

const App: React.FC = () => {
  // Fallback if key is missing to prevent crash, but auth won't work
  const clientId = ENV.GOOGLE_CLIENT_ID || "MISSING_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <AuthProviderContext>
          <CartProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Navigate to="/" replace />} />
                  <Route path="/media" element={<Media />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Legal Routes */}
                  <Route path="/mentions-legales" element={<MentionsLegales />} />
                  <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                  <Route path="/cgu" element={<CGU />} />
                  <Route path="/cgv" element={<CGV />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </CartProvider>
        </AuthProviderContext>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
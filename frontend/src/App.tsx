import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Removed GoogleOAuthProvider from root
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProviderContext } from './context/AuthContext';
import Layout from './components/Layout';
import { ENV } from './constants';

// Lazy load all pages for code-splitting (reduces TBT)
const Home = React.lazy(() => import('./pages/Home'));
const Store = React.lazy(() => import('./pages/Store'));
const Media = React.lazy(() => import('./pages/Media'));
const Services = React.lazy(() => import('./pages/Services'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-white dark:bg-black" />
);

// Wrap lazy Legal components since they are named exports
const LazyMentionsLegales = React.lazy(() =>
  import('./pages/Legal').then(module => ({ default: module.MentionsLegales }))
);
const LazyPolitiqueConfidentialite = React.lazy(() =>
  import('./pages/Legal').then(module => ({ default: module.PolitiqueConfidentialite }))
);
const LazyCGU = React.lazy(() =>
  import('./pages/Legal').then(module => ({ default: module.CGU }))
);
const LazyCGV = React.lazy(() =>
  import('./pages/Legal').then(module => ({ default: module.CGV }))
);

const App: React.FC = () => {
  // Fallback if key is missing to prevent crash, but auth won't work
  const clientId = ENV.GOOGLE_CLIENT_ID || "MISSING_GOOGLE_CLIENT_ID";

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProviderContext>
          <CartProvider>
            <BrowserRouter>
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/media" element={<Media />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Legal Routes */}
                    <Route path="/mentions-legales" element={<LazyMentionsLegales />} />
                    <Route path="/politique-confidentialite" element={<LazyPolitiqueConfidentialite />} />
                    <Route path="/cgu" element={<LazyCGU />} />
                    <Route path="/cgv" element={<LazyCGV />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </CartProvider>
        </AuthProviderContext>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
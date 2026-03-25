import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ENV } from '../constants';
import { AuthProvider } from '../types';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error('No credential returned');
      }
      const decoded: any = jwtDecode(credentialResponse.credential);
      await login(AuthProvider.GOOGLE, {
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        avatarUrl: decoded.picture,
      });
      setAuthError(null);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google login error:', err);
      setAuthError(err.message || 'Échec de la connexion Google');
    }
  };

  const handleGoogleError = () => {
    setAuthError('Échec de la connexion Google.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black/20">
      <Helmet>
        <title>Connexion - Alan Paul</title>
        <meta name="description" content="Connectez-vous pour accéder à vos partitions achetées et votre espace personnel." />
      </Helmet>
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white dark:text-black" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Connexion</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Accédez à vos partitions et à votre espace personnel
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!ENV.GOOGLE_CLIENT_ID && (
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg flex items-start gap-3" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div>
                <strong>Configuration requise</strong>
                <br />
                La clé Google Client ID n'est pas configurée.
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                shape="rectangular"
                width="100%"
                text="signin_with"
                locale="fr"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg" role="alert">
                <p className="text-red-600 dark:text-red-400 text-sm text-center flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {authError}
                </p>
              </div>
            )}

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-gray-600 dark:text-gray-400 font-medium tracking-wider">Ou continuer avec</span>
              </div>
            </div>

            <button
              onClick={() => login(AuthProvider.EMAIL).then(() => navigate('/dashboard'))}
              aria-label="Connexion par email (mode démo)"
              className="w-full py-3.5 border border-gray-300 dark:border-zinc-700 rounded-lg flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-medium group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Connexion par Email (Démo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginWithProvider = () => {
  const clientId = ENV.GOOGLE_CLIENT_ID || "MISSING_GOOGLE_CLIENT_ID";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
};

export default LoginWithProvider;

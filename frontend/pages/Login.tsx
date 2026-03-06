import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ENV } from '../constants';
import { AuthProvider } from '../types';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { AlertCircle, Mail, Lock } from 'lucide-react';
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
            <Lock className="h-8 w-8 text-white dark:text-black" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Connexion</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Accédez à vos partitions et à votre espace personnel
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!ENV.GOOGLE_CLIENT_ID && (
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg flex items-start gap-3" role="alert">
              <AlertCircle className="flex-shrink-0 mt-0.5" size={16} aria-hidden="true" />
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
                  <AlertCircle size={14} aria-hidden="true" />
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
              <Mail size={18} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
              Connexion par Email (Démo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

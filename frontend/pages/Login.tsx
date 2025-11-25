import React, { useState } from 'react';
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
    <>
      <div className="mx-auto h-12 w-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
        <Lock className="h-6 w-6 text-white dark:text-black" />
      </div>
      <h2 className="mt-6 text-3xl font-serif font-bold text-gray-900 dark:text-white">Connexion</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Accédez à vos partitions et à votre espace personnel
      </p>

      <div className="mt-8 space-y-6">
        {!ENV.GOOGLE_CLIENT_ID && (
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded flex items-start gap-2">
            <AlertCircle className="flex-shrink-0" size={16} />
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
            <p className="text-red-500 text-xs text-center">{authError}</p>
          )}

          <div className="relative w-full my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500">Ou</span>
            </div>
          </div>

          <button
            onClick={() => login(AuthProvider.EMAIL).then(() => navigate('/dashboard'))}
            className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <Mail size={18} /> Connexion par Email (Démo)
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
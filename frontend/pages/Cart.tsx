import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthProvider } from '../types';
import { Trash2, Mail, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { ENV, API_CONFIG } from '../constants';

const Cart: React.FC = () => {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, login, user } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Check if keys are configured
  const isConfigured = ENV.GOOGLE_CLIENT_ID;

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      import('jwt-decode').then(({ jwtDecode }) => {
        const decoded: any = jwtDecode(credentialResponse.credential);
        login(AuthProvider.GOOGLE, {
          googleId: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          avatarUrl: decoded.picture
        }).then(() => {
          setAuthError(null);
        });
      });
    }
  };

  const handleGoogleError = () => {
    setAuthError("Échec de la connexion Google.");
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          userId: user?.id || (user as any)?._id
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Checkout error:', error);
        alert('Une erreur est survenue lors de la création de la session de paiement.');
        setIsLoading(false);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Une erreur est survenue.');
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl mb-4 opacity-90">Votre panier est vide</h2>
        <button onClick={() => navigate('/store')} className="text-blue-500 hover:underline">
          Retourner à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Panier - Alan Paul</title>
        <meta name="description" content="Votre panier d'achat de partitions Alan Paul." />
      </Helmet>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Cart Items */}
        <div>
          <h2 className="font-serif text-3xl font-bold mb-8">Votre Panier</h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg shadow-sm">
                <div className="w-20 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    width={80}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold font-serif text-lg">{item.title}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Supprimer ${item.title} du panier`}
                      className="text-red-500 hover:text-red-700 opacity-90 hover:opacity-100"
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{item.artist}</p>
                  <p className="font-medium">{item.price}€</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>
        </div>

        {/* Checkout / Auth Wall */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl h-fit border border-gray-200 dark:border-zinc-800">
          {!isConfigured && (
            <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded flex items-start gap-2" role="alert">
              <AlertCircle className="flex-shrink-0" size={16} aria-hidden="true" />
              <div>
                <strong>Configuration manquante</strong><br />
                Veuillez configurer VITE_GOOGLE_CLIENT_ID sur Netlify.
              </div>
            </div>
          )}

          {!isAuthenticated ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={24} className="text-white dark:text-black" aria-hidden="true" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Connexion requise</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-8">Pour télécharger vos partitions, vous devez créer un compte ou vous connecter.</p>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_black"
                    shape="rectangular"
                    width="100%"
                    locale="fr"
                  />
                </div>

                {authError && (
                  <p className="text-red-500 text-xs" role="alert">{authError}</p>
                )}

                <div className="relative w-full my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300 dark:border-gray-700"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-50 dark:bg-zinc-900/50 px-2 text-gray-500">Ou</span></div>
                </div>

                <button
                  onClick={() => login(AuthProvider.EMAIL).then(() => { })}
                  aria-label="Connexion par email (démo)"
                  className="w-full py-3 border border-current rounded flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <Mail size={18} aria-hidden="true" /> Connexion par Email (Démo)
                </button>
              </div>
              <p className="mt-4 text-xs text-center text-gray-600 dark:text-gray-400">En continuant, vous acceptez nos conditions générales.</p>
            </div>
          ) : (
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Paiement</h2>
              <div className="bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-zinc-800 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
                  <span className="font-medium text-sm">Connecté</span>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 truncate">{user?.email}</div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                aria-label="Procéder au paiement"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'Redirection...' : 'Payer maintenant'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthProvider } from '../types';
import { Trash2, Mail, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ENV } from '../constants';

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(ENV.STRIPE_PUBLIC_KEY);

const CheckoutForm: React.FC<{ total: number; onSuccess: () => void }> = ({ total, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    // Note: In a real app, you would call your backend here to create a PaymentIntent
    // and get the clientSecret. Since we don't have a backend yet, we simulate the UI flow.
    
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || 'An error occurred');
        setProcessing(false);
      } else {
        console.log('PaymentMethod:', paymentMethod);
        // Simulate backend processing time
        setTimeout(() => {
           setProcessing(false);
           onSuccess();
        }, 1500);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-zinc-800 p-4 rounded border border-gray-200 dark:border-zinc-700">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Traitement...' : `Payer $${total.toFixed(2)}`}
      </button>
      
      <p className="text-xs text-center opacity-50">
        Paiement sécurisé par Stripe. Vos informations bancaires ne sont jamais stockées sur nos serveurs.
      </p>
    </form>
  );
};

const Cart: React.FC = () => {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, login } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if keys are configured
  const isConfigured = ENV.GOOGLE_CLIENT_ID && ENV.STRIPE_PUBLIC_KEY;

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
       login(AuthProvider.GOOGLE).then(() => {
         setAuthError(null);
       });
    }
  };

  const handleGoogleError = () => {
    setAuthError("Échec de la connexion Google.");
  };

  const handlePaymentSuccess = () => {
    alert("Paiement validé (Simulation) ! Vous allez être redirigé.");
    clearCart();
    navigate('/dashboard');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl mb-4 opacity-50">Votre panier est vide</h2>
        <button onClick={() => navigate('/store')} className="text-blue-500 hover:underline">
          Retourner à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Cart Items */}
        <div>
          <h2 className="font-serif text-3xl font-bold mb-8">Votre Panier</h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg shadow-sm">
                <div className="w-20 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold font-serif text-lg">{item.title}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 opacity-50 hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm opacity-60 mb-2">{item.artist}</p>
                  <p className="font-medium">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout / Auth Wall */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl h-fit border border-gray-200 dark:border-zinc-800">
          {!isConfigured && (
             <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm rounded flex items-start gap-2">
               <AlertCircle className="flex-shrink-0" size={16} />
               <div>
                 <strong>Configuration manquante</strong><br/>
                 Veuillez configurer VITE_GOOGLE_CLIENT_ID et VITE_STRIPE_PUBLIC_KEY sur Netlify.
               </div>
             </div>
          )}

          {!isAuthenticated ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={24} className="text-white dark:text-black" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Connexion requise</h2>
              <p className="text-sm opacity-70 mb-8">Pour télécharger vos partitions, vous devez créer un compte ou vous connecter.</p>

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
                   <p className="text-red-500 text-xs">{authError}</p>
                )}

                <div className="relative w-full my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300 dark:border-gray-700"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-50 dark:bg-zinc-900/50 px-2 text-gray-500">Ou</span></div>
                </div>

                <button 
                  onClick={() => login(AuthProvider.EMAIL)}
                  className="w-full py-3 border border-current rounded flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <Mail size={18} /> Connexion par Email (Démo)
                </button>
              </div>
              <p className="mt-4 text-xs text-center opacity-50">En continuant, vous acceptez nos conditions générales.</p>
            </div>
          ) : (
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Paiement</h2>
              <div className="bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-zinc-800 mb-6">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                   <span className="font-medium text-sm">Connecté</span>
                </div>
                <div className="text-xs opacity-60 truncate">{useAuth().user?.email}</div>
              </div>
              
              <Elements stripe={stripePromise}>
                <CheckoutForm total={cartTotal} onSuccess={handlePaymentSuccess} />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
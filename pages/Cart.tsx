import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthProvider } from '../types';
import { Trash2, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
// NOTE: In production, ensure VITE_STRIPE_PUBLIC_KEY is set in Netlify environment variables
const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_mock_key');

// Internal Checkout Form Component to use Stripe Hooks
const CheckoutForm = ({ total, onSuccess }: { total: number, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
       setIsProcessing(false);
       return;
    }

    // 1. Create a Token (Client-side only)
    // Since we don't have a backend here to create a PaymentIntent, we use createToken
    // to demonstrate that the Stripe Element is real and working.
    const { error: stripeError, token } = await stripe.createToken(cardElement);

    if (stripeError) {
      setError(stripeError.message || 'An error occurred');
      setIsProcessing(false);
    } else {
      console.log('[Stripe Token Generated]', token);
      // Simulate Server Processing Time
      setTimeout(() => {
        onSuccess();
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-white dark:bg-white border border-gray-200 dark:border-zinc-800 rounded">
        {/* This is the REAL Stripe Element */}
        <CardElement options={{
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
        }}/>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
          {error}
        </div>
      )}

      <button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Traitement...' : `Payer $${total.toFixed(2)}`}
      </button>
      
      <p className="text-[10px] text-center opacity-50 mt-2">
        Paiement sécurisé par Stripe.
      </p>
    </form>
  );
};

const Cart: React.FC = () => {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, login } = useAuth();
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setIsProcessingAuth(true);
    await login(AuthProvider.EMAIL);
    setIsProcessingAuth(false);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsProcessingAuth(true);
    await login(AuthProvider.GOOGLE, credentialResponse.credential);
    setIsProcessingAuth(false);
  };

  const handleCheckoutSuccess = () => {
    alert("Paiement validé ! (Simulation réussie avec Stripe Elements)");
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
          {!isAuthenticated ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={24} className="text-white dark:text-black" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Connexion requise</h2>
              <p className="text-sm opacity-70 mb-8">Pour télécharger vos partitions, vous devez créer un compte ou vous connecter.</p>

              <div className="space-y-4 flex flex-col items-center">
                
                {/* Real Google Login Button */}
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Login Failed')}
                    theme="filled_black"
                    shape="rectangular"
                    width="300"
                    text="continue_with"
                  />
                </div>
                
                <div className="relative w-full my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300 dark:border-gray-700"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-50 dark:bg-zinc-900 px-2 text-gray-500">Ou par email</span></div>
                </div>

                <button 
                  onClick={handleEmailLogin}
                  disabled={isProcessingAuth}
                  className="w-full max-w-[300px] py-2.5 border border-current rounded flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <Mail size={18} /> Connexion par Email
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
                   <span className="font-medium text-sm">Connecté en tant que {useAuth().user?.name}</span>
                </div>
              </div>
              
              <Elements stripe={stripePromise}>
                <CheckoutForm total={cartTotal} onSuccess={handleCheckoutSuccess} />
              </Elements>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
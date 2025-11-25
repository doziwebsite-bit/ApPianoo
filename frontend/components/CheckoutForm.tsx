import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Lock, Loader } from 'lucide-react';

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { items, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements || !user) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Create PaymentIntent
            const { data: { clientSecret } } = await api.post('/stripe/create-payment-intent', {
                amount: Math.round(cartTotal * 100), // Amount in cents
                currency: 'eur', // Or eur depending on your preference
                metadata: {
                    userId: user.id,
                    items: JSON.stringify(items.map(item => item.id))
                }
            });

            // 2. Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            if (result.paymentIntent.status === 'succeeded') {
                // 3. Create Order
                await api.post('/orders', {
                    items: items.map(item => ({
                        product: item.id,
                        price: item.price,
                        quantity: item.quantity || 1
                    })),
                    totalAmount: cartTotal,
                    paymentId: result.paymentIntent.id
                });

                clearCart();
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.error('Payment failed:', err);
            setError(err.message || 'Le paiement a échoué. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700">
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
                <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <Loader className="animate-spin" size={20} />
                ) : (
                    <>
                        <Lock size={18} /> Payer {cartTotal.toFixed(2)}€
                    </>
                )}
            </button>

            <p className="text-xs text-center opacity-50 flex items-center justify-center gap-1">
                <Lock size={12} /> Paiement sécurisé par Stripe
            </p>
        </form>
    );
};

export default CheckoutForm;

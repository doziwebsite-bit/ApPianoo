import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ENV } from '../constants';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, orders, logout, addOrder } = useAuth();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get('session_id');

      if (sessionId && !verifying) {
        setVerifying(true);
        setVerificationMessage("Vérification du paiement en cours...");

        try {
          const response = await api.post('/stripe/verify-session', { sessionId });

          if (response.data.status === 'created' || response.data.status === 'already_processed') {
            setVerificationMessage("Paiement validé ! Votre commande est prête.");
            if (response.data.order) {
              addOrder(response.data.order);
            }
            navigate('/dashboard', { replace: true });
          } else {
            setVerificationMessage("Le paiement est en attente ou a échoué.");
          }
        } catch (error) {
          console.error("Erreur de vérification:", error);
          setVerificationMessage("Erreur lors de la vérification du paiement.");
        } finally {
          setVerifying(false);
          setTimeout(() => setVerificationMessage(null), 5000);
        }
      }
    };

    verifyPayment();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/cart" />;
  }

  const handleDownload = async (orderId: string, productId: string) => {
    try {
      setDownloading(productId);
      const response = await api.post(`/orders/${orderId}/download-links`);
      const links = response.data.downloadLinks;

      const link = links.find((l: any) => l.productId === productId);

      if (link) {
        window.open(link.url, '_blank');
      } else {
        alert("Lien de téléchargement non trouvé.");
      }
    } catch (error) {
      console.error("Erreur de téléchargement:", error);
      alert("Impossible de récupérer le lien de téléchargement. Veuillez réessayer.");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <Helmet>
        <title>Mon Espace - Alan Paul</title>
        <meta name="description" content="Accédez à vos commandes et téléchargez vos partitions achetées." />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8 bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-between">
            <div className="flex items-center gap-6">
              <picture>
                {user?.avatarUrl?.match(/\.(jpe?g|png)$/i) && (
                  <source srcSet={user.avatarUrl.replace(/\.(jpe?g|png)$/i, '.webp')} type="image/webp" />
                )}
                <img
                  src={user?.avatarUrl}
                  alt={`Photo de profil de ${user?.name}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 rounded-full border-4 border-white/20 aspect-square"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </picture>
              <div>
                <h1 className="text-3xl font-serif font-bold">{user?.name}</h1>
                <p className="opacity-90">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              aria-label="Se déconnecter"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> Mes Commandes & Téléchargements
            </h2>

            {verificationMessage && (
              <div className={`mb-6 p-4 rounded-lg ${verificationMessage.includes('Erreur') || verificationMessage.includes('échoué') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`} role="status">
                {verificationMessage}
              </div>
            )}

            {orders.length === 0 ? (
              <p className="opacity-90">Vous n'avez pas encore passé de commande.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order._id} className="border-b border-gray-100 dark:border-zinc-800 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between mb-4">
                      <div>
                        <span className="font-bold text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">Commande #{order.orderId}</span>
                        <div className="text-sm text-gray-700 dark:text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center h-fit ${order.status === 'Completed'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item: any) => (
                        <div key={item.product._id || item.product.id} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-gray-200 overflow-hidden rounded">
                              <picture>
                                <source srcSet={item.product.coverImage?.replace(/\.(jpe?g|png)$/i, '.webp')} type="image/webp" />
                                <img
                                  src={item.product.coverImage}
                                  alt={item.product.title}
                                  width={48}
                                  height={64}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover aspect-[3/4]"
                                />
                              </picture>
                            </div>
                            <div>
                              <div className="font-bold">{item.product.title}</div>
                              <div className="text-xs text-gray-700 dark:text-gray-300">{item.product.artist}</div>
                            </div>
                          </div>

                          {order.status === 'Completed' && (
                            <button
                              onClick={() => handleDownload(order.orderId, item.product._id || item.product.id)}
                              disabled={downloading === (item.product._id || item.product.id)}
                              aria-label={`Télécharger ${item.product.title} en PDF`}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloading === (item.product._id || item.product.id) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" aria-hidden="true"><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                              )}
                              Télécharger PDF
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardWithProvider = () => {
  const clientId = ENV.GOOGLE_CLIENT_ID || "MISSING_GOOGLE_CLIENT_ID";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Dashboard />
    </GoogleOAuthProvider>
  );
};

export default DashboardWithProvider;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { Download, Package, LogOut, Loader } from 'lucide-react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, orders, logout, addOrder } = useAuth();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Verify payment session if present in URL
  useEffect(() => {
    const verifyPayment = async () => {
      // Prioritize search params (standard), fallback to hash hacking if necessary (but likely not with proper redirect)
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get('session_id');

      if (sessionId && !verifying) {
        setVerifying(true);
        setVerificationMessage("Vérification du paiement en cours...");

        try {
          const response = await api.post('/stripe/verify-session', { sessionId });

          if (response.data.status === 'created' || response.data.status === 'already_processed') {
            setVerificationMessage("Paiement validé ! Votre commande est prête.");
            // Add the new order to the list
            if (response.data.order) {
              addOrder(response.data.order);
            }
            // Remove session_id from URL to prevent re-verification
            navigate('/dashboard', { replace: true });
          } else {
            setVerificationMessage("Le paiement est en attente ou a échoué.");
          }
        } catch (error) {
          console.error("Erreur de vérification:", error);
          setVerificationMessage("Erreur lors de la vérification du paiement.");
        } finally {
          setVerifying(false);
          // Clear message after 5 seconds
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
      // Call backend to get/generate download links
      const response = await api.post(`/orders/${orderId}/download-links`);
      const links = response.data.downloadLinks;

      const link = links.find((l: any) => l.productId === productId);

      if (link) {
        // Open in new tab
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
                  src={user?.avatarUrl || "https://ui-avatars.com/api/?name=" + user?.name}
                  alt={`Photo de profil de ${user?.name}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-20 h-20 rounded-full border-4 border-white/20 aspect-square"
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
              <LogOut size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
              <Package size={24} aria-hidden="true" /> Mes Commandes & Téléchargements
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
                                <Loader size={16} className="animate-spin" aria-hidden="true" />
                              ) : (
                                <Download size={16} aria-hidden="true" />
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

export default Dashboard;
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, Package, LogOut } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, orders, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/cart" />;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8 bg-gradient-to-r from-gray-900 to-black text-white flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img src={user?.avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white/20" />
              <div>
                <h1 className="text-3xl font-serif font-bold">{user?.name}</h1>
                <p className="opacity-70">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
              <Package size={24} /> Mes Commandes & Téléchargements
            </h2>

            {orders.length === 0 ? (
              <p className="opacity-60">Vous n'avez pas encore passé de commande.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border-b border-gray-100 dark:border-zinc-800 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between mb-4">
                      <div>
                        <span className="font-bold text-sm uppercase tracking-wider opacity-50">Commande #{order.id}</span>
                        <div className="text-sm opacity-50">{order.date}</div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-bold uppercase flex items-center h-fit">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-16 bg-gray-200 overflow-hidden rounded">
                                <img src={item.coverImage} className="w-full h-full object-cover" alt={item.title} />
                             </div>
                             <div>
                                <div className="font-bold">{item.title}</div>
                                <div className="text-xs opacity-60">{item.artist}</div>
                             </div>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                            <Download size={16} /> Télécharger PDF
                          </button>
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
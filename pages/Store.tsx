import React, { useState } from 'react';
import { FEATURED_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { Filter, Search } from 'lucide-react';

const Store: React.FC = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<string>('All');
  
  const difficulties = ['All', 'Easy', 'Intermediate', 'Advanced'];
  
  const filteredProducts = filter === 'All' 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(p => p.difficulty === filter);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Boutique de Partitions</h1>
            <p className="opacity-70">Retrouvez les arrangements officiels au format PDF.</p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center px-2 opacity-50">
              <Filter size={18} />
            </div>
            <div className="flex gap-2">
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setFilter(diff)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    filter === diff 
                      ? 'bg-black text-white dark:bg-white dark:text-black font-medium' 
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                <img 
                  src={product.coverImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wide text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Quick Add
                    </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-60">{product.difficulty}</span>
                  <span className="font-bold">${product.price}</span>
                </div>
                <h3 className="font-serif text-lg font-bold leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.title}</h3>
                <p className="text-sm opacity-70 line-clamp-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center opacity-60">
             <Search size={48} className="mx-auto mb-4 opacity-50" />
             <p>Aucune partition trouvée pour ce filtre.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Store;
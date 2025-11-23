import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { FEATURED_PRODUCTS, MEDIA_ITEMS } from '../constants';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const { addToCart } = useCart();

  // Get the first 3 items (prioritizing videos) to show on homepage
  const featuredMedia = MEDIA_ITEMS.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Profile Picture Card with White Halo Effect (No Gradient) */}
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-60 dark:opacity-10 transform scale-105"></div>
            <div className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-white/50 dark:border-gray-800 shadow-2xl relative z-10 bg-gray-100">
              <img
                src= "/assets/AlanPaul-PP.jpg"
                alt="Alan Paul"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  // Image de remplacement élégante si le fichier n'est pas trouvé
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Alan+Paul&size=512&background=000&color=fff&font-size=0.33";
                }}
              />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-8xl font-bold mb-6 tracking-tight text-black dark:text-white drop-shadow-lg">
            Alan Paul
          </h1>
          <p className="text-lg md:text-2xl font-light uppercase tracking-widest mb-12 opacity-80">
            Pianist &bull; Composer &bull; Performer
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/store"
              className="px-10 py-4 bg-black text-white dark:bg-white dark:text-black font-medium uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Boutique de partitions
            </Link>
            <Link
              to="/services"
              className="px-10 py-4 border-2 border-current font-medium uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 backdrop-blur-sm"
            >
              Réserver une prestation
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {FEATURED_PRODUCTS.length > 0 && (
        <section className="py-24 bg-white/40 dark:bg-black/40 backdrop-blur-sm border-t border-b border-gray-200/20 dark:border-gray-800/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Partitions à la une</h2>
              <div className="w-24 h-1 bg-black dark:bg-white mx-auto opacity-20 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {FEATURED_PRODUCTS.slice(0, 3).map((product) => (
                <div key={product.id} className="group flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white dark:bg-black text-black dark:text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                        {product.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-serif text-2xl font-bold mb-1">{product.title}</h3>
                    <p className="text-sm font-medium opacity-60 mb-4 uppercase tracking-wider">{product.artist}</p>
                    <p className="text-sm opacity-70 mb-6 leading-relaxed">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="font-serif font-bold text-xl">${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-transparent border border-black dark:border-white text-black dark:text-white px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                to="/store"
                className="inline-flex items-center gap-3 text-lg font-serif italic hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Voir toutes les partitions <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* About Section - Removed Gradient Overlay */}
      <section className="py-24 relative">
        {/* Removed absolute gradient div here for cleaner white look */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10">À propos d'Alan</h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-80 mb-12 font-light">
            Passionné par la musique de film et les mélodies qui touchent l'âme, Alan Paul est un pianiste moderne qui partage son amour pour le clavier à travers des reprises intenses et émouvantes. Actif sur les réseaux sociaux où il rassemble une communauté grandissante, il se spécialise dans l'arrangement de thèmes iconiques pour les rendre accessibles à tous les pianistes. Découvrez ses partitions, regardez ses performances et ajoutez une touche musicale unique à vos événements.
          </p>
          <div className="grid grid-cols-3 gap-8 border-t border-b border-current py-8 opacity-80 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-3xl md:text-4xl mb-1">500k+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest">Followers</span>
            </div>
            <div className="flex flex-col items-center border-l border-r border-current/20 w-full">
              <span className="font-serif font-bold text-3xl md:text-4xl mb-1">10M+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest">Vues</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-3xl md:text-4xl mb-1">50+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest">Concerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Performances Section (Media on Homepage) */}
      {featuredMedia.length > 0 && (
        <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-800/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10">Performances Récentes</h2>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredMedia.map((media) => (
                <div key={media.id} className={`w-full ${media.aspectRatio === 'square' ? 'aspect-square max-w-[400px] mx-auto' : 'aspect-video'} bg-black rounded-xl overflow-hidden shadow-xl`}>
                  <iframe
                    src={media.url}
                    title={media.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/media"
                className="inline-flex items-center gap-3 text-lg font-serif italic hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Voir toutes les vidéos <Play size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
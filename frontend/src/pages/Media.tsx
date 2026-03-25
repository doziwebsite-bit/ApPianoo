import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MEDIA_ITEMS } from '../constants';

const Media: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'photo'>('all');

  const filteredMedia = activeTab === 'all'
    ? MEDIA_ITEMS
    : MEDIA_ITEMS.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen py-12 px-4">
      <Helmet>
        <title>Galerie Média - Alan Paul</title>
        <meta name="description" content="Vidéos et photos d'Alan Paul en concert, en studio et sur scène. Découvrez ses performances live." />
        <meta property="og:title" content="Galerie Média - Alan Paul" />
        <meta property="og:description" content="Vidéos et photos de performances live d'Alan Paul." />
        <meta property="og:url" content="https://appianoo.netlify.app/media" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">Galerie Média</h1>

          {/* Menu des onglets */}
          <div className="flex justify-center gap-4 flex-wrap" role="group" aria-label="Filtrer les médias">
            {['all', 'video', 'photo'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                aria-label={`Afficher ${tab === 'all' ? 'tout' : tab === 'video' ? 'les vidéos' : 'les photos'}`}
                aria-pressed={activeTab === tab}
                className={`px-6 py-2 rounded-full border uppercase text-xs font-bold tracking-widest transition-all ${activeTab === tab
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent scale-105'
                  : 'border-gray-300 opacity-90 hover:opacity-100'
                  }`}
              >
                {tab === 'all' ? 'Tout' : tab === 'video' ? 'Vidéos' : 'Photos'}
              </button>
            ))}
          </div>
        </div>

        {/* Grille pour Vidéos et Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr items-center">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all ${item.type === 'video'
                ? (item.aspectRatio === 'square' ? 'aspect-square max-w-md mx-auto w-full' : 'aspect-video col-span-1')
                : 'bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 aspect-square'
                }`}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full relative flex items-center justify-center bg-black">
                  <iframe
                    src={item.url}
                    title={item.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-full relative cursor-pointer">
                  <picture>
                    {item.urlWebp && <source srcSet={item.urlWebp} type="image/webp" />}
                    <img
                      src={item.url}
                      alt={item.title}
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-square"
                    />
                  </picture>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-white text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg> Photo
                  </div>
                </div>
              )}

              {item.type === 'photo' && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-serif text-xl font-bold">{item.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Media;

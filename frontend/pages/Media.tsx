import React, { useState } from 'react';
// On importe la liste des médias ET l'URL Spotify depuis constants
import { MEDIA_ITEMS, SPOTIFY_EMBED_URL } from '../constants';
// J'ajoute l'icône 'Music' des imports lucide-react
import { Play, Image as ImageIcon, Music } from 'lucide-react';

const Media: React.FC = () => {
  // J'ajoute 'music' aux types d'onglets possibles
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'photo' | 'music'>('all');

  // La logique de filtre reste la même pour la grille (photos/vidéos)
  const filteredMedia = activeTab === 'all'
    ? MEDIA_ITEMS.filter(item => item.type !== 'music')
    : MEDIA_ITEMS.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">Galerie Média</h1>

          {/* Menu des onglets */}
          <div className="flex justify-center gap-4 flex-wrap">
            {/* J'ajoute 'music' à la liste des boutons */}
            {['all', 'video', 'photo', 'music'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-full border uppercase text-xs font-bold tracking-widest transition-all ${activeTab === tab
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent scale-105'
                  : 'border-gray-300 opacity-60 hover:opacity-100'
                  }`}
              >
                {/* Texte du bouton selon le type */}
                {tab === 'all' ? 'Tout' : tab === 'video' ? 'Vidéos' : tab === 'photo' ? 'Photos' : 'Musique'}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION SPOTIFY */}
        {/* S'affiche si on est sur l'onglet 'all' ou 'music' */}
        {(activeTab === 'all' || activeTab === 'music') && (
          <div className="w-full max-w-3xl mx-auto mb-16 animate-fade-in">
             {/* Petit titre optionnel au dessus du lecteur */}
            <div className="flex items-center gap-2 mb-4 justify-center opacity-80">
                <Music size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Dernières sorties</span>
            </div>
            
            {/* Votre lecteur Spotify intégré */}
            <iframe 
              style={{ borderRadius: '12px' }} 
              src={SPOTIFY_EMBED_URL} 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="Spotify Player"
              className="shadow-xl"
            ></iframe>
            
            {/* Ligne de séparation décorative si on est en mode 'all' */}
            {activeTab === 'all' && <div className="mt-16 border-b border-gray-200 dark:border-zinc-800 w-1/2 mx-auto"></div>}
          </div>
        )}

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
                <div className="w-full h-full relative">
                  <iframe
                    src={item.url}
                    title={item.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-full relative cursor-pointer">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-white text-sm flex items-center gap-2">
                    <ImageIcon size={14} /> Photo
                  </div>
                </div>
              )}

              {/* Titre overlay pour les photos */}
              {item.type === 'photo' && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-serif text-xl font-bold">{item.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Message si l'onglet musique est seul et qu'il n'y a pas d'autres items (optionnel, mais propre) */}
        {activeTab === 'music' && (
            <div className="text-center mt-8 text-gray-500 text-sm">
                Retrouvez l'intégralité de la discographie sur les plateformes de streaming.
            </div>
        )}

      </div>
    </div>
  );
};

export default Media;

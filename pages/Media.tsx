import React, { useState } from 'react';
import { MEDIA_ITEMS } from '../constants';
import { Play, Image as ImageIcon, Instagram } from 'lucide-react';

const Media: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'photo'>('all');

  const filteredMedia = activeTab === 'all'
    ? MEDIA_ITEMS
    : MEDIA_ITEMS.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">Galerie Média</h1>

          <div className="flex justify-center gap-4">
            {['all', 'video', 'photo'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-full border uppercase text-xs font-bold tracking-widest transition-all ${activeTab === tab
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent scale-105'
                  : 'border-gray-300 opacity-60 hover:opacity-100'
                  }`}
              >
                {tab === 'all' ? 'Tout' : tab === 'video' ? 'Vidéos' : 'Photos'}
              </button>
            ))}
          </div>
        </div>

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

              {/* Overlay Title for Photos only, videos have their own titles in player */}
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
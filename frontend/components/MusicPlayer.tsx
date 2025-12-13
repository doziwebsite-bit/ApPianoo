import React from 'react';
import { SPOTIFY_EMBED_URL } from './constants'; // On importe l'URL qu'on a définie

const MusicPlayer = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Ma Musique</h2>
      
      {/* C'est ici qu'on met la balise iframe */}
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
      ></iframe>
      
    </div>
  );
};

export default MusicPlayer;


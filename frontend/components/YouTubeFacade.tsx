import { useState } from 'react';
import { Play } from 'lucide-react';

interface Props {
  videoId: string;
  title: string;
  className?: string;
}

export default function YouTubeFacade({ videoId, title, className = '' }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        width={1280}
        height={720}
        className={`aspect-video w-full rounded-lg ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className={`relative aspect-video w-full overflow-hidden rounded-lg group cursor-pointer ${className}`}
      aria-label={`Lire la vidéo : ${title}`}
    >
      <picture>
        <source
          srcSet={`https://img.youtube.com/vi/${videoId}/maxresdefault.webp`}
          type="image/webp"
        />
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
        <div className="bg-red-600 rounded-full p-5 group-hover:scale-110 transition-transform shadow-lg">
          <Play className="w-8 h-8 text-white fill-white" aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}

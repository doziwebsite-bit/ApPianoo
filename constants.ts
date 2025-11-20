import { Product, MediaItem, Order } from './types';

// Safe access to environment variables
const getEnv = (key: string) => {
  // @ts-ignore
  return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) || '';
};

export const ENV = {
  GOOGLE_CLIENT_ID: getEnv('VITE_GOOGLE_CLIENT_ID'),
  STRIPE_PUBLIC_KEY: getEnv('VITE_STRIPE_PUBLIC_KEY'),
};

export const ASSETS = {
  logo: '/assets/logo.png',
  profile: '/assets/profile.jpg',
  background: '/assets/background.jpg',
  placeholderSheet: 'https://placehold.co/400x500?text=Sheet+Music',
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@alanpaul3228?si=g7kVQuX94P6sW8-K',
  instagram: 'https://www.instagram.com/ap_pianoo?igsh=N2xxejJ4ZXhhZWx2',
  appleMusic: 'https://music.apple.com/fr/artist/alan-paul/1838344951?ls',
  deezer: 'https://link.deezer.com/s/31EKAnSk2BCGnRDtOO4RL',
  spotify: 'https://open.spotify.com/artist/0ljNExkPR9XODrWAwSHgUI?si=hi6eHsQ8S9-ILUI2FtHQBQ',
  tiktok: 'https://www.tiktok.com/@ap_pianoo?_r=1&_t=ZN-91YOHdS8Sz0'
};

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Interstellar (Main Theme)',
    artist: 'Arr. Alan Paul',
    price: 5.99,
    difficulty: 'Advanced',
    coverImage: ASSETS.placeholderSheet,
    description: 'An intense and emotional arrangement of Hans Zimmer\'s masterpiece.',
    type: 'Sheet Music'
  },
  {
    id: '2',
    title: 'Experience',
    artist: 'Arr. Alan Paul',
    price: 4.99,
    difficulty: 'Intermediate',
    coverImage: ASSETS.placeholderSheet,
    description: 'A flowing, minimalist tribute to Ludovico Einaudi.',
    type: 'Sheet Music'
  },
  {
    id: '3',
    title: 'Comptine d\'un autre été',
    artist: 'Arr. Alan Paul',
    price: 3.99,
    difficulty: 'Easy',
    coverImage: ASSETS.placeholderSheet,
    description: 'The classic melody from Amélie, revisited with a modern touch.',
    type: 'Sheet Music'
  },
  {
    id: '4',
    title: 'Succession Theme',
    artist: 'Arr. Alan Paul',
    price: 6.99,
    difficulty: 'Advanced',
    coverImage: ASSETS.placeholderSheet,
    description: 'Dark, classical, and rhythmic textures.',
    type: 'Sheet Music'
  }
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'v1',
    type: 'video',
    url: 'https://www.youtube.com/embed/49BGmBVjaLg',
    title: 'Performance Live',
    aspectRatio: 'video'
  },
  {
    id: 'v2',
    type: 'video',
    url: 'https://www.youtube.com/embed/Vyzbjwggu5o',
    title: 'Instagram/Shorts Highlight 1',
    aspectRatio: 'square'
  },
  {
    id: 'v3',
    type: 'video',
    url: 'https://www.youtube.com/embed/vXuaxDCOQww',
    title: 'Instagram/Shorts Highlight 2',
    aspectRatio: 'square'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2023-001',
    date: '2023-10-15',
    items: [{ ...FEATURED_PRODUCTS[0], quantity: 1 }],
    total: 5.99,
    status: 'Completed',
    downloadLink: '#'
  }
];
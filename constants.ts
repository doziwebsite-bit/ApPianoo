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
  logoLight: '/assets/logoAlanPaul.png',
  logoDark: '/assets/logoAlanPaul-darkmode.png',
  profile: '/assets/AlanPaul-PP.jpg',
  background: '/assets/AlanPaul-background.jpg',
  placeholderSheet: 'https://placehold.co/400x500?text=Sheet+Music',
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@alanpaul3228?si=g7kVQuX9P4sW8-K',
  instagram: 'https://www.instagram.com/ap_pianoo?igsh=N2xxejJ4ZXhhZWx2',
  appleMusic: 'https://music.apple.com/fr/artist/alan-paul/1838344951?ls',
  deezer: 'https://link.deezer.com/s/31EKAnSk2BCGnRDtOO4RL',
  spotify: 'https://open.spotify.com/artist/0ljNExkPR9XODrWAwSHgUI?si=hi6eHsQ8S9-ILUI2FtHQBQ',
  tiktok: 'https://www.tiktok.com/@ap_pianoo?_r=1&_t=ZN-91YOHdS8Sz0'
};

export const FEATURED_PRODUCTS: Product[] = [];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'v1',
    type: 'video',
    url: 'https://www.youtube.com/embed/49BGmBVjaLg',
    title: 'Mountains - Inspired by Puy Mary (Cantal)',
    aspectRatio: 'video'
  },
  {
    id: 'v2',
    type: 'video',
    url: 'https://www.youtube.com/embed/Vyzbjwggu5o',
    title: 'AmberWood',
    aspectRatio: 'square'
  },
  {
    id: 'v3',
    type: 'video',
    url: 'https://www.youtube.com/embed/vXuaxDCOQww',
    title: 'Mountains',
    aspectRatio: 'square'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2023-001',
    date: '2023-10-15',
    items: [{
      id: 'mock-1',
      title: 'Ma Première Partition Achetée',
      artist: 'Alan Paul',
      price: 9.99,
      difficulty: 'Easy',
      coverImage: ASSETS.placeholderSheet,
      description: 'Ceci est une partition de démo.',
      type: 'Sheet Music',
      quantity: 1
    }],
    total: 9.99,
    status: 'Completed',
    downloadLink: '#'
  }
];

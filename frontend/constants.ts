import { Product, MediaItem, Order } from './types';

// Import images as modules so Vite includes them in the build
import logoLight from './assets/logoAlanPaul.png';
import logoDark from './assets/logoAlanPaul-darkmode.png';
import profile from './assets/AlanPaul-PP.jpg';
import background from './assets/AlanPaul-background.jpg';

// Import photos for media gallery
import photo1 from './assets/IMG_1338.JPG';
import photo2 from './assets/IMG_1340.JPG';
import photo3 from './assets/IMG_1342.JPG';
import photo4 from './assets/IMG_1347.JPG';

// Safe access to environment variables
const getEnv = (key: string) => {
  // @ts-ignore
  return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) || '';
};

export const ENV = {
  GOOGLE_CLIENT_ID: getEnv('VITE_GOOGLE_CLIENT_ID'),
  STRIPE_PUBLIC_KEY: getEnv('VITE_STRIPE_PUBLIC_KEY'),
};

const getApiUrl = () => {
  const url = getEnv('VITE_API_URL') || 'http://localhost:5000/api';
  return url.endsWith('/api') ? url : `${url}/api`;
};

export const API_CONFIG = {
  baseURL: getApiUrl(),
  timeout: 10000,
};

export const MEDIA_ITEMS: MediaItem[] = [
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
  },
  {
    id: 'v4',
    type: 'video',
    url: 'https://www.youtube.com/embed/wG9_ueAImEw',
    title: 'Amberwood (Piano)',
    aspectRatio: 'video'
  },
  {
    id: 'p1',
    type: 'photo',
    url: photo1,
    title: 'Performance Live'
  },
  {
 

<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/artist/0ljNExkPR9XODrWAwSHgUI?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>i
},frame dframt stid="embe  iframe" style="border-radius:12px" src="https://open.sp,
    type: 'photo',
    url: photo3,
    title: 'Sur Scène'
  },
  {
    id: 'p4',
    type: 'photo',
    url: photo4,
    title: 'Performance'
  }
];

export const MOCK_ORDERS: Order[] = [];

export const FEATURED_PRODUCTS: Product[] = [];

export const ASSETS = {
  logoLight,
  logoDark,
  profile,
  background
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@alanpaul3228?si=7i1bxxkLPH6h2ZDP',
  instagram: 'https://www.instagram.com/ap_pianoo?igsh=N2xxejJ4ZXhhZWx2',
  tiktok: 'https://www.tiktok.com/@ap_pianoo?_r=1&_t=ZN-92BxBFnuRzq',
  spotify: 'https://open.spotify.com/intl-fr/artist/0ljNExkPR9XODrWAwSHgUI?si=7z7CyEh9SOqSEcPdSbAuVg',
  appleMusic: 'https://music.apple.com/fr/artist/alan-paul/1838344951?ls',
  deezer: 'https://link.deezer.com/s/31S1mTXNi966zuuQ68QKD'
};

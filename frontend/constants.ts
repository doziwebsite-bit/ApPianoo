import { Product, MediaItem, Order } from './types';

// Import images as modules so Vite includes them in the build
import logoLight from './assets/logoAlanPaul.png';
import logoLightWebp from './assets/logoAlanPaul.webp';
import logoDark from './assets/logoAlanPaul-darkmode.png';
import logoDarkWebp from './assets/logoAlanPaul-darkmode.webp';
import profile from './assets/AlanPaul-PP.jpg';
import profileWebp from './assets/AlanPaul-PP.webp';
import background from './assets/AlanPaul-background.jpg';
import backgroundWebp from './assets/AlanPaul-background.webp';

// Import photos for media gallery
import photo1 from './assets/IMG_1338.JPG';
import photo1Webp from './assets/IMG_1338.webp';
import photo2 from './assets/IMG_1340.JPG';
import photo2Webp from './assets/IMG_1340.webp';
import photo3 from './assets/IMG_1342.JPG';
import photo3Webp from './assets/IMG_1342.webp';
import photo4 from './assets/IMG_1347.JPG';
import photo4Webp from './assets/IMG_1347.webp';

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
    urlWebp: photo1Webp,
    title: 'Performance Live'
  },
  {
    id: 'p2',
    type: 'photo',
    url: photo2,
    urlWebp: photo2Webp,
    title: 'Studio'
  },
  {
    id: 'p3',
    type: 'photo',
    url: photo3,
    urlWebp: photo3Webp,
    title: 'Sur Scène'
  },
  {
    id: 'p4',
    type: 'photo',
    url: photo4,
    urlWebp: photo4Webp,
    title: 'Performance'
  }
];

export const MOCK_ORDERS: Order[] = [];

export const FEATURED_PRODUCTS: Product[] = [];

export const ASSETS = {
  logoLight: { original: logoLight, webp: logoLightWebp },
  logoDark: { original: logoDark, webp: logoDarkWebp },
  profile: { original: profile, webp: profileWebp },
  background: { original: background, webp: backgroundWebp }
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@alanpaul3228?si=7i1bxxkLPH6h2ZDP',
  instagram: 'https://www.instagram.com/ap_pianoo?igsh=N2xxejJ4ZXhhZWx2',
  tiktok: 'https://www.tiktok.com/@ap_pianoo?_r=1&_t=ZN-92BxBFnuRzq',
  // J'ai aussi mis à jour le lien vers votre profil ici (basé sur l'ID de votre player)
  spotify: 'https://open.spotify.com/artist/31S1mTXNi966zuuQ68QKD',
  appleMusic: 'https://music.apple.com/fr/artist/alan-paul/1838344951?ls',
  deezer: 'https://link.deezer.com/s/31S1mTXNi966zuuQ68QKD'
};

// URL exacte extraite de votre code iframe
export const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/artist/31S1mTXNi966zuuQ68QKD?utm_source=generator';


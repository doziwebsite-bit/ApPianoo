import { Product, MediaItem, Order } from './types';

// Import images as modules so Vite includes them in the build

import logoLightWebp from './assets/logoAlanPaul.webp';
import logoDarkWebp from './assets/logoAlanPaul-darkmode.webp';
import profileWebp from './assets/AlanPaul-PP.webp';
import backgroundWebp from './assets/AlanPaul-background.webp';


// Import photos for media gallery
import photo1Webp from './assets/IMG_1338.webp';
import photo2Webp from './assets/IMG_1340.webp';
import photo3Webp from './assets/IMG_1342.webp';
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
    url: 'https://www.youtube-nocookie.com/embed/Vyzbjwggu5o',
    title: 'AmberWood',
    aspectRatio: 'square'
  },
  {
    id: 'v3',
    type: 'video',
    url: 'https://www.youtube-nocookie.com/embed/vXuaxDCOQww',
    title: 'Mountains',
    aspectRatio: 'square'
  },
  {
    id: 'v4',
    type: 'video',
    url: 'https://www.youtube-nocookie.com/embed/wG9_ueAImEw',
    title: 'Amberwood (Piano)',
    aspectRatio: 'video'
  },
  {
    id: 'p1',
    type: 'photo',
    url: photo1Webp,
    urlWebp: photo1Webp,
    title: 'Performance Live'
  },
  {
    id: 'p2',
    type: 'photo',
    url: photo2Webp,
    urlWebp: photo2Webp,
    title: 'Studio'
  },
  {
    id: 'p3',
    type: 'photo',
    url: photo3Webp,
    urlWebp: photo3Webp,
    title: 'Sur Scène'
  },
  {
    id: 'p4',
    type: 'photo',
    url: photo4Webp,
    urlWebp: photo4Webp,
    title: 'Performance'
  }
];



export const ASSETS = {
  logoLight: { original: logoLightWebp, webp: logoLightWebp, webp300w: logoLightWebp },
  logoDark: { original: logoDarkWebp, webp: logoDarkWebp, webp300w: logoDarkWebp },
  profile: { original: profileWebp, webp: profileWebp, webp300w: profileWebp, webp600w: profileWebp, webp900w: profileWebp },
  background: { original: backgroundWebp, webp: backgroundWebp, webp300w: backgroundWebp, webp600w: backgroundWebp, webp900w: backgroundWebp }
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@alanpaul3228?si=7i1bxxkLPH6h2ZDP',
  instagram: 'https://www.instagram.com/ap_pianoo?igsh=N2xxejJ4ZXhhZWx2',
  tiktok: 'https://www.tiktok.com/@ap_pianoo?_r=1&_t=ZN-92BxBFnuRzq',
  spotify: 'https://open.spotify.com/intl-fr/artist/0ljNExkPR9XODrWAwSHgUI?si=6sYX7GebSt6EHnAV0umSSA',
  appleMusic: 'https://music.apple.com/fr/artist/alan-paul/1838344951?ls',
  deezer: 'https://link.deezer.com/s/31S1mTXNi966zuuQ68QKD'
};

// URL exacte extraite de votre code iframe
export const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/artist/31S1mTXNi966zuuQ68QKD?utm_source=generator';
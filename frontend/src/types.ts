export interface Product {
  _id?: string;
  id: string;
  title: string;
  artist: string;
  price: number;
  difficulty: 'Facile' | 'Intermédiaire' | 'Avancé';
  coverImage: string;
  description: string;
  type: 'Partitions' | 'Album';
}

export interface User {
  _id?: string;
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  googleId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Completed' | 'Pending';
  downloadLinks?: {
    productId: string;
    url: string;
    expiresAt: string;
  }[];
}

export interface MediaItem {
  id: string;
  type: 'video' | 'photo' | 'music';
  url: string;
  urlWebp?: string;
  title: string;
  aspectRatio?: 'video' | 'square';
  artist?: string;
  platform?: 'spotify' | 'apple' | 'deezer' | 'youtube';
}

export enum AuthProvider {
  GOOGLE = 'Google',
  EMAIL = 'Email'
}
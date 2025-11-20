export interface Product {
  id: string;
  title: string;
  artist: string;
  price: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  coverImage: string;
  description: string;
  type: 'Sheet Music' | 'Album';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Completed' | 'Pending';
  downloadLink: string;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'photo';
  url: string;
  thumbnail?: string;
  title: string;
  aspectRatio?: 'video' | 'square'; // 'video' = 16:9, 'square' = 1:1
}

export enum AuthProvider {
  GOOGLE = 'Google',
  EMAIL = 'Email'
}
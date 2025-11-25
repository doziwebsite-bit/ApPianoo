import { useState, useEffect } from 'react';
import { Product } from '../types';
import api from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Impossible de charger les partitions.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

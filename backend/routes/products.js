import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products - Récupérer tous les produits actifs
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits', message: error.message });
    }
});

// GET /api/products/:id - Récupérer un produit spécifique
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit', message: error.message });
    }
});

// POST /api/products - Créer un nouveau produit (admin seulement)
router.post('/', async (req, res) => {
    try {
        const { title, artist, price, difficulty, description, coverImage, pdfFile, type } = req.body;

        const product = new Product({
            title,
            artist: artist || 'Alan Paul',
            price,
            difficulty,
            description,
            coverImage,
            pdfFile,
            type: type || 'Partitions'
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du produit', message: error.message });
    }
});

// PUT /api/products/:id - Mettre à jour un produit (admin seulement)
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour du produit', message: error.message });
    }
});

// DELETE /api/products/:id - Supprimer un produit (soft delete)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        res.json({ message: 'Produit désactivé avec succès', product });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du produit', message: error.message });
    }
});

export default router;

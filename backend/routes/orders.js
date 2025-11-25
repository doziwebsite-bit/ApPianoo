import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/orders - Récupérer toutes les commandes d'un utilisateur
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes', message: error.message });
    }
});

// GET /api/orders/:orderId - Récupérer une commande spécifique
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
            .populate('items.product')
            .populate('user');

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la commande', message: error.message });
    }
});

// POST /api/orders - Créer une nouvelle commande
router.post('/', async (req, res) => {
    try {
        const { userId, items, total, paymentIntentId } = req.body;

        // Vérifier que l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier que tous les produits existent
        const productIds = items.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== items.length) {
            return res.status(400).json({ error: 'Certains produits n\'existent pas' });
        }

        // Créer la commande
        const order = new Order({
            user: userId,
            items: items.map((item, index) => ({
                product: item.product,
                title: products[index].title,
                price: products[index].price,
                quantity: item.quantity || 1
            })),
            total,
            paymentIntentId,
            status: 'Pending'
        });

        await order.save();

        // Mettre à jour le nombre de ventes pour chaque produit
        for (const product of products) {
            product.sales += 1;
            await product.save();
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de la commande', message: error.message });
    }
});

// PUT /api/orders/:orderId/status - Mettre à jour le statut d'une commande
router.put('/:orderId/status', async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour de la commande', message: error.message });
    }
});

// POST /api/orders/:orderId/download-links - Générer des liens de téléchargement
router.post('/:orderId/download-links', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId }).populate('items.product');

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        if (order.status !== 'Completed') {
            return res.status(403).json({ error: 'La commande doit être complétée pour télécharger' });
        }

        // Générer des liens de téléchargement (valides 7 jours)
        const downloadLinks = order.items.map(item => ({
            productId: item.product._id,
            url: item.product.pdfFile,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
        }));

        order.downloadLinks = downloadLinks;
        await order.save();

        res.json({ downloadLinks });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la génération des liens', message: error.message });
    }
});

export default router;

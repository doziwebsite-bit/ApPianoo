import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/google - Authentification Google
router.post('/google', async (req, res) => {
    try {
        const { googleId, email, name, avatarUrl } = req.body;

        // Chercher ou créer l'utilisateur
        let user = await User.findOne({ googleId });

        if (!user) {
            // Vérifier si l'email existe déjà
            user = await User.findOne({ email });

            if (user) {
                // Mettre à jour avec Google ID
                user.googleId = googleId;
                user.provider = 'google';
                user.avatarUrl = avatarUrl;
                await user.save();
            } else {
                // Créer un nouvel utilisateur
                user = new User({
                    googleId,
                    email,
                    name,
                    avatarUrl,
                    provider: 'google'
                });
                await user.save();
            }
        }

        // Générer un JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                avatarUrl: user.avatarUrl
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'authentification', message: error.message });
    }
});

// POST /api/auth/email - Authentification par email (démo)
router.post('/email', async (req, res) => {
    try {
        const { email, name } = req.body;

        // Chercher ou créer l'utilisateur
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                name: name || 'Utilisateur',
                provider: 'email'
            });
            await user.save();
        }

        // Générer un JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                avatarUrl: user.avatarUrl
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'authentification', message: error.message });
    }
});

// GET /api/auth/me - Récupérer l'utilisateur connecté
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token manquant' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-__v');

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        res.status(401).json({ error: 'Token invalide', message: error.message });
    }
});

export default router;

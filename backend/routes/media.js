import express from 'express';
import Media from '../models/Media.js';

const router = express.Router();

// GET /api/media
router.get('/', async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import stripeRoutes from './routes/stripe.js';
import mediaRoutes from './routes/media.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Exception webhook Stripe — doit être AVANT express.json()
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// Middleware
app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        process.env.FRONTEND_URL_PROD,
        process.env.FRONTEND_URL_PROD_TEST,
        'https://appianotest.netlify.app', // Site de test Netlify
        'http://localhost:5173' // Localhost fallback
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connecté avec succès');
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error.message);
        process.exit(1);
    }
};

connectDB();

// Routes de base
app.get('/', (req, res) => {
    res.json({
        message: 'API Alan Paul - Backend',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            orders: '/api/orders',
            stripe: '/api/stripe'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contact', contactRoutes);


// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Erreur serveur',
        message: err.message
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;

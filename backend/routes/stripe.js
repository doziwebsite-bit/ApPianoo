import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/stripe/create-payment-intent - Créer une intention de paiement
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'eur', metadata } = req.body;

        // Créer une intention de paiement Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir en centimes
            currency,
            metadata: metadata || {},
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erreur lors de la création du paiement',
            message: error.message
        });
    }
});

// POST /api/stripe/create-checkout-session - Créer une session de paiement Stripe Checkout
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { items, userId } = req.body; // Expect userId from frontend
        // Utiliser l'origine de la requête ou une valeur par défaut pour le développement local
        const origin = req.headers.origin || 'http://localhost:5173';

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.title,
                    images: item.coverImage ? [item.coverImage] : [],
                    metadata: {
                        productId: item.id || item._id
                    }
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/#/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/#/cart`,
            metadata: {
                userId: userId,
                items: JSON.stringify(items.map(i => ({
                    product: i.id || i._id,
                    title: i.title,
                    price: i.price
                })))
            }
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/stripe/verify-session - Vérifier une session après redirection
router.post('/verify-session', async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID requis' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Vérifier si la commande existe déjà
            const existingOrder = await Order.findOne({ paymentIntentId: session.payment_intent });

            if (existingOrder) {
                return res.json({ status: 'already_processed', order: existingOrder });
            }

            // Créer la commande
            const metadata = session.metadata;
            const items = JSON.parse(metadata.items);

            const newOrder = new Order({
                user: metadata.userId,
                items: items.map(item => ({
                    product: item.product,
                    title: item.title,
                    price: item.price,
                    quantity: 1
                })),
                total: session.amount_total / 100,
                status: 'Completed',
                paymentIntentId: session.payment_intent
            });

            await newOrder.save();
            console.log('✅ Order created via verification:', newOrder.orderId);

            return res.json({ status: 'created', order: newOrder });
        } else {
            return res.json({ status: 'pending' });
        }
    } catch (error) {
        console.error('Error verifying session:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/stripe/webhook - Webhook Stripe pour les événements
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gérer les événements Stripe
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent succeeded:', paymentIntent.id);

            // Mettre à jour la commande
            try {
                const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
                if (order) {
                    order.status = 'Completed';
                    await order.save();
                    console.log('Order updated to Completed:', order.orderId);
                }
            } catch (error) {
                console.error('Error updating order:', error);
            }
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('PaymentIntent failed:', failedPayment.id);

            // Mettre à jour la commande
            try {
                const order = await Order.findOne({ paymentIntentId: failedPayment.id });
                if (order) {
                    order.status = 'Failed';
                    await order.save();
                    console.log('Order updated to Failed:', order.orderId);
                }
            } catch (error) {
                console.error('Error updating order:', error);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// GET /api/stripe/payment-status/:paymentIntentId - Vérifier le statut d'un paiement
router.get('/payment-status/:paymentIntentId', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntentId);

        res.json({
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erreur lors de la récupération du statut',
            message: error.message
        });
    }
});

export default router;

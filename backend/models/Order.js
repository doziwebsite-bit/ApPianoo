import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        title: String,
        price: Number,
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentIntentId: {
        type: String // Stripe Payment Intent ID
    },
    downloadLinks: [{
        productId: mongoose.Schema.Types.ObjectId,
        url: String,
        expiresAt: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Générer un ID de commande unique
orderSchema.pre('save', async function (next) {
    if (!this.orderId) {
        const date = new Date();
        const year = date.getFullYear();
        const count = await mongoose.model('Order').countDocuments();
        this.orderId = `ORD-${year}-${String(count + 1).padStart(4, '0')}`;
    }
    next();
});

export default mongoose.model('Order', orderSchema);

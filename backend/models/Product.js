import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        default: 'Alan Paul'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    difficulty: {
        type: String,
        enum: ['Facile', 'Intermédiaire', 'Avancé'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    pdfFile: {
        type: String, // URL Cloudinary du PDF
        required: true
    },
    type: {
        type: String,
        enum: ['Partitions', 'Album'],
        default: 'Partitions'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sales: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', productSchema);

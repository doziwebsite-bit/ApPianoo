import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['video', 'photo', 'music'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    aspectRatio: {
        type: String,
        enum: ['video', 'square'],
        default: 'square'
    },
    artist: {
        type: String
    },
    platform: {
        type: String,
        enum: ['spotify', 'apple', 'deezer', 'youtube']
    },
    publicId: {
        type: String // Cloudinary Public ID
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Media', mediaSchema);

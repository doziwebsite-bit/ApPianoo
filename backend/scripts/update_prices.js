import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

// Configuration
dotenv.config({ path: path.join(process.cwd(), 'backend', '.env') });

const updatePrices = async () => {
    try {
        // 1. Connect to MongoDB
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // 2. Update Prices
        const result = await Product.updateMany(
            {}, // Filter: Update all products (or add { type: 'Partitions' } if needed)
            { $set: { price: 2.99 } }
        );

        console.log(`✅ Updated ${result.modifiedCount} products to 2.99€`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

updatePrices();

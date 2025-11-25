import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Media from '../models/Media.js';

// Configuration
dotenv.config({ path: path.join(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Images to upload and their metadata
const IMAGES_TO_UPLOAD = [
    { filename: 'IMG_1338.JPG', title: 'Performance Live', type: 'photo' },
    { filename: 'IMG_1340.JPG', title: 'Concert', type: 'photo' },
    { filename: 'IMG_1342.JPG', title: 'Sur Scène', type: 'photo' },
    { filename: 'IMG_1347.JPG', title: 'Performance', type: 'photo' },
    { filename: 'AlanPaul-PP.jpg', title: 'Profile Picture', type: 'photo' },
    { filename: 'AlanPaul-background.jpg', title: 'Background', type: 'photo' },
    { filename: 'logoAlanPaul.png', title: 'Logo Light', type: 'photo' },
    { filename: 'logoAlanPaul-darkmode.png', title: 'Logo Dark', type: 'photo' }
];

const ASSETS_DIR = path.join(__dirname, '../../frontend/assets');

const uploadImages = async () => {
    try {
        // 1. Connect to MongoDB
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // 2. Configure Cloudinary
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary credentials missing in .env');
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log('✅ Cloudinary Configured');

        // 3. Process Images
        for (const img of IMAGES_TO_UPLOAD) {
            const filePath = path.join(ASSETS_DIR, img.filename);

            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️ File not found: ${filePath}`);
                continue;
            }

            console.log(`Uploading ${img.filename}...`);

            // Check if already exists in DB to avoid duplicates (optional, based on title)
            const existing = await Media.findOne({ title: img.title });
            if (existing) {
                console.log(`ℹ️  ${img.title} already exists in DB. Skipping.`);
                continue;
            }

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'alanpaul/assets',
                use_filename: true,
                unique_filename: false,
                resource_type: 'auto'
            });

            // Save to MongoDB
            const newMedia = new Media({
                type: img.type,
                url: result.secure_url,
                title: img.title,
                publicId: result.public_id,
                aspectRatio: 'square' // Default
            });

            await newMedia.save();
            console.log(`✅ Saved ${img.title} to DB (${result.secure_url})`);
        }

        console.log('🎉 Migration completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

uploadImages();

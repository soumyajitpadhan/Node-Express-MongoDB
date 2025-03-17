import express from 'express';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { upload } from './utils/upload.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/profile", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Get the file path of the locally stored image
        const localFilePath = req.file.path;

        // Upload image to Cloudinary using the local file path
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: "uploads", // Cloudinary folder
        })

        // Delete the local file after successful upload
        fs.unlinkSync(localFilePath);

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: uploadResult.secure_url, // Cloudinary URL
        })
    }
    catch (error) {
        res.status(500).json({ error: "Failed to upload image", error });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
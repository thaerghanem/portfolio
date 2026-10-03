import "server-only";

import { v2 as cloudinary } from "cloudinary";

export function getCloudinary() {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;

    if (!cloudinaryUrl) {
        throw new Error("CLOUDINARY_URL is missing from .env.local");
    }

    cloudinary.config(cloudinaryUrl);
    cloudinary.config({ secure: true });

    return cloudinary;
}
import "server-only";

import { getCloudinary } from "@/lib/cloudinary";

export type UploadedImage = {
    image_url: string;
    storage_public_id: string;
};

export async function uploadImage(file: File): Promise<UploadedImage> {
    const cloudinary = getCloudinary();
    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "portfolio/projects",
                resource_type: "image",
                allowed_formats: ["jpg", "jpeg", "png", "webp"],
            },
            (error, result) => {
                if (error || !result) {
                    reject(error ?? new Error("Image upload failed"));
                    return;
                }

                resolve({
                    image_url: result.secure_url,
                    storage_public_id: result.public_id,
                });
            },
        );

        stream.on("error", reject);
        stream.end(buffer);
    });
}
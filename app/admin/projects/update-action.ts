"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/require-admin";
import { getDb } from "@/lib/db";
import { getCloudinary } from "@/lib/cloudinary";
import { getProjectById } from "@/lib/projects";
import {
    uploadImage,
    type UploadedImage,
} from "@/lib/upload-image";

type UpdateState = {
    error: string;
};

function isValidUrl(value: string): boolean {
    if (!value) return true;
    if (value.length > 2048) return false;

    try {
        return new URL(value).protocol === "https:";
    } catch {
        return false;
    }
}

export async function updateProject(
    _previousState: UpdateState,
    formData: FormData,
): Promise<UpdateState> {
    await requireAdmin();

    const projectId = Number(formData.get("projectId"));

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        return { error: "Invalid project ID." };
    }

    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const projectUrl = String(formData.get("project_url") ?? "").trim();
    const githubUrl = String(formData.get("github_url") ?? "").trim();
    const featured = formData.get("featured") === "on";
    const sortOrder = Number(formData.get("sort_order") ?? 0);

    const technologies = [
        ...new Set(
            String(formData.get("technologies") ?? "")
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean),
        ),
    ];

    const deleteImageIds = [
        ...new Set(formData.getAll("deleteImageIds").map(Number)),
    ];

    const files = formData
        .getAll("images")
        .filter(
            (value): value is File =>
                value instanceof File && value.size > 0,
        );

    if (!title || title.length > 150) {
        return { error: "Title must contain between 1 and 150 characters." };
    }

    if (!category || category.length > 80) {
        return { error: "Category must contain between 1 and 80 characters." };
    }

    if (!description || description.length > 10000) {
        return {
            error: "Description must contain between 1 and 10,000 characters.",
        };
    }

    if (
        !Number.isInteger(sortOrder) ||
        sortOrder < 0 ||
        sortOrder > 100000
    ) {
        return { error: "Order must be an integer between 0 and 100000." };
    }

    if (
        technologies.length > 20 ||
        technologies.some((technology) => technology.length > 50)
    ) {
        return { error: "Use up to 20 technologies, each under 51 characters." };
    }

    if (!isValidUrl(projectUrl) || !isValidUrl(githubUrl)) {
        return { error: "Project and GitHub URLs must start with https://." };
    }

    if (
        deleteImageIds.some(
            (id) => !Number.isSafeInteger(id) || id <= 0,
        )
    ) {
        return { error: "Invalid image selection." };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (files.some((file) => !allowedTypes.includes(file.type))) {
        return { error: "Only JPG, PNG and WebP images are allowed." };
    }

    const totalSize = files.reduce((total, file) => total + file.size, 0);

    if (totalSize > 3 * 1024 * 1024) {
        return { error: "New images must not exceed 3 MB combined." };
    }

    let stage = "validation";

    try {
        const project = await getProjectById(projectId);

        if (!project) {
            return { error: "Project not found." };
        }

        // Verify that selected images belong to this project.
        const existingIds = new Set(project.images.map((image) => image.id));

        if (deleteImageIds.some((id) => !existingIds.has(id))) {
            return {
                error: "The images have changed. Reload the page and try again.",
            };
        }

        const finalImageCount =
            project.images.length - deleteImageIds.length + files.length;

        if (finalImageCount < 1 || finalImageCount > 10) {
            return { error: "The project must contain between 1 and 10 images." };
        }

        const sql = getDb();
        const deletedIdsJson = JSON.stringify(deleteImageIds);

        // Read Cloudinary IDs from the database, never from the submitted form.
        const imagesToDelete = await sql`
      SELECT storage_public_id
      FROM project_images
      WHERE project_id = ${projectId}
        AND id IN (
          SELECT value::integer
          FROM jsonb_array_elements_text(${deletedIdsJson}::jsonb)
        )
    `;

        stage = "upload";

        const uploadedImages: UploadedImage[] = [];

        for (const file of files) {
            uploadedImages.push(await uploadImage(file));
        }

        stage = "delete-images";

        if (imagesToDelete.length > 0) {
            const cloudinary = getCloudinary();

            for (const image of imagesToDelete) {
                if (!image.storage_public_id) continue;

                const result = await cloudinary.uploader.destroy(
                    String(image.storage_public_id),
                    {
                        resource_type: "image",
                        invalidate: true,
                    },
                );

                if (result.result !== "ok" && result.result !== "not found") {
                    throw new Error("Could not delete an image from Cloudinary.");
                }
            }
        }

        stage = "database";

        const results = await sql.transaction([
            sql`
        UPDATE projects
        SET
          title = ${title},
          category = ${category},
          description = ${description},
          project_url = ${projectUrl || null},
          github_url = ${githubUrl || null},
          technologies = ARRAY(
            SELECT jsonb_array_elements_text(
              ${JSON.stringify(technologies)}::jsonb
            )
          ),
          featured = ${featured},
          sort_order = ${sortOrder},
          updated_at = NOW()
        WHERE id = ${projectId}
        RETURNING id
      `,

            sql`
        DELETE FROM project_images
        WHERE project_id = ${projectId}
          AND id IN (
            SELECT value::integer
            FROM jsonb_array_elements_text(${deletedIdsJson}::jsonb)
          )
      `,

            sql`
        INSERT INTO project_images (
          project_id,
          image_url,
          storage_public_id,
          alt_text,
          sort_order
        )
        SELECT
          ${projectId},
          image.value->>'image_url',
          image.value->>'storage_public_id',
          ${title},
          (
            COALESCE(
              (
                SELECT MAX(sort_order)
                FROM project_images
                WHERE project_id = ${projectId}
              ),
              -1
            ) + image.position
          )::integer
        FROM jsonb_array_elements(
          ${JSON.stringify(uploadedImages)}::jsonb
        ) WITH ORDINALITY AS image(value, position)
      `,
        ]);

        if (results[0].length === 0) {
            return { error: "Project no longer exists." };
        }
    } catch (error: unknown) {
        const message =
            typeof error === "object" &&
                error !== null &&
                "message" in error
                ? String(error.message)
                : "Unknown error";

        console.error(`[updateProject:${stage}]`, message);

        return {
            error:
                "Update could not be completed. Some images may already be uploaded or deleted. Reload the project before retrying.",
        };
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
    revalidatePath(`/admin/projects/${projectId}/edit`);
    revalidatePath("/projects/[id]", "page");
    updateTag("projects");

    redirect("/admin");
}
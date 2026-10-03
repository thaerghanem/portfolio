"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { getDb } from "@/lib/db";
import { getCloudinary } from "@/lib/cloudinary";

type DeleteState = {
    error: string;
};

export async function deleteProject(
    _previousState: DeleteState,
    formData: FormData,
): Promise<DeleteState> {
    await requireAdmin();

    const projectId = Number(formData.get("projectId"));

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        return { error: "Invalid project ID." };
    }

    try {
        const sql = getDb();

        const images = await sql`
      SELECT storage_public_id
      FROM project_images
      WHERE project_id = ${projectId}
    `;

        const publicIds = [
            ...new Set(
                images
                    .map((image) => image.storage_public_id)
                    .filter(
                        (value): value is string =>
                            typeof value === "string" && value.length > 0,
                    ),
            ),
        ];

        if (publicIds.length > 0) {
            const cloudinary = getCloudinary();

            for (const publicId of publicIds) {
                const result = await cloudinary.uploader.destroy(publicId, {
                    resource_type: "image",
                    invalidate: true,
                });

                // "not found" also allows retrying a partially completed deletion.
                if (result.result !== "ok" && result.result !== "not found") {
                    throw new Error("Cloudinary image deletion failed.");
                }
            }
        }

        // ON DELETE CASCADE removes the related project_images rows.
        await sql`
      DELETE FROM projects
      WHERE id = ${projectId}
    `;
    } catch (error: unknown) {
        const message =
            typeof error === "object" &&
                error !== null &&
                "message" in error
                ? String(error.message)
                : "Unknown error";

        console.error("[deleteProject]", message);

        return {
            error:
                "Deletion could not be completed. Some images may already be deleted. Refresh the page before retrying.",
        };
    }

    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/projects/[id]", "page");
    updateTag("projects");

    return { error: "" };
}
"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { uploadImage, type UploadedImage } from "@/lib/upload-image";

type ActionState = {
  error: string;
};

export async function createProject(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

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
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];

  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (!title || title.length > 150) {
    return { error: "Enter a project title of 1–150 characters." };
  }

  if (!category || category.length > 80) {
    return { error: "Enter a category of 1–80 characters." };
  }

  if (!description || description.length > 10000) {
    return { error: "Enter a description of 1–10,000 characters." };
  }

  if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 100000) {
    return { error: "Project order must be an integer from 0 to 100000." };
  }

  if (technologies.length > 20 || technologies.some((item) => item.length > 50)) {
    return { error: "Use up to 20 technologies, each under 51 characters." };
  }

  for (const value of [projectUrl, githubUrl]) {
    if (!value) continue;

    try {
      const url = new URL(value);

      if (url.protocol !== "https:" || value.length > 2048) {
        return { error: "Project links must be valid HTTPS URLs." };
      }
    } catch {
      return { error: "Project links must be valid HTTPS URLs." };
    }
  }

  if (files.length === 0 || files.length > 10) {
    return { error: "Choose between 1 and 10 images." };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (files.some((file) => !allowedTypes.includes(file.type))) {
    return { error: "Only JPG, PNG and WebP images are allowed." };
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > 3 * 1024 * 1024) {
    return { error: "The combined image size must not exceed 3MB." };
  }

  const uploadedImages: UploadedImage[] = [];


  let stage = "upload";

  try {
    for (const file of files) {
      uploadedImages.push(await uploadImage(file));
    }

    stage = "database";

    const sql = getDb();

    // خلي كود SQL الموجود عندك هون كما هو

    await sql`
      WITH new_project AS (
        INSERT INTO projects (
          title,
          category,
          description,
          project_url,
          github_url,
          technologies,
          featured,
          sort_order
        )
        VALUES (
          ${title},
          ${category},
          ${description},
          ${projectUrl || null},
          ${githubUrl || null},
          ARRAY(
            SELECT jsonb_array_elements_text(
              ${JSON.stringify(technologies)}::jsonb
            )
          ),
          ${featured},
          ${sortOrder}
        )
        RETURNING id
      )
      INSERT INTO project_images (
        project_id,
        image_url,
        storage_public_id,
        alt_text,
        sort_order
      )
      SELECT
        new_project.id,
        image.value->>'image_url',
        image.value->>'storage_public_id',
        ${title},
        (image.position - 1)::integer
      FROM new_project
      CROSS JOIN jsonb_array_elements(
        ${JSON.stringify(uploadedImages)}::jsonb
      ) WITH ORDINALITY AS image(value, position)
    `;
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
        error !== null &&
        "message" in error
        ? String(error.message)
        : "Unknown error";

    console.error(`[createProject:${stage}]`, message);

    return {
      error:
        "تعذّر حفظ المشروع. راجع صفحة المشاريع قبل إعادة المحاولة.",
    };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/projects/[id]", "page");
  updateTag("projects");

  redirect("/projects");
}
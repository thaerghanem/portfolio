import "server-only";

import { getDb } from "@/lib/db";

export type ProjectImage = {
  id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  project_url: string | null;
  github_url: string | null;
  technologies: string[];
  featured: boolean;
  sort_order: number;
  images: ProjectImage[];
};

export async function getProjects(
  featuredOnly = false,
): Promise<Project[]> {
  const sql = getDb();

  const rows = await sql`
    SELECT
      p.id,
      p.title,
      p.category,
      p.description,
      p.project_url,
      p.github_url,
      p.technologies,
      p.featured,
      p.sort_order,
      COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', i.id,
              'image_url', i.image_url,
              'alt_text', i.alt_text,
              'sort_order', i.sort_order
            )
            ORDER BY i.sort_order ASC, i.id ASC
          )
          FROM project_images i
          WHERE i.project_id = p.id
        ),
        '[]'::jsonb
      ) AS images
    FROM projects p
    WHERE (${featuredOnly}::boolean = FALSE OR p.featured = TRUE)
    ORDER BY p.sort_order ASC, p.id DESC
  `;

  return rows as Project[];
}

export async function getProjectById(
  id: number,
): Promise<Project | null> {
  const sql = getDb();

  const rows = await sql`
    SELECT
      p.id,
      p.title,
      p.category,
      p.description,
      p.project_url,
      p.github_url,
      p.technologies,
      p.featured,
      p.sort_order,
      COALESCE(
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', i.id,
              'image_url', i.image_url,
              'alt_text', i.alt_text,
              'sort_order', i.sort_order
            )
            ORDER BY i.sort_order ASC, i.id ASC
          )
          FROM project_images i
          WHERE i.project_id = p.id
        ),
        '[]'::jsonb
      ) AS images
    FROM projects p
    WHERE p.id = ${id}
  `;

  return (rows[0] as Project | undefined) ?? null;
}
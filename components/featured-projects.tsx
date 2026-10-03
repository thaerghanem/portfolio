import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";

import { getCachedProjects } from "@/lib/cached-projects";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M14 3h7v7M21 3l-10 10" />
      <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

function ProjectsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading featured projects...</span>

      <div
        aria-hidden="true"
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-xl border
              border-sky-500/25 bg-[#041522]
              motion-safe:animate-pulse"
          >
            <div className="aspect-[16/9] bg-slate-800/60" />

            <div className="space-y-4 p-5">
              <div className="h-5 w-3/4 rounded bg-slate-800" />
              <div className="h-3 w-20 rounded bg-slate-800" />
              <div className="h-12 rounded bg-slate-800/60" />
              <div className="h-7 w-2/3 rounded bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function FeaturedProjectsContent() {
  await connection();

  const projects = (await getCachedProjects())
    .filter((project) => project.featured)
    .slice(0, 3);

  if (projects.length === 0) {
    return (
      <p
        className="rounded-xl border border-sky-500/25
          bg-[#041522] px-6 py-10 text-center text-slate-400"
      >
        Featured projects coming soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {

        const externalUrl = [
          project.project_url,
          project.github_url,
        ].find((url) => url?.startsWith("https://"));

        const detailsUrl = `/projects/${project.id}`;
        return (
          <li key={project.id} className="min-w-0">
            <article
              className="group flex h-full flex-col overflow-hidden
                rounded-xl border border-sky-500/40 bg-[#041522]
                transition-[border-color,box-shadow]
                hover:border-sky-400
                hover:shadow-[0_0_25px_rgba(14,165,233,0.12)]"
            >
              {project.images.length > 0 ? (
                <div className="border-b border-sky-500/25">
                  <div
                    role="region"
                    aria-label={`${project.title} images`}
                    tabIndex={0}
                    className="flex snap-x snap-mandatory overflow-x-auto
        overscroll-x-contain bg-[#061827]
        focus-visible:outline-2 focus-visible:-outline-offset-2
        focus-visible:outline-sky-400"
                  >
                    {project.images.map((image, index) => (
                      <Link
                        key={image.id}
                        href={detailsUrl}
                        aria-label={`View ${project.title} — image ${index + 1}`}
                        className="relative block aspect-[16/9] w-full
            shrink-0 snap-center overflow-hidden
            focus-visible:outline-2 focus-visible:-outline-offset-2
            focus-visible:outline-sky-400"
                      >
                        <Image
                          src={image.image_url}
                          alt={
                            image.alt_text ||
                            `${project.title} — screenshot ${index + 1}`
                          }
                          fill
                          unoptimized
                          className="object-contain"
                        />

                        {project.images.length > 1 && (
                          <span
                            className="absolute bottom-3 right-3 rounded-full
                bg-slate-950/85 px-3 py-1 text-xs text-white"
                          >
                            {index + 1} / {project.images.length}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>

                  {project.images.length > 1 && (
                    <p className="px-3 py-2 text-center text-xs text-slate-400">
                      Swipe or scroll horizontally to explore images
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className="flex aspect-[16/9] items-center justify-center
      border-b border-sky-500/25 bg-[#061827]
      text-sm text-slate-500"
                >
                  Preview coming soon
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 break-words text-lg font-bold">
                    <Link
                      href={detailsUrl}
                      className="transition-colors hover:text-sky-400
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-sky-400"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {externalUrl && (
                    <Link
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      aria-label={`Open ${project.title} in a new tab`}
                      className="shrink-0 rounded p-1 text-slate-100
                        transition-colors hover:text-sky-400
                        focus-visible:outline-2
                        focus-visible:outline-sky-400"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  )}
                </div>

                <p className="mt-1 text-sm text-sky-300">
                  {project.category}
                </p>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <ul
                    aria-label="Technologies"
                    className="mt-auto flex flex-wrap gap-2 pt-5"
                  >
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-md border border-sky-500/25
                          bg-sky-400/10 px-2.5 py-1.5
                          text-xs font-medium text-slate-100"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="featured-projects"
      dir="ltr"
      aria-labelledby="featured-projects-title"
      className="bg-[#020f1b] px-6 py-12 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="mb-6 flex flex-col gap-4
            sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2
              id="featured-projects-title"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Featured <span className="text-sky-400">Projects</span>
            </h2>

            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              A selection of my mobile and web projects
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex w-fit shrink-0 items-center
              gap-2 rounded text-sm font-medium text-sky-400
              transition-colors hover:text-sky-200
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-sky-400"
          >
            View All Projects
            <ArrowIcon />
          </Link>
        </div>

        <Suspense fallback={<ProjectsSkeleton />}>
          <FeaturedProjectsContent />
        </Suspense>
      </div>
    </section>
  );
}
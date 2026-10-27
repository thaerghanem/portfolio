import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { getCachedProjects } from "@/lib/cached-projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Thaer Ghanem",
    description:
        "Explore Thaer Ghanem's portfolio of projects, featuring web development work, creative experiments, and practical solutions built with code.",
};

function ProjectsLoading() {
    return (
        <div role="status" className="mt-10">
            <span className="sr-only">Loading projects...</span>

            <div
                aria-hidden="true"
                className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
            >
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="overflow-hidden rounded-2xl border
              border-sky-500/20 bg-[#061827]
              motion-safe:animate-pulse"
                    >
                        <div className="aspect-video bg-slate-800/70" />

                        <div className="space-y-4 p-6">
                            <div className="h-3 w-20 rounded bg-slate-800" />
                            <div className="h-6 w-2/3 rounded bg-slate-800" />
                            <div className="h-16 rounded bg-slate-800/60" />
                            <div className="h-10 w-32 rounded-xl bg-slate-800" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function ProjectsContent() {
    await connection();

    const projects = await getCachedProjects();

    if (projects.length === 0) {
        return (
            <div
                className="mt-12 rounded-2xl border border-dashed
          border-sky-500/30 bg-[#061827] px-6 py-16 text-center"
            >
                <h2 className="text-xl font-bold">Projects coming soon</h2>

                <p className="mt-3 text-slate-400">
                    I’m preparing a selection of my latest work. Check back soon.
                </p>
            </div>
        );
    }

    return (
        <>
            <p className="mt-8 text-sm text-slate-400">
                {projects.length} {projects.length === 1 ? "project" : "projects"}
            </p>

            <ul className="mt-5 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => {
                    const detailsUrl = `/projects/${project.id}`;
                    const demoUrl = project.project_url?.startsWith("https://")
                        ? project.project_url
                        : null;

                    const githubUrl = project.github_url?.startsWith("https://")
                        ? project.github_url
                        : null;

                    return (
                        <li
                            key={project.id}
                            id={`project-${project.id}`}
                            className="min-w-0 scroll-mt-8"
                        >                            <article
                            className="flex h-full flex-col overflow-hidden
                  rounded-2xl border border-sky-500/25 bg-[#061827]
                  transition-colors hover:border-sky-400/60"
                        >
                                {project.images.length > 0 ? (
                                    <div className="border-b border-sky-500/15">
                                        <div
                                            role="region"
                                            aria-label={`${project.title} images`}
                                            tabIndex={0}
                                            className="flex snap-x snap-mandatory
                        overflow-x-auto overscroll-x-contain
                        bg-[#03111e] focus-visible:outline-2
                        focus-visible:-outline-offset-2
                        focus-visible:outline-sky-400"
                                        >
                                            {project.images.map((image, index) => (
                                                <Link
                                                    key={image.id}
                                                    href={detailsUrl}
                                                    aria-label={`View details for ${project.title}`}
                                                    className="relative block aspect-video w-full shrink-0
    snap-center focus-visible:outline-2
    focus-visible:-outline-offset-2 focus-visible:outline-sky-400"
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
        bg-slate-950/85 px-3 py-1 text-xs text-slate-200"
                                                        >
                                                            {index + 1} / {project.images.length}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>

                                        {project.images.length > 1 && (
                                            <p className="px-4 py-2 text-center text-xs text-slate-400">
                                                Swipe or scroll horizontally to explore images
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="flex aspect-video items-center
                      justify-center bg-[#03111e] text-slate-500"
                                    >
                                        Preview coming soon
                                    </div>
                                )}

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span
                                            className="rounded-full bg-sky-400/10 px-3
                        py-1 text-xs font-semibold text-sky-300"
                                        >
                                            {project.category}
                                        </span>

                                        {project.featured && (
                                            <span className="text-xs font-medium text-amber-300">
                                                ★ Featured
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="mt-4 wrap-break-words text-2xl font-bold tracking-tight">
                                        <Link
                                            href={detailsUrl}
                                            className="rounded transition-colors hover:text-sky-400
      focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-sky-400"
                                        >
                                            {project.title}
                                        </Link>
                                    </h2>
                                    <p
                                        className="mt-3 whitespace-pre-line wrap-break-words
                      text-sm leading-7 text-slate-300"
                                    >
                                        {project.description}
                                    </p>

                                    {project.technologies.length > 0 && (
                                        <ul
                                            aria-label="Technologies"
                                            className="mt-5 flex flex-wrap gap-2"
                                        >
                                            {project.technologies.map((technology) => (
                                                <li
                                                    key={technology}
                                                    className="rounded-lg border border-white/10
                            bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                                                >
                                                    {technology}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link
                                        href={detailsUrl}
                                        className="mt-5 inline-flex w-fit items-center gap-2
    rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold
    text-slate-950 transition-colors hover:bg-sky-400"
                                    >
                                        View details
                                        <span aria-hidden="true">→</span>
                                    </Link>

                                    {(demoUrl || githubUrl) && (
                                        <div className="mt-auto pt-6">
                                            <div
                                                className="flex flex-wrap gap-3
                          border-t border-white/10 pt-5"
                                            >
                                                {demoUrl && (
                                                    <Link
                                                        href={demoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        prefetch={false}
                                                        aria-label={`View ${project.title} — opens in a new tab`}
                                                        className="inline-flex items-center justify-center
                              gap-2 rounded-xl bg-sky-500 px-4 py-2.5
                              text-sm font-semibold text-slate-950
                              transition-colors hover:bg-sky-400
                              focus-visible:outline-2
                              focus-visible:outline-offset-4
                              focus-visible:outline-sky-400"
                                                    >
                                                        View project
                                                        <span aria-hidden="true">↗</span>
                                                    </Link>
                                                )}

                                                {githubUrl && (
                                                    <Link
                                                        href={githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        prefetch={false}
                                                        aria-label={`${project.title} source code — opens in a new tab`}
                                                        className="inline-flex items-center justify-center
                              gap-2 rounded-xl border border-sky-400/40
                              px-4 py-2.5 text-sm font-medium text-sky-200
                              transition-colors hover:bg-sky-400/10
                              focus-visible:outline-2
                              focus-visible:outline-offset-4
                              focus-visible:outline-sky-400"
                                                    >
                                                        GitHub
                                                        <span aria-hidden="true">↗</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default function ProjectsPage() {
    return (
        <main
            data-page="projects"
            dir="ltr"
            className="relative isolate min-h-[75vh] overflow-hidden
        bg-[#020f1b] px-6 py-16 text-white sm:py-20"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0
          -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_70%)]"
            />

            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Selected work
                    </p>

                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                        My <span className="text-sky-400">Projects</span>
                    </h1>

                    <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                        A collection of mobile and web applications, built with
                        thoughtful design, clean code, and practical solutions.
                    </p>
                </div>

                <Suspense fallback={<ProjectsLoading />}>
                    <ProjectsContent />
                </Suspense>
            </div>
        </main>
    );
}
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";

import { getCachedProjects } from "@/lib/cached-projects";

type Props = {
    params: Promise<{ id: string }>;
};

async function ProjectContent({ params }: Props) {
    await connection();

    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
        notFound();
    }

    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId)) {
        notFound();
    }

    const projects = await getCachedProjects();
    const project = projects.find((item) => item.id === projectId);

    if (!project) {
        notFound();
    }

    const demoUrl = project.project_url?.startsWith("https://")
        ? project.project_url
        : null;

    const githubUrl = project.github_url?.startsWith("https://")
        ? project.github_url
        : null;

    return (
        <>
            <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3">
                    <span
                        className="rounded-full border border-sky-400/20
              bg-sky-400/10 px-4 py-1.5 text-sm text-sky-300"
                    >
                        {project.category}
                    </span>

                    {project.featured && (
                        <span className="text-sm text-amber-300">
                            ★ Featured project
                        </span>
                    )}
                </div>

                <h1
                    className="mt-5 break-words text-4xl font-extrabold
            tracking-tight sm:text-5xl"
                >
                    {project.title}
                </h1>
            </header>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="min-w-0 space-y-8">
                    <section aria-labelledby="project-images-title">
                        <h2
                            id="project-images-title"
                            className="mb-4 text-xl font-bold"
                        >
                            Project <span className="text-sky-400">Gallery</span>
                        </h2>

                        {project.images.length > 0 ? (
                            <div className="space-y-6">
                                {project.images.map((image, index) => (
                                    <figure
                                        key={image.id}
                                        className="overflow-hidden rounded-2xl
                      border border-sky-500/30 bg-[#061827]"
                                    >
                                        <div
                                            className="relative h-[min(65vh,560px)]
                        min-h-64 bg-[#03111e]"
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
                                        </div>

                                        <figcaption
                                            className="border-t border-sky-500/20
                        px-4 py-3 text-sm text-slate-400"
                                        >
                                            Screenshot {index + 1} of {project.images.length}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="rounded-2xl border border-sky-500/25
                  bg-[#061827] p-10 text-center text-slate-400"
                            >
                                Screenshots coming soon.
                            </div>
                        )}
                    </section>
                </div>

                <aside className="space-y-6 lg:sticky lg:top-8">
                    <section
                        aria-labelledby="project-about-title"
                        className="rounded-2xl border border-sky-500/25
              bg-[#061827] p-6"
                    >
                        <h2 id="project-about-title" className="text-xl font-bold">
                            About this project
                        </h2>

                        <p
                            className="mt-4 whitespace-pre-line break-words
                text-sm leading-7 text-slate-300"
                        >
                            {project.description}
                        </p>
                    </section>

                    {project.technologies.length > 0 && (
                        <section
                            aria-labelledby="project-tech-title"
                            className="rounded-2xl border border-sky-500/25
                bg-[#061827] p-6"
                        >
                            <h2 id="project-tech-title" className="text-xl font-bold">
                                Technologies
                            </h2>

                            <ul className="mt-4 flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <li
                                        key={technology}
                                        className="rounded-lg border border-sky-400/20
                      bg-sky-400/10 px-3 py-1.5 text-sm text-sky-200"
                                    >
                                        {technology}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {(demoUrl || githubUrl) && (
                        <section
                            aria-labelledby="project-links-title"
                            className="rounded-2xl border border-sky-500/25
                bg-[#061827] p-6"
                        >
                            <h2 id="project-links-title" className="text-xl font-bold">
                                Explore the project
                            </h2>

                            <div className="mt-5 flex flex-col gap-3">
                                {demoUrl && (
                                    <Link
                                        href={demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        prefetch={false}
                                        className="inline-flex items-center justify-center
                      gap-2 rounded-xl bg-sky-500 px-5 py-3
                      font-semibold text-slate-950
                      transition-colors hover:bg-sky-400
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-sky-400"
                                    >
                                        Visit project
                                        <FiArrowUpRight aria-hidden="true" />
                                        <span className="sr-only">Opens in a new tab</span>
                                    </Link>
                                )}

                                {githubUrl && (
                                    <Link
                                        href={githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        prefetch={false}
                                        className="inline-flex items-center justify-center
                      gap-2 rounded-xl border border-sky-400/40
                      px-5 py-3 font-medium text-sky-200
                      transition-colors hover:bg-sky-400/10
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-sky-400"
                                    >
                                        <FiGithub aria-hidden="true" />
                                        Source code
                                        <span className="sr-only">Opens in a new tab</span>
                                    </Link>
                                )}
                            </div>
                        </section>
                    )}

                    <Link
                        href="/contact"
                        className="block rounded-2xl border border-sky-400/30
              bg-gradient-to-br from-sky-500/15 to-blue-600/10
              p-6 transition-colors hover:border-sky-400"
                    >
                        <span className="block text-lg font-bold">
                            Have a similar project?
                        </span>

                        <span className="mt-2 inline-flex items-center gap-2 text-sky-400">
                            Let’s work together
                            <FiArrowUpRight aria-hidden="true" />
                        </span>
                    </Link>
                </aside>
            </div>
        </>
    );
}

export default function ProjectPage({ params }: Props) {
    return (
        <main
            data-page="projects"
            dir="ltr"
            className="min-h-[75vh] bg-[#020f1b] px-6 py-12
        text-white sm:py-16 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/projects"
                    className="mb-8 inline-flex items-center gap-2
            rounded text-sm font-medium text-sky-400
            transition-colors hover:text-sky-200"
                >
                    <FiArrowLeft aria-hidden="true" />
                    All projects
                </Link>

                <Suspense
                    fallback={
                        <p role="status" className="py-16 text-slate-400">
                            Loading project...
                        </p>
                    }
                >
                    <ProjectContent params={params} />
                </Suspense>
            </div>
        </main>
    );
}
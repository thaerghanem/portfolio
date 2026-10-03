"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

import type { Project } from "@/lib/projects";
import { updateProject } from "@/app/admin/projects/update-action";

const inputClass =
    "mt-2 w-full rounded-xl border border-sky-500/30 " +
    "bg-[#020f1b] px-4 py-3 text-white outline-none " +
    "focus:border-sky-400";

export default function EditProjectForm({
    project,
}: {
    project: Project;
}) {
    const [state, formAction, pending] = useActionState(updateProject, {
        error: "",
    });

    return (
        <form action={formAction} className="mt-8">
            <input type="hidden" name="projectId" value={project.id} />

            <fieldset disabled={pending} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-sm font-medium">
                        Project title
                        <input
                            name="title"
                            defaultValue={project.title}
                            required
                            maxLength={150}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-medium">
                        Category
                        <input
                            name="category"
                            defaultValue={project.category}
                            required
                            maxLength={80}
                            placeholder="Flutter, Next.js, Node.js..."
                            className={inputClass}
                        />
                    </label>
                </div>

                <label className="block text-sm font-medium">
                    Description
                    <textarea
                        name="description"
                        defaultValue={project.description}
                        required
                        maxLength={10000}
                        rows={5}
                        className={`${inputClass} resize-y`}
                    />
                </label>

                <label className="block text-sm font-medium">
                    Technologies
                    <input
                        name="technologies"
                        defaultValue={project.technologies.join(", ")}
                        placeholder="Next.js, PostgreSQL, Tailwind CSS"
                        className={inputClass}
                    />
                    <span className="mt-2 block text-xs text-slate-400">
                        Separate technologies with commas.
                    </span>
                </label>

                <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-sm font-medium">
                        Project URL
                        <input
                            name="project_url"
                            type="url"
                            defaultValue={project.project_url ?? ""}
                            placeholder="https://example.com"
                            maxLength={2048}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-medium">
                        GitHub URL
                        <input
                            name="github_url"
                            type="url"
                            defaultValue={project.github_url ?? ""}
                            placeholder="https://github.com/..."
                            maxLength={2048}
                            className={inputClass}
                        />
                    </label>
                </div>

                <section aria-labelledby="existing-images-title">
                    <h2 id="existing-images-title" className="text-lg font-semibold">
                        Current images
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Selected images will be permanently deleted when you save.
                        The first remaining image is the cover.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {project.images.map((image, index) => (
                            <label
                                key={image.id}
                                className="block cursor-pointer overflow-hidden
                  rounded-xl border border-sky-500/25 bg-[#061726]
                  has-[:checked]:border-red-400"
                            >
                                <div className="relative aspect-video">
                                    <Image
                                        src={image.image_url}
                                        alt={image.alt_text || project.title}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />

                                    {index === 0 && (
                                        <span
                                            className="absolute left-2 top-2 rounded-md
                        bg-sky-400 px-2 py-1 text-xs
                        font-bold text-slate-950"
                                        >
                                            Cover
                                        </span>
                                    )}
                                </div>

                                <span className="flex items-center gap-2 p-3 text-sm text-red-300">
                                    <input
                                        type="checkbox"
                                        name="deleteImageIds"
                                        value={image.id}
                                        className="h-4 w-4 accent-red-500"
                                    />
                                    Delete image
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                <label className="block text-sm font-medium">
                    Add new images
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        className={`${inputClass}
              file:mr-4 file:rounded-lg file:border-0
              file:bg-sky-400/10 file:px-3 file:py-2
              file:text-sky-300`}
                    />
                    <span className="mt-2 block text-xs leading-6 text-slate-400">
                        Optional. JPG, PNG or WebP, up to 3 MB combined.
                        Keep between 1 and 10 images in total.
                        New images are added after the existing ones.
                    </span>
                </label>

                <div className="grid items-center gap-6 sm:grid-cols-2">
                    <label className="block text-sm font-medium">
                        Display order
                        <input
                            type="number"
                            name="sort_order"
                            defaultValue={project.sort_order}
                            required
                            min={0}
                            max={100000}
                            step={1}
                            className={inputClass}
                        />
                    </label>

                    <label className="flex items-center gap-3 text-sm font-medium">
                        <input
                            type="checkbox"
                            name="featured"
                            defaultChecked={project.featured}
                            className="h-5 w-5 accent-sky-400"
                        />
                        Featured project
                    </label>
                </div>

                {state.error && (
                    <p
                        role="alert"
                        className="rounded-xl border border-red-400/30
              bg-red-500/10 p-4 text-sm text-red-300"
                    >
                        {state.error}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-xl bg-sky-500 px-6 py-3
              font-semibold text-slate-950 transition-colors
              hover:bg-sky-400 disabled:cursor-not-allowed
              disabled:opacity-50"
                    >
                        {pending ? "Saving..." : "Save changes"}
                    </button>

                    {!pending && (
                        <Link
                            href="/admin"
                            className="rounded-xl border border-sky-400/30
                px-6 py-3 text-sm transition-colors
                hover:bg-sky-400/10"
                        >
                            Cancel
                        </Link>
                    )}
                </div>
            </fieldset>
        </form>
    );
}
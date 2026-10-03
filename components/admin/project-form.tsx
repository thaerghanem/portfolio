"use client";

import { useActionState } from "react";
import { createProject } from "@/app/admin/projects/actions";

const inputClass =
  "mt-2 w-full rounded-xl border border-sky-500/30 bg-[#020f1b] " +
  "px-4 py-3 text-white outline-none focus:border-sky-400";

export default function ProjectForm() {
  const [state, formAction, pending] = useActionState(createProject, {
    error: "",
  });

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <fieldset disabled={pending} className="space-y-6 disabled:opacity-60">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Project title
            <input
              name="title"
              required
              maxLength={150}
              placeholder="Travel Guide App"
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium">
            Category
            <select name="category" required className={inputClass}>
              <option value="Flutter">Flutter</option>
              <option value="Next.js">Next.js</option>
              <option value="Node.js">Node.js</option>
            </select>
          </label>
        </div>

        <label className="block text-sm font-medium">
          Description
          <textarea
            name="description"
            required
            maxLength={10000}
            rows={5}
            className={inputClass}
          />
        </label>

        <label className="block text-sm font-medium">
          Technologies — separated by commas
          <input
            name="technologies"
            placeholder="Flutter, Firebase, Google Maps"
            className={inputClass}
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Live project URL — optional
            <input
              name="project_url"
              type="url"
              placeholder="https://..."
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium">
            GitHub URL — optional
            <input
              name="github_url"
              type="url"
              placeholder="https://github.com/..."
              className={inputClass}
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          Project images
          <input
            name="images"
            type="file"
            multiple
            required
            accept="image/jpeg,image/png,image/webp"
            aria-describedby="images-help"
            className={`${inputClass} file:mr-4 file:rounded-lg
              file:border-0 file:bg-sky-500/15 file:px-4
              file:py-2 file:text-sky-300`}
          />

          <span
            id="images-help"
            className="mt-2 block text-xs leading-relaxed text-slate-400"
          >
            Choose 1–10 images, up to 3MB combined. The first image is the cover.
          </span>
        </label>

        <label className="block text-sm font-medium">
          Display order
          <input
            name="sort_order"
            type="number"
            min={0}
            max={100000}
            step={1}
            defaultValue={0}
            required
            className={inputClass}
          />
        </label>

        <label className="flex items-center gap-3 text-sm">
          <input
            name="featured"
            type="checkbox"
            className="h-4 w-4 accent-sky-500"
          />
          Show in Featured Projects
        </label>
      </fieldset>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30
            bg-red-500/10 p-4 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-blue-600 px-7 py-3 font-semibold
          transition-colors hover:bg-blue-500
          disabled:cursor-wait disabled:opacity-50"
      >
        {pending ? "Uploading and saving…" : "Create project"}
      </button>
    </form>
  );
}
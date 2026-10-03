import Image from "next/image";
import Link from "next/link";

import { signOut } from "@/lib/auth";
import { requireAdmin } from "@/lib/require-admin";
import { getProjects } from "@/lib/projects";
import DeleteProjectButton from "@/components/admin/delete-project-button";

export default async function AdminPage() {
  const session = await requireAdmin();
  const projects = await getProjects();

  return (
    <main
      dir="ltr"
      className="min-h-[65vh] bg-[#020f1b] px-6 py-16 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl font-extrabold">
              Admin <span className="text-sky-400">Dashboard</span>
            </h1>

            <p className="mt-3 text-slate-300">
              Welcome, {session.user?.name ?? "Admin"}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="rounded-xl bg-sky-500 px-5 py-3
                text-sm font-semibold text-slate-950
                transition-colors hover:bg-sky-400"
            >
              + Add project
            </Link>

            <form
              action={async () => {
                "use server";

                await signOut({
                  redirectTo: "/admin/login",
                });
              }}
            >
              <button
                type="submit"
                className="rounded-xl border border-sky-400/50
                  px-5 py-3 text-sm font-medium
                  transition-colors hover:bg-sky-400/10"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mb-6 mt-12 flex items-center gap-3">
          <h2 className="text-2xl font-bold">Your projects</h2>

          <span
            className="rounded-full bg-sky-400/10 px-3 py-1
              text-sm font-semibold text-sky-300"
          >
            {projects.length}
          </span>
        </div>

        {projects.length === 0 ? (
          <div
            className="rounded-2xl border border-dashed
              border-sky-500/30 px-6 py-14 text-center"
          >
            <p className="text-lg font-semibold">No projects yet</p>

            <p className="mt-2 text-slate-400">
              Add your first project to display it here.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex rounded-xl bg-sky-500
                px-5 py-3 font-semibold text-slate-950
                transition-colors hover:bg-sky-400"
            >
              Add project
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => {
              const cover = project.images[0];

              return (
                <article
                  key={project.id}
                  className="flex flex-col overflow-hidden rounded-2xl
                    border border-sky-500/25 bg-[#061726]"
                >
                  <div className="relative aspect-video bg-slate-900">
                    {cover ? (
                      <Image
                        src={cover.image_url}
                        alt={cover.alt_text || project.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full items-center
                          justify-center text-sm text-slate-500"
                      >
                        No cover image
                      </div>
                    )}

                    {project.featured && (
                      <span
                        className="absolute left-3 top-3 rounded-lg
                          bg-sky-400 px-3 py-1 text-xs
                          font-bold text-slate-950"
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm font-medium text-sky-400">
                      {project.category}
                    </p>

                    <h3 className="mt-2 break-words text-xl font-bold">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg bg-sky-400/10
                            px-2.5 py-1 text-xs text-sky-200"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <p className="mb-5 mt-4 text-xs text-slate-500">
                      {project.images.length} image(s)
                      {" · "}
                      Order: {project.sort_order}
                    </p>

                    <div
                      className="mt-auto flex flex-wrap items-start gap-3
    border-t border-white/10 pt-4"
                    >
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-xl border border-sky-400/40
      px-5 py-2.5 text-sm font-medium text-sky-300
      transition-colors hover:bg-sky-400/10"
                      >
                        Edit
                      </Link>

                      <DeleteProjectButton
                        projectId={project.id}
                        projectTitle={project.title}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
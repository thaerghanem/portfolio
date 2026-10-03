import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/require-admin";
import { getProjectById } from "@/lib/projects";
import EditProjectForm from "@/components/admin/edit-project-form";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
    await requireAdmin();

    const { id } = await params;
    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    return (
        <main
            dir="ltr"
            className="min-h-screen bg-[#020f1b] px-6 py-16 text-white"
        >
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-extrabold">
                    Edit <span className="text-sky-400">Project</span>
                </h1>

                <p className="mt-3 text-slate-400">
                    Update your project details and images.
                </p>

                <EditProjectForm project={project} />
            </div>
        </main>
    );
}
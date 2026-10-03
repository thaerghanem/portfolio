import ProjectForm from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/require-admin";

export default async function NewProjectPage() {
    await requireAdmin();

    return (
        <main dir="ltr" className="bg-[#020f1b] px-6 py-12 text-white">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-extrabold">
                    Add <span className="text-sky-400">Project</span>
                </h1>

                <p className="mt-3 text-slate-300">
                    Add your project details and upload its images.
                </p>

                <ProjectForm />
            </div>
        </main>
    );
}
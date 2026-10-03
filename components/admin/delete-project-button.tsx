"use client";

import { useActionState } from "react";
import { deleteProject } from "@/app/admin/projects/delete-action";

type Props = {
    projectId: number;
    projectTitle: string;
};

export default function DeleteProjectButton({
    projectId,
    projectTitle,
}: Props) {
    const [state, formAction, pending] = useActionState(deleteProject, {
        error: "",
    });

    return (
        <form
            action={formAction}
            onSubmit={(event) => {
                const confirmed = window.confirm(
                    `Delete "${projectTitle}" and all its images permanently?`,
                );

                if (!confirmed) {
                    event.preventDefault();
                }
            }}
        >
            <input type="hidden" name="projectId" value={projectId} />

            <button
                type="submit"
                disabled={pending}
                className="rounded-xl border border-red-400/40 px-5 py-2.5
          text-sm font-medium text-red-300 transition-colors
          hover:bg-red-500/10 disabled:cursor-not-allowed
          disabled:opacity-50"
            >
                {pending ? "Deleting..." : "Delete"}
            </button>

            {state.error && (
                <p role="alert" className="mt-3 text-sm text-red-300">
                    {state.error}
                </p>
            )}
        </form>
    );
}
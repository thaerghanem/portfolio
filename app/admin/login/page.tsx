import { redirect } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { auth, signIn } from "@/lib/auth";

export default async function AdminLoginPage() {
    const session = await auth();

    if (
        process.env.ADMIN_GITHUB_ID &&
        session?.user?.id === process.env.ADMIN_GITHUB_ID
    ) {
        redirect("/admin");
    }

    return (
        <main
            dir="ltr"
            className="flex min-h-[65vh] items-center justify-center
        bg-[#020f1b] px-6 py-16 text-white"
        >
            <div
                className="w-full max-w-md rounded-2xl
          border border-sky-500/30 bg-[#061827]
          p-8 text-center"
            >
                <h1 className="text-3xl font-extrabold">
                    Admin <span className="text-sky-400">Login</span>
                </h1>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    Sign in with your authorized GitHub account to manage projects.
                </p>

                <form
                    className="mt-8"
                    action={async () => {
                        "use server";

                        await signIn("github", {
                            redirectTo: "/admin",
                        });
                    }}
                >
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center
              gap-3 rounded-xl bg-blue-600 px-6 py-4
              font-semibold transition-colors hover:bg-blue-500"
                    >
                        <FaGithub aria-hidden="true" className="h-5 w-5" />
                        Continue with GitHub
                    </button>
                </form>
            </div>
        </main>
    );
}
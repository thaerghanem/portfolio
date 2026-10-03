import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function requireAdmin() {
    const session = await auth();
    const adminId = process.env.ADMIN_GITHUB_ID;

    if (
        !adminId ||
        !session?.user ||
        session.user.id !== adminId
    ) {
        redirect("/admin/login");
    }

    return session;
}
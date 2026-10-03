import "server-only";

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 8,
    },

    pages: {
        signIn: "/admin/login",
    },

    callbacks: {
        async signIn({ account }) {
            const adminId = process.env.ADMIN_GITHUB_ID;

            return Boolean(
                adminId &&
                account?.provider === "github" &&
                account.providerAccountId === adminId,
            );
        },

        async jwt({ token, account }) {
            if (account?.provider === "github") {
                token.sub = account.providerAccountId;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            return session;
        },
    },
});
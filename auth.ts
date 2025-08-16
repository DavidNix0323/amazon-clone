import "@/types/next-auth"; // Optional: Extend session types
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminDb } from "@/src/firebase-admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  adapter: FirestoreAdapter(adminDb),

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (typeof token?.uid === "string") {
        session.user = {
          ...session.user,
          id: token.uid,
        };
      }

      if (process.env.NODE_ENV === "development") {
        console.log("Session:", session);
        console.log("Token:", token);
      }

      return session;
    },

    // Optional: Restrict sign-in to specific domains
    // async signIn({ profile }) {
    //   return profile?.email?.endsWith("@yourdomain.com") ?? false;
    // },
  },
});

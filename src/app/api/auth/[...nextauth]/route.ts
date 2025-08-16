import "@/types/next-auth"; // 👈 forces TypeScript to load your module extension
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter"; // Make sure this is installed
import { adminDb } from "@/src/firebase-admin"; // Your Firebase Admin SDK setup

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(adminDb),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (typeof token?.uid === "string") {
        session.user = {
          ...session.user,
          id: token.uid, // ✅ Safe and type-correct
        };
      }
      return session;
    }
    ,
  },
});


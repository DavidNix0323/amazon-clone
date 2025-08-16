import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id: string; // ✅ Required for cart logic
    };
  }

  interface JWT {
    uid?: string;
  }
}

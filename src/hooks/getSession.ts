// hooks/getSession.ts
import { headers } from "next/headers";

export async function getSession() {
  const hdrs = await headers(); // ✅ Await headers
  const proto = hdrs.get("x-forwarded-proto");

  // Replace with real session logic if needed
  const isSecure = proto === "https";
  const user = isSecure ? { name: "David", email: "david@example.com" } : null;

  return { user };
}

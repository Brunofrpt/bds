import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Acces non autorise.");
  }

  return session;
}

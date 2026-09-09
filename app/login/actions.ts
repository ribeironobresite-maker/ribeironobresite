"use server";

import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  setSessionCookie,
  signSession,
  verifyAdminPassword,
} from "@/lib/auth";

// O Next.js usa `throw` internamente pra implementar redirect(). O erro tem
// digest começando com "NEXT_REDIRECT". Esse helper distingue redirects
// legítimos de erros reais sem depender de imports internos do Next.
function isNextRedirect(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as { digest?: unknown }).digest === "string" &&
    (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  try {
    // 1) Confere senha. verifyAdminPassword lança se ADMIN_PASSWORD ausente.
    if (!verifyAdminPassword(password)) {
      redirect("/login?error=invalid");
    }

    // 2) Assina sessão. signSession lança se SESSION_SECRET ausente/curto.
    const token = await signSession("admin");
    await setSessionCookie(token);
  } catch (err) {
    // redirect() do Next "lança" internamente — deixa passar.
    if (isNextRedirect(err)) throw err;

    console.error("[login] erro inesperado:", err);
    redirect("/login?error=config");
  }

  // Fora do try pra não capturar o redirect interno.
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/login");
}

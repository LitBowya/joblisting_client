import { cookies } from "next/headers";

/**
 * Build headers that include the user's cookies so server-side fetches to your backend
 * are authenticated. Merges any extra headers you pass.
 */
export async function withCookieHeaders(
  extra?: HeadersInit,
): Promise<HeadersInit> {
  const jar = await cookies();
  const cookieHeader = jar
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  return {
    "Content-Type": "application/json",
    ...(extra || {}),
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
  };
}

import { auth } from "@/lib/auth";
import type { Context, Next } from "hono";

export async function authMiddleware(c: Context, next: Next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);

    return c.json(
      {
        success: false,
        message: "Not signed in",
      },
      401,
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
}

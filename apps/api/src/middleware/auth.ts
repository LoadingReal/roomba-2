import type { SessionType, UserType } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Variables } from "@/types";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<Variables>(async (c, next) => {
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

  c.set("user", session.user as UserType);
  c.set("session", session.session as SessionType);
  await next();
});

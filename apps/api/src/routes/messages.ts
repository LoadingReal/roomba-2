import { db } from "@/db";
import { messagesTable, type InsertMessage } from "@/db/schema/messages";
import { authMiddleware } from "@/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";
import type { SessionType, UserType } from "@/db/schema";

type Variables = {
  Variables: {
    user: UserType | null;
    session: SessionType | null;
  };
};

const Messages = z.object({
  message: z.string(),
});

const messages = new Hono<Variables>();

messages.get("/", (c) => {
  return c.json({
    success: true,
    message: "Messages route",
  });
});

messages.post(
  "/add",
  zValidator("json", Messages),
  authMiddleware,
  async (c) => {
    const user = c.get("user")!;
    const validated = c.req.valid("json");
    const newMessage: InsertMessage = {
      message: validated.message,
      userId: user.id,
    };

    await db.insert(messagesTable).values(newMessage);

    return c.json({
      success: true,
      validated,
    });
  },
);

export default messages;

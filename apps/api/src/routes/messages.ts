import { db } from "@/db";
import { messagesTable, type InsertMessage } from "@/db/schema/messages";
import { authMiddleware } from "@/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";
import type { Variables } from "@/types";

const Messages = z.object({
  message: z.string().min(1),
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
  authMiddleware,
  zValidator("json", Messages),
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

import { db } from "@/db";
import { messagesTable, type InsertMessage } from "@/db/schema/messages";
import { authMiddleware } from "@/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Variables } from "@/types";

const Messages = z.object({
  message: z.string().min(1),
  roomId: z.string(),
});

const messages = new Hono<Variables>()

  .get("/", (c) => {
    return c.json({
      success: true,
      message: "Messages route",
    });
  })

  .post("/add", authMiddleware, zValidator("json", Messages), async (c) => {
    const user = c.get("user")!;
    const validated = c.req.valid("json");

    const newMessage: InsertMessage = {
      message: validated.message,
      userId: user.id,
      roomId: validated.roomId,
    };

    try {
      const [inserted] = await db
        .insert(messagesTable)
        .values(newMessage)
        .returning();

      return c.json({
        success: true,
        message: "Message sent!",
        data: inserted,
      });
    } catch (error) {
      console.error("Database error:", error);
      return c.json({ success: false, error: "Failed to save message" }, 500);
    }
  });

export default messages;

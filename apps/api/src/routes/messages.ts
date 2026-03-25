import { db } from "@/db";
import { messagesTable, type InsertMessage } from "@/db/schema/messages.sql";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";

const messages = new Hono();

const Messages = z.object({
  message: z.string(),
});

messages.get("/", (c) => {
  return c.json({
    success: true,
    message: "Messages route",
  });
});

messages.post("/add", zValidator("json", Messages), async (c) => {
  const validated = c.req.valid("json");
  const newMessage: InsertMessage = {
    message: validated.message,
  };

  await db.insert(messagesTable).values(newMessage);

  return c.json({
    success: true,
    validated,
  });
});

export default messages;

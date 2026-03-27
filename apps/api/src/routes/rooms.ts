import { authMiddleware } from "@/middleware/auth";
import type { Variables } from "@/types";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

const CreateRoom = z.object({
  name: z.string().min(1, { error: "Too short" }),
});

const rooms = new Hono<Variables>();

rooms.get("/", (c) => {
  return c.json({
    success: true,
    message: "Rooms route",
  });
});

rooms.post(
  "/create",
  authMiddleware,
  zValidator("json", CreateRoom),
  async (c) => {
    const user = c.get("user")!;
    const validated = c.req.valid("json");
    console.log(`${user.name}: ${validated.name}`);
    return c.json({
      success: true,
      message: "Successfully created room",
    });
  },
);

export default rooms;

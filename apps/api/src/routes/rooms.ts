import { db } from "@/db";
import {
  roomsTable,
  usersToRooms,
  type InsertRoom,
  type InsertUsersToRooms,
} from "@/db/schema";
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
    const newRoom: InsertRoom = {
      name: validated.name,
    };

    const result = await db.transaction(async (tx) => {
      const [newRoomResult] = await tx
        .insert(roomsTable)
        .values(newRoom)
        .returning();

      const joinRoom: InsertUsersToRooms = {
        roomId: newRoomResult.id,
        userId: user.id,
      };

      await tx.insert(usersToRooms).values(joinRoom);

      return newRoomResult;
    });

    return c.json({
      success: true,
      result,
    });
  },
);

export default rooms;

import { db } from "@/db";
import { roomsTable } from "@/db/schema";
import { randomInt } from "crypto";
import { eq } from "drizzle-orm";

export function generateRoomId(length: number = 6): string {
  // We exclude confusing characters like 0, O, I, l
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(randomInt(0, alphabet.length));
  }
  return result;
}

export async function generateUniqueRoomId(): Promise<string> {
  const MAX_ATTEMPTS = 50;
  let attempts = 0;
  while (attempts < MAX_ATTEMPTS) {
    let id = generateRoomId(6);
    const existing = await db.query.roomsTable.findFirst({
      where: eq(roomsTable.id, id),
    });

    if (!existing) {
      return id;
    }

    attempts++;
  }

  throw new Error("Couldn't generate a new unique room id");
}

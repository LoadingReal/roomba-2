import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const roomsTable = pgTable("rooms", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
});

export type InsertRoom = typeof roomsTable.$inferInsert;

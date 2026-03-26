import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@/db/schema/columns.helpers.ts";

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text().notNull(),
  message: varchar().notNull(),
  ...timestamps,
});

export type InsertMessage = typeof messagesTable.$inferInsert;

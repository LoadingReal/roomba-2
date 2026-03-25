import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@/db/schema/columns.helpers.ts";

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  message: varchar().notNull(),
  ...timestamps,
});

export type InsertMessage = typeof messagesTable.$inferInsert;

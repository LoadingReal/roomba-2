import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@/db/schema/columns.helpers.ts";

export const messagesTable = pgTable("messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(),
  message: varchar("message").notNull(),
  ...timestamps,
});

export type InsertMessage = typeof messagesTable.$inferInsert;

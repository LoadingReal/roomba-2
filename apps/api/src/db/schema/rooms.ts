  import { pgTable, text } from "drizzle-orm/pg-core";

  export const roomsTable = pgTable("rooms", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
  });

  export type InsertRoom = typeof roomsTable.$inferInsert;

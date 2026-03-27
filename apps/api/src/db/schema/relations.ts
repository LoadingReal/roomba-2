import { relations } from "drizzle-orm";
import { account, session, user } from "@/db/schema/auth-schema";
import { roomsTable } from "@/db/schema/rooms";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { messagesTable } from "@/db/schema/messages";

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  messages: many(messagesTable),
  sessions: many(session),
  usersToRooms: many(usersToRooms),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const usersToRooms = pgTable(
  "users_to_rooms",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    roomId: text("room_id")
      .notNull()
      .references(() => roomsTable.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.roomId] })],
);

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  user: one(user, {
    fields: [messagesTable.userId],
    references: [user.id],
  }),
}));

export const roomsRelations = relations(roomsTable, ({ many }) => ({
  usersToRooms: many(usersToRooms),
}));

export const usersToRoomsRelations = relations(usersToRooms, ({ one }) => ({
  room: one(roomsTable, {
    fields: [usersToRooms.roomId],
    references: [roomsTable.id],
  }),
  user: one(user, {
    fields: [usersToRooms.userId],
    references: [user.id],
  }),
}));

export type InsertUsersToRooms = typeof usersToRooms.$inferInsert;

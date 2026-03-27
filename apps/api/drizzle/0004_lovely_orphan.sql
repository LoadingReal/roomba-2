ALTER TABLE "messages" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "users_to_rooms" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "users_to_rooms" RENAME COLUMN "roomId" TO "room_id";--> statement-breakpoint
ALTER TABLE "users_to_rooms" DROP CONSTRAINT "users_to_rooms_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_rooms" DROP CONSTRAINT "users_to_rooms_roomId_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_rooms" DROP CONSTRAINT "users_to_rooms_userId_roomId_pk";--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_user_id_room_id_pk" PRIMARY KEY("user_id","room_id");--> statement-breakpoint
ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
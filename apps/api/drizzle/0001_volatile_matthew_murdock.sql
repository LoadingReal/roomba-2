CREATE TABLE "users_to_rooms" (
	"userId" text NOT NULL,
	"roomId" integer NOT NULL,
	CONSTRAINT "users_to_rooms_userId_roomId_pk" PRIMARY KEY("userId","roomId")
);
--> statement-breakpoint
ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
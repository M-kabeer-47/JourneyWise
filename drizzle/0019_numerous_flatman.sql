CREATE TABLE IF NOT EXISTS "savedPosts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"type" text NOT NULL,
	"itemID" uuid NOT NULL,
	"createdAt" timestamp DEFAULT '2025-08-25 15:19:45.264'
);
--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-25 15:19:45.263';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-08-25 15:19:45.263';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "savedPosts" ADD CONSTRAINT "savedPosts_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

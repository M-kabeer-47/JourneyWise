CREATE TABLE IF NOT EXISTS "trip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"waypoints" jsonb NOT NULL,
	"estimatedBudget" integer NOT NULL,
	"numPeople" integer NOT NULL,
	"estimatedDuration" integer NOT NULL,
	"currency" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip" ADD CONSTRAINT "trip_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

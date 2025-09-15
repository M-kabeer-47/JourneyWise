CREATE TABLE IF NOT EXISTS "userPreferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"theme" text DEFAULT 'light' NOT NULL,
	"distanceUnits" text DEFAULT 'km' NOT NULL,
	"region" text DEFAULT 'worldwide' NOT NULL,
	"interestTags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"priceDropAlerts" boolean DEFAULT true NOT NULL,
	"bookingUpdates" boolean DEFAULT true NOT NULL,
	"experienceReminders" boolean DEFAULT true NOT NULL,
	"profileVisibility" text DEFAULT 'public' NOT NULL,
	"showSavedItems" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT '2025-09-15 02:45:13.087' NOT NULL,
	"updatedAt" timestamp DEFAULT '2025-09-15 02:45:13.087' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.085';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-15 02:45:13.085';--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.085';--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.085';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-15 02:45:13.086';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

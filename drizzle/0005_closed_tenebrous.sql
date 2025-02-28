ALTER TABLE "gig" ADD COLUMN "isAvailable" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "gig" DROP COLUMN IF EXISTS "startDate";--> statement-breakpoint
ALTER TABLE "gig" DROP COLUMN IF EXISTS "endDate";
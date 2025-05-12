ALTER TABLE "booking" ADD COLUMN "tier" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "booking" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "booking" DROP COLUMN IF EXISTS "noOfPeople";--> statement-breakpoint
ALTER TABLE "booking" DROP COLUMN IF EXISTS "duration";
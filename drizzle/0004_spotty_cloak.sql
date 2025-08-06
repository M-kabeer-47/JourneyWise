ALTER TABLE "experience" ADD COLUMN "currency" text ;--> statement-breakpoint
ALTER TABLE "experience" DROP COLUMN IF EXISTS "maxPrice";
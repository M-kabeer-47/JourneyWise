ALTER TABLE "experience" RENAME COLUMN "tier" TO "tiers";--> statement-breakpoint
ALTER TABLE "review" ADD COLUMN "images" jsonb;
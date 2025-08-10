ALTER TABLE "blog" ADD COLUMN "isPublished" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "blog" DROP COLUMN IF EXISTS "blocks";
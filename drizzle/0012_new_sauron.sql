ALTER TABLE "blog" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "commentsCount" integer DEFAULT 0;
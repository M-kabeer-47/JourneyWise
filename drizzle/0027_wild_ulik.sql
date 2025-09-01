ALTER TABLE "user" RENAME COLUMN "description" TO "bio";--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.038';--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-01 18:23:58.038';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.037';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-01 18:23:58.037';--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.037';--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.038';--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.038';--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.037';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.038';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "country" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 18:23:58.038';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-01 18:23:58.038';
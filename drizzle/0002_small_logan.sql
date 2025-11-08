ALTER TABLE "blog" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.917';--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-07 05:39:09.917';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.916';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-07 05:39:09.916';--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.915';--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.916';--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.916';--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.916';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.917';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.917';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-07 05:39:09.917';--> statement-breakpoint
ALTER TABLE "userPreferences" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-07 05:39:09.918';--> statement-breakpoint
ALTER TABLE "userPreferences" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-07 05:39:09.918';--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "attachments" jsonb;
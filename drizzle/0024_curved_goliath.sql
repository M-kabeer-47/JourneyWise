ALTER TABLE "blog" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.048';--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT '2025-08-29 12:14:51.048';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.046';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-08-29 12:14:51.046';--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.046';--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.047';--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.047';--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.047';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.048';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-29 12:14:51.048';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updatedAt" SET DEFAULT '2025-08-29 12:14:51.048';--> statement-breakpoint
ALTER TABLE "trip" ADD COLUMN "thumbnailUrl" text;
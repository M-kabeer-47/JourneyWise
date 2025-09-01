ALTER TABLE "blog" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.116';--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-01 11:09:06.116';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.115';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-01 11:09:06.115';--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.114';--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.115';--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.115';--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.115';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.116';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "createdAt" SET DEFAULT '2025-09-01 11:09:06.116';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updatedAt" SET DEFAULT '2025-09-01 11:09:06.116';--> statement-breakpoint
ALTER TABLE "trip" ADD COLUMN "country" text;
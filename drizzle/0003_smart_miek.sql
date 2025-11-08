ALTER TABLE "blog" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.103';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-08 02:40:56.103';--> statement-breakpoint
ALTER TABLE "experience" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.102';--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.103';--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.103';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "trip" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "userPreferences" ALTER COLUMN "createdAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "userPreferences" ALTER COLUMN "updatedAt" SET DEFAULT '2025-11-08 02:40:56.104';--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;
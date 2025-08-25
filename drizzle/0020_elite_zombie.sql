ALTER TABLE "savedPosts" RENAME COLUMN "itemID" TO "postID";--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-25 16:46:49.034';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-08-25 16:46:49.034';--> statement-breakpoint
ALTER TABLE "savedPosts" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-25 16:46:49.035';
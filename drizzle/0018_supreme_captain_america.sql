ALTER TABLE "booking" ALTER COLUMN "createdAt" SET DEFAULT '2025-08-24 02:47:32.149';--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "updatedAt" SET DEFAULT '2025-08-24 02:47:32.149';--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "modifiedStartDate" date;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "modifiedTotalPrice" integer;
ALTER TABLE "booking" RENAME COLUMN "totalPrice" TO "price";--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "isCustomRequest" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "notes" text;
ALTER TABLE "trip" RENAME COLUMN "numPeople" TO "numOfPeople";--> statement-breakpoint
ALTER TABLE "trip" ADD COLUMN "estimatedDistance" integer;
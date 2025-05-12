ALTER TABLE "gig" RENAME TO "experience";--> statement-breakpoint
ALTER TABLE "booking" RENAME COLUMN "gigId" TO "experienceID";--> statement-breakpoint
ALTER TABLE "faq" RENAME COLUMN "gigId" TO "experienceID";--> statement-breakpoint
ALTER TABLE "experience" RENAME COLUMN "gigImage" TO "experienceImage";--> statement-breakpoint
ALTER TABLE "experience" RENAME COLUMN "gigImages" TO "experienceImages";--> statement-breakpoint
ALTER TABLE "review" RENAME COLUMN "gigId" TO "experienceID";--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_gigId_gig_id_fk";
--> statement-breakpoint
ALTER TABLE "faq" DROP CONSTRAINT "faq_gigId_gig_id_fk";
--> statement-breakpoint
ALTER TABLE "experience" DROP CONSTRAINT "gig_agentId_agent_id_fk";
--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_gigId_gig_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_experienceID_experience_id_fk" FOREIGN KEY ("experienceID") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faq" ADD CONSTRAINT "faq_experienceID_experience_id_fk" FOREIGN KEY ("experienceID") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experience" ADD CONSTRAINT "experience_agentId_agent_id_fk" FOREIGN KEY ("agentId") REFERENCES "public"."agent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_experienceID_experience_id_fk" FOREIGN KEY ("experienceID") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

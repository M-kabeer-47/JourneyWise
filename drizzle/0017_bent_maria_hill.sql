ALTER TABLE "agent" RENAME COLUMN "userId" TO "userID";--> statement-breakpoint
ALTER TABLE "blog" RENAME COLUMN "authorId" TO "authorID";--> statement-breakpoint
ALTER TABLE "booking" RENAME COLUMN "agentId" TO "agentID";--> statement-breakpoint
ALTER TABLE "booking" RENAME COLUMN "customerId" TO "customerID";--> statement-breakpoint
ALTER TABLE "booking" RENAME COLUMN "paymentId" TO "paymentID";--> statement-breakpoint
ALTER TABLE "experience" RENAME COLUMN "agentId" TO "agentID";--> statement-breakpoint
ALTER TABLE "messages" RENAME COLUMN "senderId" TO "senderID";--> statement-breakpoint
ALTER TABLE "messages" RENAME COLUMN "recipientId" TO "recipientID";--> statement-breakpoint
ALTER TABLE "notifications" RENAME COLUMN "userId" TO "userID";--> statement-breakpoint
ALTER TABLE "review" RENAME COLUMN "userId" TO "userID";--> statement-breakpoint
ALTER TABLE "searchHistory" RENAME COLUMN "userId" TO "userID";--> statement-breakpoint
ALTER TABLE "trip" RENAME COLUMN "userId" TO "userID";--> statement-breakpoint
ALTER TABLE "agent" DROP CONSTRAINT "agent_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "blog" DROP CONSTRAINT "blog_authorId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_agentId_agent_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_customerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_paymentId_payment_id_fk";
--> statement-breakpoint
ALTER TABLE "experience" DROP CONSTRAINT "experience_agentId_agent_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_senderId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_recipientId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "searchHistory" DROP CONSTRAINT "searchHistory_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "trip" DROP CONSTRAINT "trip_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agent" ADD CONSTRAINT "agent_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_authorID_user_id_fk" FOREIGN KEY ("authorID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_agentID_agent_id_fk" FOREIGN KEY ("agentID") REFERENCES "public"."agent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_customerID_user_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_paymentID_payment_id_fk" FOREIGN KEY ("paymentID") REFERENCES "public"."payment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experience" ADD CONSTRAINT "experience_agentID_agent_id_fk" FOREIGN KEY ("agentID") REFERENCES "public"."agent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_senderID_user_id_fk" FOREIGN KEY ("senderID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_recipientID_user_id_fk" FOREIGN KEY ("recipientID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "searchHistory" ADD CONSTRAINT "searchHistory_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip" ADD CONSTRAINT "trip_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

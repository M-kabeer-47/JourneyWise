CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "agent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"socialMediaHandles" jsonb NOT NULL,
	"verificationStatus" boolean DEFAULT false NOT NULL,
	"docs" jsonb NOT NULL,
	"agencyName" text NOT NULL,
	"rating" double precision DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"isPublished" boolean DEFAULT true,
	"authorID" text NOT NULL,
	"category" text,
	"description" text,
	"coverUrl" text,
	"thumbnailUrl" text,
	"commentsCount" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.497' NOT NULL,
	"updatedAt" timestamp DEFAULT '2025-09-02 11:55:53.497' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agentID" uuid NOT NULL,
	"customerID" text NOT NULL,
	"customerName" text NOT NULL,
	"customerEmail" text NOT NULL,
	"customerPhone" text NOT NULL,
	"experienceID" uuid NOT NULL,
	"bookingDate" date NOT NULL,
	"status" text NOT NULL,
	"startDate" date NOT NULL,
	"modifiedStartDate" date,
	"endDate" date NOT NULL,
	"tier" jsonb NOT NULL,
	"totalPrice" integer NOT NULL,
	"modifiedTotalPrice" integer,
	"paymentID" uuid,
	"isCustomRequest" boolean DEFAULT false,
	"noOfPackages" integer,
	"notes" text,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.496',
	"updatedAt" timestamp DEFAULT '2025-09-02 11:55:53.496'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experience" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experienceImage" text NOT NULL,
	"tiers" jsonb NOT NULL,
	"minPrice" integer DEFAULT 0,
	"experienceImages" jsonb NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"location" jsonb NOT NULL,
	"duration" integer NOT NULL,
	"includedServices" jsonb NOT NULL,
	"excludedServices" jsonb NOT NULL,
	"itineraryDetails" jsonb NOT NULL,
	"agentID" uuid NOT NULL,
	"category" jsonb NOT NULL,
	"requirements" jsonb,
	"tags" jsonb,
	"averageRating" double precision NOT NULL,
	"isAvailable" boolean NOT NULL,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.495' NOT NULL,
	"currency" text DEFAULT 'USD'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experienceID" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"senderID" text NOT NULL,
	"recipientID" text NOT NULL,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.496' NOT NULL,
	"status" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"message" text NOT NULL,
	"type" text NOT NULL,
	"isRead" boolean NOT NULL,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.496' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transactionDateTime" timestamp NOT NULL,
	"status" text NOT NULL,
	"paymentType" text NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experienceID" uuid NOT NULL,
	"userID" text NOT NULL,
	"comment" text NOT NULL,
	"images" jsonb,
	"rating" double precision NOT NULL,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.496' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "savedPosts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"type" text NOT NULL,
	"postID" uuid NOT NULL,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.497' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "searchHistory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"searchQuery" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"impersonatedBy" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userID" text NOT NULL,
	"country" text NOT NULL,
	"waypoints" jsonb NOT NULL,
	"estimatedBudget" integer NOT NULL,
	"numOfPeople" integer NOT NULL,
	"estimatedDistance" integer NOT NULL,
	"currency" text NOT NULL,
	"thumbnailUrl" text,
	"createdAt" timestamp DEFAULT '2025-09-02 11:55:53.497' NOT NULL,
	"updatedAt" timestamp DEFAULT '2025-09-02 11:55:53.497' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactor" (
	"id" text PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backupCodes" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"bio" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"twoFactorEnabled" boolean,
	"country" text,
	"phoneNumber" text,
	"phoneNumberVerified" boolean DEFAULT false,
	"dob" date,
	"role" text DEFAULT 'user' NOT NULL,
	"banned" boolean DEFAULT false,
	"banReason" text,
	"banExpires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
 ALTER TABLE "booking" ADD CONSTRAINT "booking_experienceID_experience_id_fk" FOREIGN KEY ("experienceID") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "faq" ADD CONSTRAINT "faq_experienceID_experience_id_fk" FOREIGN KEY ("experienceID") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "review" ADD CONSTRAINT "review_experienceID_experience_id_fk" FOREIGN KEY ("experienceID") REFERENCES "public"."experience"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "savedPosts" ADD CONSTRAINT "savedPosts_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_impersonatedBy_user_id_fk" FOREIGN KEY ("impersonatedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip" ADD CONSTRAINT "trip_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twoFactor" ADD CONSTRAINT "twoFactor_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

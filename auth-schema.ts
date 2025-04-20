import {
  pgTable,
  text,
  uuid,
  integer,
  timestamp,
  boolean,
  jsonb,
  date,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  twoFactorEnabled: boolean("twoFactorEnabled"),
  country: text("country"),
  phoneNumber: text("phoneNumber"),
  phoneNumberVerified: boolean("phoneNumberVerified").default(false),
  dob: date("dob"),
  role: text("role").notNull().default("user"),
  banned: boolean("banned").default(false),
  banReason: text("banReason"),
  banExpires: timestamp("banExpires"),
  

});



export const agent = pgTable("agent", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").notNull().references(() => user.id),
  socialMediaHandles: jsonb("socialMediaHandles").notNull(),
  verificationStatus: boolean("verificationStatus").notNull().default(false),
  docs: jsonb("docs").notNull(),
  agencyName: text("agencyName").notNull(),
});


export const gig = pgTable("gig", {
  id: uuid("id").primaryKey().defaultRandom(),
  gigImage: text("gigImage").notNull(),
  tier: jsonb("tier").notNull(),
  gigImages: jsonb("gigImages").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: jsonb("location").notNull(),
  duration: integer("duration").notNull(),
  includedServices: jsonb("includedServices").notNull(),
  excludedServices: jsonb("excludedServices").notNull(),
  itineraryDetails: jsonb("itineraryDetails").notNull(),
  agentId: uuid("agentId")
    .notNull()
    .references(() => agent.id),
  category: jsonb("category").notNull(),
  requirements: jsonb("requirements"),
  tags: jsonb("tags"),
  averageRating: integer("averageRating").notNull(),
  isAvailable: boolean("isAvailable").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
    impersonatedBy: text("impersonatedBy").references(() => user.id),
})




export const booking = pgTable("booking", {
	id: uuid("id").primaryKey().defaultRandom(),
	agentId: uuid("agentId")
		.notNull()
		.references(() => agent.id),
	customerId: text("customerId")
		.notNull()
		.references(() => user.id),
	gigId: uuid("gigId")
		.notNull()
		.references(() => gig.id),
	bookingDate: date("bookingDate").notNull(),
	totalPrice: jsonb("totalPrice").notNull(),
	status: text({"enum": ["pending", "confirmed", "cancelled","completed"]}).notNull(),
	startDate: date("startDate").notNull(),
	endDate: date("endDate").notNull(),
	noOfPeople: integer("noOfPeople").notNull(),
  duration: integer("duration").notNull(),
	paymentId: uuid("paymentId").references(() => payment.id)
});


/*
## FAQs

- faq_id
- gig_id **(FK)**
- question
- answer
*/

export const faq = pgTable("faq", {
	id: uuid("id").primaryKey().defaultRandom(),
	gigId: uuid("gigId")
		.notNull()
		.references(() => gig.id),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
});




export const review = pgTable("review", {
	id: uuid("id").primaryKey().defaultRandom(),
	gigId: uuid("gigId")
		.notNull()
		.references(() => gig.id),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	comment: text("comment").notNull(),
	rating: integer("rating").notNull(),
	createdAt: timestamp("createdAt").notNull(),
});

export const payment = pgTable("payment", {
	id: uuid("id").primaryKey().defaultRandom(),
	transactionDateTime: timestamp("transactionDateTime").notNull(),
	status: text({"enum": ["pending", "confirmed", "cancelled","refunded"]}).notNull(),
	paymentType: text("paymentType").notNull(),
	amount: integer("amount").notNull(),
});




export const messages = pgTable("messages", {
	id: uuid("id").primaryKey().defaultRandom(),
	senderId: text("senderId")
		.notNull()
		.references(() => user.id),
	recipientId: text("recipientId")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("createdAt").notNull(),
	status: text({"enum": ["sent", "delivered","seen","deleted"]}).notNull(),
	message: text("message").notNull(),
});




export const notifications = pgTable("notifications", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	message: text("message").notNull(),
	type: text({"enum": ["booking", "message","reminder","alert"]}).notNull(),
	isRead: boolean("isRead").notNull(),
	createdAt: timestamp("createdAt").notNull(),
});




export const searchHistory = pgTable("searchHistory", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("userId").notNull().references(() => user.id),
	searchQuery: text("searchQuery").notNull(),
});










export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const twoFactor = pgTable("twoFactor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backupCodes").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const trip = pgTable("trip", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  waypoints: jsonb("waypoints").notNull(),
  estimatedBudget: integer("estimatedBudget").notNull(),
  numPeople: integer("numPeople").notNull(),  
  
  currency: text("currency").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});
export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: jsonb("title").notNull(),
  content: text("content").notNull(),
  
  blocks: jsonb("blocks").notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});


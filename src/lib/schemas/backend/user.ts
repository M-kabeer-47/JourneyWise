import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  emailVerified: z.boolean(),
  image: z.string().url("Invalid image URL").optional().nullable(),
  createdAt: z.string().datetime("Invalid creation date"),
  updatedAt: z.string().datetime("Invalid update date"),
  twoFactorEnabled: z.boolean(),
  role: z.enum(["user", "admin", "agent"], {
    errorMap: () => ({ message: "Role must be user, admin, or agent" })
  }),
  banned: z.boolean(),
  banReason: z.string().optional().nullable(),
  banExpires: z.string().datetime("Invalid ban expiry date").optional().nullable(),
  country: z.string().length(2, "Country code must be 2 characters"),
  phoneNumber: z.string().regex(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().default(""),
}).strict();

export type CompleteUser = z.infer<typeof userSchema>;
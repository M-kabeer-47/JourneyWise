import * as z from "zod";

export const stepOneSchema = z.object({
  title: z.string().min(1, "Title is required"),
  country: z.string().min(1, "Country is required"),
  countryCode: z.string().min(1, "Country code is required"),
  city: z.string().min(1, "City is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.number().min(1, "Duration is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  availability: z.enum(["available", "unavailable"]),
  experienceImage: z
    .union(
      [
        z.string().min(1), // Valid URL string
        z.instanceof(File), // Valid File object
      ],
      {
        errorMap: () => ({ message: "Experience image is required" }),
      }
    )
    .refine(
      (value) => {
        // Additional validation for File objects
        if (value instanceof File) {
          // Check if it's an image
          if (!value.type.startsWith("image/")) {
            return false;
          }
          // Check file size (10MB limit)
          if (value.size > 10 * 1024 * 1024) {
            return false;
          }
        }
        // Check if string is not empty
        if (typeof value === "string" && value.trim() === "") {
          return false;
        }
        return true;
      },
      {
        message:
          "Please upload a valid image file (max 10MB, JPG/PNG/GIF/WebP)",
      }
    ),
});

export const stepTwoSchema = z.object({
  destinations: z.array(
    z.object({
      id: z.string(),
      day: z.number(),
      name: z.string().min(1, "Destination name is required"),
      activities: z
        .array(
          z.object({
            id: z.string(),
            name: z.string().min(1, "Activity name is required"),
            time: z.string().optional(),
            spot: z.string().optional(),
          })
        )
        .min(1, "At least one activity is required"),
    })
  ),
});

export const stepThreeSchema = z.object({
  experienceImages: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(5, "At least 5 images are required"),
  includedServices: z
    .array(z.string().min(1, "service is required"))
    .min(1, "At least one included service is required"),
  excludedServices: z
    .array(z.string().min(1, "service is required"))
    .min(1, "At least one excluded service is required"),
});

export const stepFourSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  tiers: z
    .array(
      z.object({
        name: z.string().min(1, "Tier name is required"),
        members: z
          .number()
          .int()
          .positive("Number of members must be positive"),
        price: z.number().positive("Price must be positive"),
        description: z.string().min(1, "Description is required"),
      })
    )
    .min(1, "At least one tier is required"),
  requirements: z.array(
    z.string().min(1, "Atleast one requirement is required")
  ),
});

export const formSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema)
  .merge(
    z.object({
      averageRating: z.number().optional(),
      totalReviews: z.number().optional(),
      id: z.string().optional(),
    })
  );

export type ExperienceData = z.infer<typeof formSchema>;

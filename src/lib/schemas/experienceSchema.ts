import { z } from "zod";

// Step One Schema
export const stepOneSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  gigImage: z.string().min(1, "Gig image is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  availability: z.enum(["available", "unavailable"]),
  duration: z.string().min(1, "Duration is required"),
});

// Step Two Schema
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
          }),
        )
        .min(1, "At least one activity is required"),
    })
  ),
});

// Step Three Schema
export const stepThreeSchema = z.object({
  images: z.array(z.string()).min(5, "At least 5 images are required"),
  includedServices: z.array(z.string()).min(1, "At least one included service is required"),
  excludedServices: z.array(z.string()),
});

// Step Four Schema
export const stepFourSchema = z.object({
  tiers: z
    .array(
      z.object({
        name: z.string().min(1, "Tier name is required"),
        members: z.number().min(1, "Number of members is required"),
        price: z.number().min(0, "Price is required"),
        description: z.string().min(1, "Tier description is required"),
      }),
    )
    .min(1, "At least one tier is required")
    .refine(
      (tiers) => tiers.some((tier) => tier.name && tier.members && tier.price && tier.description),
      "At least one tier must have all fields filled",
    ),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
});

// Combined Schema for Full Validation
export const gigFormSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema);

export type GigFormData = z.infer<typeof gigFormSchema>;

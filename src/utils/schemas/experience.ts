import * as z from "zod"

export const experienceSchema = z.object({
  gigImage: z.string().url().nonempty(),
  tier: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      description: z.string(),
    }),
  ),
  gigImages: z.array(z.string().url()),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  location: z.object({
    country: z.string().min(1, "Please select a country"),
    city: z.string().min(1, "Please select a city"),
  }),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  includedServices: z.array(z.string()),
  excludedServices: z.array(z.string()),
  itineraryDetails: z.array(
    z.object({
      day: z.number(),
      activities: z.array(z.string()),
    }),
  ),
  category: z.array(z.string()),
  requirements: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  averageRating: z.number().min(0).max(5),
  isAvailable: z.boolean(),
})

export type FormSchema = z.infer<typeof experienceSchema>


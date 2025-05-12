import { z } from "zod";


export const bookingFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date(),
  tier: z.object({
    name: z.string().optional(),
    price: z
      .number({
        invalid_type_error: "Please enter a valid price",
      })
      .min(0, "Price must be a positive number"),
    members: z
      .number({
        invalid_type_error: "Please enter a valid number of travelers",
      })
      .min(1, "Members must be at least 1"),
    description: z.string().optional(),
  }),
  customNotes: z.string().optional(),
  notes: z.string().optional(),
});
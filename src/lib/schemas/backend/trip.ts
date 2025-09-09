import { z } from "zod";
import { waypointSchema } from "../trip";
export const tripSchema = z
  .object({
    numOfPeople: z
      .number({ invalid_type_error: "Number of people is required" })
      .min(1, "Number of people is required"),
    estimatedBudget: z
      .number({ invalid_type_error: "Budget is required" })
      .min(1, "Budget is required"),

    estimatedDistance: z
      .number({ invalid_type_error: "Distance is required" })
      .min(1, "Distance is required"),
    currency: z.string().min(1, "Currency is required"),
    waypoints: z
      .array(waypointSchema)
      .min(2, "At least two waypoints are required"),
    userID: z.string(),
    thumbnailUrl: z.string(),
    country: z.string().min(1, "Country is required"),
  })
  .strict();


export type TripData = z.infer<typeof tripSchema>;

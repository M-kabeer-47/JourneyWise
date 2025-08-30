import * as z from "zod";

// Individual step schemas
export const locationStepSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
});

export const detailsStepSchema = z.object({
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
});

// Combined guide data schema
export const guideDataSchema = locationStepSchema.merge(detailsStepSchema);

// Waypoint schema (simplified)
export const waypointSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  type: z.enum(["start", "end", "stop", "attraction"]),
  hotels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Name is required"),
        detailsLink: z.string().optional(),
        locationLink: z.string().optional(),
      })
    )
    .optional(),
  imageUrl: z.union([z.string(), z.instanceof(File)]).optional(),
});

// Only waypoints array for the main form
export const waypointsSchema = z.object({
  waypoints: z.array(waypointSchema),
});

export const tripSchema = waypointsSchema.merge(detailsStepSchema);

export const partialTripSchema = tripSchema.partial();

// Types
export type LocationStepData = z.infer<typeof locationStepSchema>;
export type DetailsStepData = z.infer<typeof detailsStepSchema>;
export type GuideData = z.infer<typeof guideDataSchema>;
export type WaypointData = z.infer<typeof waypointSchema>;
export type TripData = z.infer<typeof tripSchema>;

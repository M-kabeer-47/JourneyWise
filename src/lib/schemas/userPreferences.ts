import { z } from "zod";

export const preferencesSchema = z
  .object({
    theme: z.enum(["light", "dark", "system"]).default("light"),
    distanceUnits: z.enum(["km", "miles"]).default("km"),
    region: z
      .enum([
        "worldwide",
        "north-america",
        "south-america",
        "europe",
        "asia",
        "africa",
        "australia",
        "middle-east",
        "oceania",
        "caribbean",
      ])
      .default("worldwide"),
    interestTags: z.array(z.string()).default([]),
    priceDropAlerts: z.boolean().default(true),
    bookingUpdates: z.boolean().default(true),
    experienceReminders: z.boolean().default(true),
    profileVisibility: z.enum(["public", "private"]).default("public"),
    showSavedItems: z.boolean().default(true),
  })
  .strict();

export const preferencesUpdateSchema = preferencesSchema.partial();

export type PreferencesForm = z.infer<typeof preferencesSchema>;
export type PreferencesUpdate = z.infer<typeof preferencesUpdateSchema>;

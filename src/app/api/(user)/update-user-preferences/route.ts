import { NextRequest, NextResponse } from "next/server";
import { preferencesUpdateSchema } from "@/lib/schemas/userPreferences";
import { userPreferences } from "../../../../../auth-schema";
import { eq } from "drizzle-orm";
import db from "@/lib/server/db";
import { profile } from "console";
export async function PUT(request: NextRequest) {
  let body = await request.json();
  let result = preferencesUpdateSchema.safeParse(body);
  let userID = request.headers.get("x-user-id");
  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else if (result.error) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
  }

  try {
    let existingPreferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userID, userID));
    if (existingPreferences.length === 0) {
      let response = await db
        .insert(userPreferences)
        .values({ ...result.data, userID })
        .returning({
          theme: userPreferences.theme,
          distanceUnits: userPreferences.distanceUnits,
          region: userPreferences.region,
          interestTags: userPreferences.interestTags,
          priceDropAlerts: userPreferences.priceDropAlerts,
          bookingUpdates: userPreferences.bookingUpdates,
          experienceReminders: userPreferences.experienceReminders,
          showSavedItems: userPreferences.showSavedItems,
          profileVisibility: userPreferences.profileVisibility,
        });
      return NextResponse.json(
        { message: "Preferences updated successfully", data: response[0] },
        { status: 200 }
      );
    }
    let response = await db
      .update(userPreferences)
      .set({ ...result.data })
      .where(eq(userPreferences.userID, userID))
      .returning();
    return NextResponse.json(
      { message: "Preferences updated successfully", data: response[0] },
      { status: 200 }
    );
  } catch (e) {
    console.log("Error updating preferences:", e.message);
    return NextResponse.json(
      { message: "Error updating preferences" },
      { status: 500 }
    );
  }
}

import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { userPreferences } from "@/../auth-schema";
import { eq } from "drizzle-orm";
export async function GET(request: NextRequest) {
  let userID = request.headers.get("x-user-id");
  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const preferences = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userID, userID));
    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching preferences" },
      { status: 500 }
    );
  }
}

import { userSchemaPartial } from "@/lib/schemas/user";
import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { user } from "../../../../../auth-schema";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  let body = await request.json();
  const result = userSchemaPartial.safeParse(body);
  let userID = request.headers.get("x-user-id");
  console.log("User ID in update route:", userID);
  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!result.success) {
    console.log("Error:", result.error);
    return NextResponse.json({ message: result.error }, { status: 400 });
  }
  let image = result.data.image as string;
  // Exclude 'image' if it's a File
  if (typeof result.data.image === "string" && result.data.id) {
    try {
      await db
        .update(user)
        .set({ ...result.data, image })
        .where(eq(user.id, userID));
      return NextResponse.json(
        { message: "User updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ message: "User update failed" }, { status: 500 });
}

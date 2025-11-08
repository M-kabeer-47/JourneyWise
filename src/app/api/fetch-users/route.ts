import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { user } from "../../../../auth-schema";
import { ne, or, ilike } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const userID = request.headers.get("x-user-id");
  
  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search") || "";

  try {
    // Fetch all users except the current logged-in user
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      })
      .from(user)
      .where(
        searchQuery
          ? or(
              ne(user.id, userID),
              ilike(user.name, `%${searchQuery}%`),
              ilike(user.email, `%${searchQuery}%`)
            )
          : ne(user.id, userID)
      )
      .limit(50);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}

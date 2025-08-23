import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { trip } from "../../../../../auth-schema";
import { count, eq, desc, asc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userID = searchParams.get("userID");
  const limit = searchParams.get("limit") || "5";
  const page = searchParams.get("page") || "1";
  const sortColumn = searchParams.get("sortColumn") || "updatedAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const offset = (parseInt(page) - 1) * parseInt(limit);

  if (!userID) return new Response("Missing userID", { status: 400 });
  if (sortColumn !== "updatedAt")
    return new Response("Invalid sortColumn", { status: 400 });
  
  try {
    const trips = await db
      .select()
      .from(trip)
      .where(eq(trip.userID, userID))
      .orderBy(sortOrder === "desc" ? desc(trip.updatedAt) : asc(trip.updatedAt))
      .limit(parseInt(limit))
      .offset(offset);

    const tripsCount = await db
      .select({ count: count() })
      .from(trip)
      .where(eq(trip.userID, userID));

    return NextResponse.json(
      {
        trips,
        pagination: {
          total: tripsCount[0]?.count || 0,
          limit: parseInt(limit),
          page: parseInt(page),
          pages: Math.ceil((tripsCount[0]?.count || 0) / parseInt(limit)),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { agent, booking,experience,user } from "../../../../../auth-schema";
import { alias } from "drizzle-orm/pg-core";
import { count, eq, desc, asc, and } from "drizzle-orm";


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userID = searchParams.get("userID");
  const limit = searchParams.get("limit") || "5";
  const page = searchParams.get("page") || "1";
  const sortColumn = searchParams.get("sortColumn") || "updatedAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Create aliases for user table to distinguish customer and agent
  const customerUser = alias(user, "customerUser");
  const agentUser = alias(user, "agentUser");
  const status = searchParams.get("status")?.toLowerCase() || "all"; // Default to 'all'
  if (!userID) return new Response("Missing userID", { status: 400 });
  if (sortColumn !== "updatedAt")
    return new Response("Invalid sortColumn", { status: 400 });

  if (
    status !== "all" &&
    status !== "approved" &&
    status !== "pending" &&
    status !== "confirmed" &&
    status !== "cancelled" &&
    status !== "completed" &&
    status !== "modification_requested"
  ) {
    return new Response("Invalid status", { status: 400 });
  }
  const conditions = [eq(booking.customerID, userID)];
  if (status !== "all") conditions.push(eq(booking.status, status));

  try {
    const bookings = await db
      .select({
        booking: booking,
        customer: {
          name: customerUser.name,
          image: customerUser.image,
        },
        agent: {
          agencyName: agent.agencyName,
          name: agentUser.name,
          image: agentUser.image,
        },
        experience
      })
      .from(booking)
      .where(
        conditions.length !== 0
          ? and(...conditions)
          : eq(booking.customerID, userID)
      )
      .innerJoin(customerUser, eq(booking.customerID, customerUser.id))
      .innerJoin(agent, eq(booking.agentID, agent.id))
      .innerJoin(agentUser, eq(agent.userID, agentUser.id))
      .innerJoin(experience, eq(booking.experienceID, experience.id))
      .orderBy(
        sortOrder === "desc" ? desc(booking.updatedAt) : asc(booking.updatedAt)
      )
      .limit(parseInt(limit))
      .offset(offset);

    const bookingsCount = await db
      .select({ count: count() })
      .from(booking)
      .where(
        conditions.length !== 0
          ? and(...conditions)
          : eq(booking.customerID, userID)
      );

    return NextResponse.json(
      {
        bookings,
        pagination: {
          total: bookingsCount[0]?.count || 0,
          limit: parseInt(limit),
          page: parseInt(page),
          pages: Math.ceil((bookingsCount[0]?.count || 0) / parseInt(limit)),
        },
      },
      { status: 200 }
    );
  } catch (error) { //@ts-ignore
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from "next/server";
import { trip } from "@/../auth-schema";
import db from "@/lib/server/db";
import { tripSchema } from "@/lib/schemas/trip";
import { eq } from "drizzle-orm";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const tripId = params.id;
  
  try {
    const tripData = await req.json();
    console.log("Update trip data received:", tripData);
    
    const isValidTripData = tripSchema.safeParse(tripData);
    
    if (!isValidTripData.success) {
      return NextResponse.json(
        { 
          message: "Invalid trip data", 
          errors: isValidTripData.error.errors 
        },
        { status: 400 }
      );
    }

    // Check if trip exists
    const existingTrip = await db
      .select()
      .from(trip)
      .where(eq(trip.id, tripId))
      .limit(1);

    if (existingTrip.length === 0) {
      return NextResponse.json(
        { message: "Trip not found" },
        { status: 404 }
      );
    }

    // Update the trip in the database
    const updatedTrip = await db
      .update(trip)
      .set({
        waypoints: isValidTripData.data.waypoints,
        numOfPeople: isValidTripData.data.numOfPeople,
        estimatedBudget: isValidTripData.data.estimatedBudget,
        estimatedDistance: isValidTripData.data.estimatedDistance,
        currency: isValidTripData.data.currency,
        thumbnailUrl: isValidTripData.data.thumbnailUrl,
        updatedAt: new Date(),
      })
      .where(eq(trip.id, tripId))
      .returning();

    return NextResponse.json(
      { 
        message: "Trip updated successfully",
        trip: updatedTrip[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating trip:", error);
    return NextResponse.json(
      { message: "Trip update failed" },
      { status: 500 }
    );
  }
}

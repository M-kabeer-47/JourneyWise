import { NextRequest,NextResponse } from "next/server"
import {trip} from "@/../auth-schema"
import db from "@/lib/server/db"
import { tripSchema } from "@/lib/schemas/backend/trip"

export async function POST(req:NextRequest){
    let tripData = await req.json()
    console.log("Trip data received:", tripData);
    const isValidTripData = tripSchema.safeParse(tripData);
    if (!isValidTripData.success) {
      return NextResponse.json(
        { message: "Invalid trip data",errors:isValidTripData.error.errors },
        { status: 400 }
      );
    }
   
    try{
    await db.insert(trip).values({
      ...isValidTripData.data,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return NextResponse.json({message:"Trip created successfully"},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:"Trip creation failed"},{status:500})
    }

}
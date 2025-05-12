import {trip,user} from "@/../auth-schema"
import db from "@/lib/server/db"
import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function GET(request:NextRequest,{params}:{params:{id:string}}){
  try {
    const { id } =await  params;
    
    if(!id){
      return NextResponse.json({message:"Trip ID is required!"},{status:400})
    }
    
    console.log("Attempting to fetch trip with ID:", id);
    
    let data = await db.select({
      trip:{
        waypoints: trip.waypoints,
        estimatedBudget: trip.estimatedBudget,
        numPeople: trip.numPeople,
        currency: trip.currency,
        createdAt: trip.createdAt,
        updatedAt: trip.updatedAt,
      },
      user:{
        id: user.id,
        name: user.name,
        avatar: user.image,
      }
    }).from(trip).where(eq(trip.id, id)).innerJoin(user, eq(user.id, trip.userID))
    
    console.log("Query result:", data);
    
    if(data.length === 0){
      return NextResponse.json({message:"Trip not found!"},{status:404})
    }
    
    let {trip:tripData, user:userData} = data[0]
    return NextResponse.json({trip:tripData, user:userData},{status:200})
  } catch(error) {
    console.error("Error fetching trip data:", error);
    return NextResponse.json({message: "Error fetching trip data: " + (error instanceof Error ? error.message : String(error))},{status:500})
  }
}
import { NextRequest,NextResponse } from "next/server"
import {trip} from "@/../auth-schema"
import db from "@/lib/server/db"

export async function POST(req:NextRequest){
    let {data} = await req.json()
    try{
    await db.insert(trip).values({
        userId: data.userId,
        waypoints: data.waypoints,
        estimatedBudget: data.estimatedBudget,
        numPeople: data.numPeople,
        
        currency: data.currency,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return NextResponse.json({message:"Trip created successfully"},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:"Trip creation failed"},{status:500})
    }

}
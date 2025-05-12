import { NextRequest, NextResponse } from "next/server";
import { booking } from "@/../auth-schema";
import db from "@/lib/server/db";



export async function POST(req:NextRequest){
    let {booking:Booking} = await req.json();
    console.log("Booking data:", Booking.startDate + " " + Booking.endDate);
    if(!Booking){
        return NextResponse.json({message:"Booking is required!"},{status:400});
    }
    try{
        await db.insert(booking).values(Booking);
    
        return NextResponse.json({message:"Booking created successfully"},{status:201});
    }
    catch(e){
        console.error("Error creating booking:",e);
        return NextResponse.json({message:"Booking creation failed"},{status:500});
    }
}
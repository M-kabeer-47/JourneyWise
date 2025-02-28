import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { user } from "../../../../../auth-schema";
import {eq} from "drizzle-orm";
export async function GET(req:NextRequest) {
    let searchParams = req.nextUrl.searchParams 
    let id = searchParams.get("id")
    if(!id){
        return NextResponse.json({ message: "Id is required" }, { status: 400 })    
    }
    else{
        let User = await db.select().from(user).where(eq(user.id, id))
        if(user){
            return NextResponse.json({user: User[0]}, { status: 200 })
        }
        else{
            return NextResponse.json({ message: "User doesn't exist" }, { status: 404 })
        }
    }
}
    
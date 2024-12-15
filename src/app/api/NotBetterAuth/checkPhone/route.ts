import { NextRequest,NextResponse } from "next/server";
import { user } from "../../../../../auth-schema";
import db from "@/server/db";
import { eq } from "drizzle-orm";
export async function GET(request:NextRequest){
    let searchParams = request.nextUrl.searchParams
    let phone = searchParams.get("phone")
    console.log("phone", phone)
    if(!phone){
        return NextResponse.json({ message: "Phone is required" }, { status: 400 })
    }
    // check if phone exists in the database
    let User = await db.select().from(user).where(eq(user.phone, phone))
    if(User.length > 0){
        console.log("User", User)
        return NextResponse.json({ message: "Phone already exists" }, { status: 409 })
    }
    
    return NextResponse.json({ message: "Phone doesn't exist" }, { status: 200 })

}
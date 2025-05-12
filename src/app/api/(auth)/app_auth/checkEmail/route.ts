import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {user,account} from "../../../../../../auth-schema";
import db from "@/lib/server/db";
export async function GET(request:NextRequest) {
    let searchParams = request.nextUrl.searchParams 
    let email = searchParams.get("email")
    email=email?.toLowerCase() || " "

    if(!email){
        return NextResponse.json({message: "Email is required"},{status: 400})
    }
    let User = await db.select().from(user).where(eq(user.email,email))
    if(User.length === 0){
        return NextResponse.json({message: "Email doesn't exist"},{status: 400})
    }
    let Account = await db.select().from(account).where(eq(account.userId,User[0].id))
    if(Account.length === 1){
        if(Account[0].providerId === "google"){
        return NextResponse.json({message: "Google account already exists"},{status: 409})
        }
    }
    else if(Account.length === 2){
        return NextResponse.json({message:"Google account doesn't exist"},{status: 200})
    }
    return NextResponse.json({message: "User already exists"},{status: 200})




}
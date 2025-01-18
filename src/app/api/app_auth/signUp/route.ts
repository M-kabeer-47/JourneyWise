import {user} from '../../../../../auth-schema';
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../server/db"
import { eq } from 'drizzle-orm';
import { log } from 'console';
export async function POST(req:NextRequest,res:NextResponse) {
    try{
        let {country,phone,dob,userId} = await req.json();
        log("country"+ country);
    await db.update(user).set({country,phoneNumber:phone,dob}).where(eq(user.id,userId));
    return NextResponse.json({message: "Account created successfully"},{status:201});
    }
    catch(e){
        return NextResponse.json({"error":e},{status:500});
    }
    

}
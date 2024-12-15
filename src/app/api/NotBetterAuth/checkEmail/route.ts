import db from "@/server/db";
import { NextRequest,NextResponse} from "next/server";
import { user } from "../../../../../auth-schema";
// take params out of context this is next js
import { eq } from "drizzle-orm";


export  async function GET(request:NextRequest) {
    let searchParams = request.nextUrl.searchParams
    let email = searchParams.get("email")
    console.log("email", email)
    if(!email){
        return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }
    // check if email exists in the database
    let User = await db.select().from(user).where(eq(user.email, email))
    if(User.length > 0){
        console.log("User", User)
        return NextResponse.json({ message: "Email already exists" }, { status: 409 })
    }
    return NextResponse.json({ message: "Email doesn't exist" }, { status: 200 })
}
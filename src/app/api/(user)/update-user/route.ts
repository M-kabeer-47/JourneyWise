import { userSchemaPartial } from "@/lib/schemas/user";
import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { user } from "../../../../../auth-schema";
import { eq } from "drizzle-orm";
export async function PUT(request:NextRequest){
    let body = await request.json()
    console.log("Request body:", body)
    const result = userSchemaPartial.safeParse(body)
    if (!result.success) {
        console.log("Error:", result.error);
        return NextResponse.json({message: result.error}, { status: 400 })
    }
    if(result.data.image instanceof File || result.data.image === null){
        return
    }
    // Exclude 'image' if it's a File
    if(typeof result.data.image === "string" && result.data.id){
        await db.update(user).set({...result.data, image: undefined}).where(eq(user.id, result.data.id))
         return NextResponse.json({message: "User updated successfully"}, { status: 200 })
    } 
    return NextResponse.json({message: "User update failed"}, { status: 500 })

}
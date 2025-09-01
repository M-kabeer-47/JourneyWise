import { userSchema } from "@/lib/schemas/user";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request:NextRequest){
    let body = await request.json()
    const result = userSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json({message: result.error}, { status: 400 })
    }
    console.log(result.data)
}
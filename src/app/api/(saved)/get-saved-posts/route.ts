import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { savedPosts } from "@/../auth-schema";
import { eq,and,asc,desc } from "drizzle-orm";

export async function GET(request:NextRequest){
    let searchParams = request.nextUrl.searchParams
    let type = searchParams.get("type")
    let userID = searchParams.get("userID")
    let sortColumn = searchParams.get("sortColumn") || "createdAt"
    let sortOrder = searchParams.get("sortOrder") || "desc"
    
    if(!userID){
        return NextResponse.json({message:"User ID is required"}, {status:400})
    }
    if(type!=="all" && type!=="blog" && type!=="trip" && type!=="experience"){
        return NextResponse.json({message:"Invalid type"}, {status:400})
    }
    if(sortOrder !== "asc" && sortOrder !== "desc"){
        return NextResponse.json({message:"Invalid sort order"}, {status:400})
    }
    
    let conditions = [eq(savedPosts.userID, userID)]
    if(type!=="all") conditions.push(eq(savedPosts.type, type))
    
    // Determine sort direction and field
    const sortDirection = sortOrder === "asc" ? asc : desc
    let sortField;
    
    // Map sortColumn to actual table columns
    switch(sortColumn) {
        case "createdAt":
            sortField = savedPosts.createdAt;
            break;
        case "type":
            sortField = savedPosts.type;
            break;
        default:
            sortField = savedPosts.createdAt;
    }
    
    try {
        let savedPostsResponse = await db.select().from(savedPosts)
            .where(and(...conditions))
            .orderBy(sortDirection(sortField))
        
        return NextResponse.json(savedPostsResponse, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"}, {status:500})
    }
}
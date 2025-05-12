import { NextRequest,NextResponse} from "next/server";
import {agent} from "../../../../../../auth-schema";
import db from "@/lib/server/db";
export async function POST(request:NextRequest){
    
    let body = await request.json()
    let {docs,userId,socialMediaHandles,agencyName} = body
    let agentData = {
        docs,
        userId,
        socialMediaHandles,
        agencyName
    }
    // insert agnet data using drizzle
    await db.insert(agent).values(agentData)
    return NextResponse.json({message:"Agent data inserted successfully"},{status:201})

    // insert agent data 
    


}
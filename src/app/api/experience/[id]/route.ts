
import { NextRequest,NextResponse } from "next/server";
import db from "@/lib/server/db"
import { agent, gig, user } from "@/../auth-schema"
import { eq } from "drizzle-orm";
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ message: "Experience ID is required!" }, { status: 400 })
    }
    try {        
        
                let result = await db.select({
                experience: gig,
                agent:{
                    agentId: agent.id,
                    userId: agent.userId,
                },
                user:{
                    name: user.name,
                    avatar: user.image,
                }

            }).from(gig).where(eq(gig.id,id)).innerJoin(agent, eq(agent.id, gig.agentId)).innerJoin(user,eq(user.id, agent.userId))
                
            
            let {experience, user:userData, agent:agentData } = result[0]
            return NextResponse.json({ experience, agent: {...userData,...agentData} }, { status: 200 })
        

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error fetching experience!"},{status: 500})
    }

}
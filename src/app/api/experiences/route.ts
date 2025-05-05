import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { agent, gig, user } from "@/../auth-schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
        
    // Build query
    let results = await db
      .select({
        experience: gig,
        agent: {
          agentId: agent.id,
        },
        user: {
          name: user.name,
          avatar: user.image,
        }
      })
      .from(gig)
      .innerJoin(agent, eq(agent.id, gig.agentId))
      .innerJoin(user, eq(user.id, agent.userId)).limit(limit).offset(offset)

      

    
    

    // Format results
    const experiences = results.map(({ experience, user: userData, agent: agentData }) => ({
      experience:experience,
      agent: { ...userData, ...agentData }
    }));

    // Get total count for pagination
    const countResult = await db.select({ count: sql`count(*)` }).from(gig);
    const total = Number(countResult[0].count);

    return NextResponse.json({ 
      experiences, 
      pagination: { 
        total, 
        limit, 
        offset 
      } 
    }, { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching experiences!" }, { status: 500 });
  }
}
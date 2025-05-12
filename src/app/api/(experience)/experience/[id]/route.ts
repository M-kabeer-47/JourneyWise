import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { agent, experience, user } from "@/../auth-schema";
import { eq } from "drizzle-orm";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { message: "Experience ID is required!" },
      { status: 400 }
    );
  }
  try {
    let result = await db
      .select({
        Experience: experience,
        agent: {
          agentID: agent.id,
          userID: agent.userID,
        },
        user: {
          name: user.name,
          avatar: user.image,
        },
      })
      .from(experience)
      .where(eq(experience.id, id))
      .innerJoin(agent, eq(agent.id, experience.agentID))
      .innerJoin(user, eq(user.id, agent.userID));

    let { Experience, user: userData, agent: agentData } = result[0];
    return NextResponse.json(
      { experience: Experience, agent: { ...userData, ...agentData } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching experience!" },
      { status: 500 }
    );
  }
}

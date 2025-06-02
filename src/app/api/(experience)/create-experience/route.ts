import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { experience as ExperienceTable } from "@/../auth-schema";

export async function POST(req: Request) {
  try {
    const { data: experience } = await req.json();
    console.log("Experience: "+JSON.stringify(experience))
    if (!experience.agentID) {
      return NextResponse.json(
        { message: "Agent ID is required!" },
        { status: 400 }
      );
    }

    await db.insert(ExperienceTable).values({...experience,createdAt: new Date()});

    return NextResponse.json(
      { message: "Experiences created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating experiences:", error);
    return NextResponse.json(
      {
        message: "Experience creation failed!",
      },
      { status: 500 }
    );
  }
}

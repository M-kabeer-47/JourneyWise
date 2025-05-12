import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/server/db"
import { experience } from "@/../auth-schema"

export async function POST(req: Request) {
    try {
        const { experience:Experience,agentID } = await req.json();
        if (!experience || !agentID) {
            return NextResponse.json({ message: "Experience and agent ID are required!" }, { status: 400 });
        }

        await db.insert(experience).values({
            ...Experience,
            agentID
        });

        return NextResponse.json({ message: "Experiences created successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error creating experiences:", error);
        return NextResponse.json({ 
            message: "Experience creation failed!",
        }, { status: 500 });
    }
}


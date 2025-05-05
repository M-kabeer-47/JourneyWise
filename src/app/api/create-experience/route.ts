import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/server/db"
import { gig } from "@/../auth-schema"

export async function POST(req: Request) {
    try {
        const { experiences } = await req.json();
        console.log("Processing experiences:", experiences.length);
        
        await Promise.all(experiences.map((experienceItem: any) => {
            const experience = experienceItem.experience;
            
            // Fix date fields - convert ISO string dates to actual Date objects
            if (experience.createdAt && typeof experience.createdAt === 'string') {
                experience.createdAt = new Date(experience.createdAt);
            }
            
            // If there are other date fields in your schema, handle them here too
            // For example:
            // if (experience.updatedAt && typeof experience.updatedAt === 'string') {
            //     experience.updatedAt = new Date(experience.updatedAt);
            // }
            
            return db.insert(gig).values(experience);
        }));
        
        return NextResponse.json({ message: "Experiences created successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error creating experiences:", error);
        return NextResponse.json({ 
            message: "Experience creation failed!",
        
        }, { status: 500 });
    }
}


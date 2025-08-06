import { NextRequest } from "next/server";
import db from "@/lib/server/db";
import { experience as ExperienceTable } from "@/../auth-schema";
import { eq } from "drizzle-orm";
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { experience } = await request.json();
  let Params = await params;
  const experienceId = Params.id;

  // Validate the request experience
  if (
    !experience ||
    !experience.title ||
    !experience.location ||
    !experience.currency
  ) {
    return new Response("Invalid data", { status: 400 });
  }
  
  // Update the experience in the database
  const updatedExperience = await db
    .update(ExperienceTable)
    .set({...experience, createdAt: new Date() })
    .where(eq(ExperienceTable.id, experienceId));
  // Check if the experience was found and updated

  if (!updatedExperience) {
    return new Response("Experience not found", { status: 404 });
  }

  return new Response(JSON.stringify(updatedExperience), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

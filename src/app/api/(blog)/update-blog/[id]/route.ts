import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../auth-schema";
import { eq } from "drizzle-orm";
import db from "@/lib/server/db";
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { title, content, coverUrl, isPublished } = await request.json();
  try {
    await db
      .update(blog)
      .set({
        title,
        content,
        coverUrl,
      })

      .where(eq(blog.id, id));

      return NextResponse.json("Updated blog successfully")
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Error updating blog" },
      { status: 500 }
    );
  }
}

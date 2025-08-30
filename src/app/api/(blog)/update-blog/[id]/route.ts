import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../auth-schema";
import { eq } from "drizzle-orm";
import db from "@/lib/server/db";
import { Blog } from "@/lib/types/blog";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const blogData = await request.json();
  if(!blogData){
    return NextResponse.json(
      { message: "Invalid trip data" },
      { status: 400 }
    );
  }
  
  try {
    await db
      .update(blog)
      .set({
        ...blogData,
        updatedAt: new Date()
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

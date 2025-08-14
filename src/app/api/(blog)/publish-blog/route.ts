import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../auth-schema";
import db from "@/lib/server/db";
export async function POST(request: NextRequest) {
  const { content, title, coverUrl, category, isPublished } =
    await request.json();

  try {
    let result = await db
      .insert(blog)
      .values({
        title,
        content,
        isPublished,
        authorID: "4Tlkb3LOqayKnRDTGayGXHWC6qsePSW7",
        createdAt: new Date(),
        updatedAt: new Date(),
        coverUrl: coverUrl || null,
        category: category || null,
      })
      .returning({
        id: blog.id,
      });
    return NextResponse.json(
      { message: "Blog inserted successfully", id: result[0].id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting blog:", error);
    return NextResponse.json(
      { message: "Error inserting blog" },
      { status: 500 }
    );
  }
}

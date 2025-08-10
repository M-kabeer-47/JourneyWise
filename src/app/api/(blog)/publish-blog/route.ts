import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../auth-schema";
import db from "@/lib/server/db";
;

export async function POST(request: NextRequest) {
  const { blocks, content, title, coverUrl } = await request.json();
  console.log(blocks, content);
  try {
    let result = await db.insert(blog).values({
      title: title,
      content: content,
      isPublished: true,
      authorID: "4Tlkb3LOqayKnRDTGayGXHWC6qsePSW7",
      createdAt: new Date(),
      updatedAt: new Date(),
      coverUrl: coverUrl || null,
    }).returning({
      id: blog.id
    })
    return NextResponse.json({message: "Blog inserted successfully",id: result[0].id}, { status: 200 });
  } catch (error) {
    console.error("Error inserting blog:", error);
    return NextResponse.json({message: "Error inserting blog"}, { status: 500 });
  }
}


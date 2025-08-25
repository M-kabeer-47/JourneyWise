import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/server/db";
import { savedPosts } from "@/../auth-schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let { id } = await params;
    if (!id)
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );

    await db.delete(savedPosts).where(eq(savedPosts.id, id));
    return NextResponse.json(
      { message: "Post Unsaved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

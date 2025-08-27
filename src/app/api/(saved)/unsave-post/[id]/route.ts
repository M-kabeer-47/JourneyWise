import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/server/db";
import { savedPosts } from "@/../auth-schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let { id } = await params;
    const User = await auth.api.getSession({headers: request.headers});
    const userID = User?.user?.id;
    if (!userID)
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    if (!id)
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );

    let postDeleted = await db.delete(savedPosts).where(and(eq(savedPosts.postID, id), eq(savedPosts.userID, userID))).returning({
      type: savedPosts.type
    });
    if(!postDeleted.length){
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Post Unsaved successfully", postType: postDeleted[0]?.type as "experience" | "trip" | "blog" },
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

import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../auth-schema";
import { eq } from "drizzle-orm";
import db from "@/lib/server/db";
import { partialBlogSchema } from "@/lib/schemas/blog";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const blogData = await request.json();
  const isValidBlogData = partialBlogSchema.safeParse(blogData);
  if (!isValidBlogData.success) {
    return NextResponse.json(
      { message: "Invalid blog data" },
      { status: 400 }
    );
  }
  else if(isValidBlogData.success){
    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 }
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

import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../auth-schema";
import db from "@/lib/server/db";
import { blogSchema } from "@/lib/schemas/blog";


export async function POST(request: NextRequest) {
  const blogData = await request.json();
  const isValidBlogData = blogSchema.safeParse(blogData);
  if (!isValidBlogData.success) {
    return NextResponse.json(
      { message: "Invalid blog data" , error: isValidBlogData.error.errors},
      { status: 400 }
    );

  }

 
  try {
    let result = await db
      .insert(blog)
      .values({
        ...isValidBlogData.data,
        createdAt: new Date(),
        updatedAt: new Date(),
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

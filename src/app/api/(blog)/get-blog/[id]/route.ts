import { NextRequest, NextResponse } from "next/server";
import { blog, user } from "@/../auth-schema";
import db from "@/lib/server/db";
import { eq } from "drizzle-orm";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new Response("Missing blog ID", { status: 400 });
    }
    const blogData = await db
      .select({
        blog: blog,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(blog)
      .innerJoin(user, eq(blog.authorID, user.id))
      .where(eq(blog.id, id));
    if (blogData.length === 0) {
      return NextResponse.json("Blog not found", { status: 404 });
    }
    console.log(blogData);
    return NextResponse.json(blogData[0], {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json("Error fetching blog", { status: 500 });
  }
}

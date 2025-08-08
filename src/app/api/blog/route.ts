import { NextRequest, NextResponse } from "next/server";
import { blog, user } from "@/../auth-schema";
import db from "@/lib/server/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { blocks, content, title, coverUrl } = await request.json();
  console.log(blocks, content);
  try {
    await db.insert(blog).values({
      title: title,
      content: content,
      blocks: blocks,
      authorID: "4Tlkb3LOqayKnRDTGayGXHWC6qsePSW7",
      createdAt: new Date(),
      updatedAt: new Date(),
      coverUrl: coverUrl || null,
    });
    return new Response("Blog inserted successfully", { status: 200 });
  } catch (error) {
    console.error("Error inserting blog:", error);
    return new Response("Error inserting blog", { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return new Response("Missing blog ID", { status: 400 });
    }
    const blogData = await db
      .select({
        blog: {
          id: blog.id,
          title: blog.title,
          content: blog.content,
          author: user.name,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
          coverUrl: blog.coverUrl,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
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

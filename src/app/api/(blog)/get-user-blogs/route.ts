import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { blog,user } from "../../../../../auth-schema";
import { count, eq, desc, asc, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userID = searchParams.get("userID");
  const type = searchParams.get("type")?.toLowerCase() || "all"; // Default to 'all'
  const limit = searchParams.get("limit") || "5";
  const page = searchParams.get("page") || "1";
  const sortColumn = searchParams.get("sortColumn") || "updatedAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let isPublished = type === "published";
  let isDraft = type === "drafts";
  console.log("Type: "+type)
  if (!userID) return new Response("Missing userID", { status: 400 });

  if (sortColumn.toString() !== "updatedAt" && sortColumn.toString() !== "mostDiscussed")
    return new Response("Invalid sortColumn", { status: 400 });

  if (type !== "all" && type !== "published" && type !== "drafts")
    return new Response("Invalid type", { status: 400 });

 
  let sortColumns = {
    updatedAt: blog.updatedAt,
    mostDiscussed: blog.commentsCount,
  }
  const conditions = [eq(blog.authorID, userID)];
  if (isPublished) conditions.push(eq(blog.isPublished, true));
  else if (isDraft) conditions.push(eq(blog.isPublished, false));

  try {
    console.log("Conditions:", conditions);
    const blogs = await db
      .select({
        blog: blog,
        author: {
          name: user.name,
          image: user.image,
        },
      })
      .from(blog)
      .where(
        conditions.length !== 0 ? and(...conditions) : eq(blog.authorID, userID)
      ).innerJoin(user,eq(blog.authorID, user.id))
      .orderBy(
        sortOrder === "desc" ? desc(sortColumns[sortColumn as keyof typeof sortColumns]) : asc(sortColumns[sortColumn as keyof typeof sortColumns])
      )
      .limit(parseInt(limit))
      .offset(offset);

    const blogsCount = await db
      .select({ count: count() })
      .from(blog)
      .where(
        conditions.length !== 0 ? and(...conditions) : eq(blog.authorID, userID)
      )
    return NextResponse.json(
      {
        blogs,
        pagination: {
          total: blogsCount[0]?.count || 0,
          limit: parseInt(limit),
          page: parseInt(page),
          pages: Math.ceil((blogsCount[0]?.count || 0) / parseInt(limit)),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

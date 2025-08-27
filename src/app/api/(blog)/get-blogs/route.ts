import { eq, ilike, and, asc, desc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { blog, user, savedPosts } from "../../../../../auth-schema";
import db from "@/lib/server/db";
import { auth } from "@/lib/auth/auth";

const validSortColumns = {
  updatedAt: blog.updatedAt,
  commentsCount: blog.commentsCount,
} as const;

type SortColumnKey = keyof typeof validSortColumns;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const User = await auth.api.getSession({headers: request.headers});

  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const category = searchParams.get("category") || "";

  const sortDirection = order === "asc" ? asc : desc;
  const sortColumn =
    sortBy in validSortColumns
      ? validSortColumns[sortBy as SortColumnKey]
      : blog.createdAt;

  const buildFilterConditions = () => {
    const conditions = [];
    if (search) {
      // Add search condition
      conditions.push(ilike(blog.title, `%${search}%`));
    }
    if (category) {
      // Add category condition
      conditions.push(eq(blog.category, category));
    }
    return conditions;
  };
  let conditions = buildFilterConditions();

  try {
    const fetchBlogs = async () => {
      let blogs = db
        .select({
          blog: blog,
          author: {
            name: user.name,
            image: user.image,
          },
        })
        .from(blog)
        .innerJoin(user, eq(blog.authorID, user.id))

        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(sortDirection(sortColumn))
        .limit(limit)
        .offset((page - 1) * limit);

      return await blogs.execute();
    };

    const fetchBlogsCount = async () => {
      const count = await db
        .select({ count: sql`COUNT(*)` })
        .from(blog)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .execute();
      return count[0]?.count || 0;
    };

    const savedBlogs = async () => {
      if (!User) return [];
      const savedBlogs = await db
        .select({ savedPostID: savedPosts.postID })
        .from(savedPosts)
        .where(and(eq(savedPosts.userID, User.user.id), eq(savedPosts.type, "blog")))
       
      return savedBlogs;
    };

    const [blogs, total, saved] = await Promise.all([fetchBlogs(), fetchBlogsCount(), savedBlogs()]);
    // Format blogs with isSaved field
    const formattedBlogs = blogs.map(({ blog: blogData, author }) => ({
      blog: {...blogData, isSaved: saved.some((savedBlog) => savedBlog.savedPostID === blogData.id)},
      author,
      
    }));

    return NextResponse.json(
      {
        blogs: formattedBlogs,
        pagination: {
          total,
          pages: Math.ceil(Number(total) / limit),
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import db from "@/lib/server/db";
import { blog, experience, savedPosts, trip } from "@/../auth-schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { userID, type, postID } = await request.json();
    console.log(userID, type, postID); 
    if (!userID || !type || !postID) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    if (type != "blog" && type != "trip" && type != "experience") {
      return NextResponse.json(
        { message: "Type must be blog, trip or experience" },
        { status: 400 }
      );
    }
    if (type == "blog") {
      let blogs = await db.select().from(blog).where(eq(blog.id, postID));
      if (!blogs.length) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
    } else if (type == "trip") {
      let trips = await db.select().from(trip).where(eq(trip.id, postID));
      if (!trips.length) {
        return NextResponse.json(
          { message: "Trip not found" },
          { status: 404 }
        );
      }
    } else {
      let experiences = await db
        .select()
        .from(experience)
        .where(eq(experience.id, postID));
      if (!experiences.length) {
        return NextResponse.json(
          { message: "Experience not found"},
          { status: 404 }
        );
      }
    }
    let savedPost = await db
      .select()
      .from(savedPosts)
      .where(and(eq(savedPosts.userID, userID), eq(savedPosts.type, type), eq(savedPosts.postID, postID)));
    if (savedPost.length) {
      return NextResponse.json(
        { message: "Post already saved" },
        { status: 400 }
      );
    }
    let insertedSavedPost = await db.insert(savedPosts).values({ userID, type, postID,createdAt: new Date() }).returning({
      type: savedPosts.type,
    });
    console.log("Inserted Saved Post: ", insertedSavedPost[0]);

    return NextResponse.json(
      { message: "Post saved successfully", postType: insertedSavedPost[0]?.type as "experience" | "trip" | "blog" },
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

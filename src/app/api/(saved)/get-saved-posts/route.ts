import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { agent, blog, experience, savedPosts, trip, user } from "@/../auth-schema";
import { eq, and, asc, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  let searchParams = request.nextUrl.searchParams;
  let type = searchParams.get("type");
  let userID = searchParams.get("userID");
  let sortColumn = searchParams.get("sortColumn") || "createdAt";
  let sortOrder = searchParams.get("sortOrder") || "desc";

  if (!userID) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }
  if (
    type !== "all" &&
    type !== "blog" &&
    type !== "trip" &&
    type !== "experience"
  ) {
    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }
  if (sortOrder !== "asc" && sortOrder !== "desc") {
    return NextResponse.json(
      { message: "Invalid sort order" },
      { status: 400 }
    );
  }

  let conditions = [eq(savedPosts.userID, userID)];
  if (type !== "all") conditions.push(eq(savedPosts.type, type));

  // Determine sort direction and field
  const sortDirection = sortOrder === "asc" ? asc : desc;
  let sortField;

  // Map sortColumn to actual table columns
  switch (sortColumn) {
    case "createdAt":
      sortField = savedPosts.createdAt;
      break;
    case "type":
      sortField = savedPosts.type;
      break;
    default:
      sortField = savedPosts.createdAt;
  }

  try {
    if (type === "trip") {
      let savedTrips = await db
        .select()
        .from(savedPosts)
        .innerJoin(trip, eq(trip.id, savedPosts.postID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField));
      return NextResponse.json(savedTrips, { status: 200 });
    } else if (type === "blog") {
      let savedBlogs = await db
        .select()
        .from(savedPosts)
        .innerJoin(blog, eq(blog.id, savedPosts.postID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField));
      return NextResponse.json(savedBlogs, { status: 200 });
    } else if (type === "experience") {
      let savedExperiences = await db
        .select()
        .from(savedPosts)
        .innerJoin(experience, eq(experience.id, savedPosts.postID)).innerJoin(agent,eq(agent.id,experience.agentID)).innerJoin(user,eq(user.id,agent.userID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField));
        let results = savedExperiences.map(({savedPosts,experience,agent,user})=>{
            return {
                savedPosts: savedPosts,
                experience: {...experience,isSaved:true,agent:{...agent,name: user?.name,avatar: user?.image}},
            }
        })
      return NextResponse.json(results, { status: 200 });
    } else {
      let allSavedPosts = await db
        .select()
        .from(savedPosts)
        .leftJoin(trip, eq(trip.id, savedPosts.postID))
        .leftJoin(blog, eq(blog.id, savedPosts.postID))
        .leftJoin(experience, eq(experience.id, savedPosts.postID)).leftJoin(agent,eq(agent.id,experience.agentID)).leftJoin(user,eq(user.id,agent.userID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField));

     let results = allSavedPosts.map(({savedPosts,trip,experience,blog,agent,user},index)=>{
        return {
            experience: {...experience, isSaved:true,agent:{...agent,name: user?.name,avatar: user?.image}},
            trip: trip,
            blog: blog,
            savedPosts: savedPosts
        }
     })
     console.log(results);

      return NextResponse.json(results, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

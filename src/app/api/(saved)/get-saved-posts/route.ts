import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import {
  agent,
  blog,
  experience,
  savedPosts,
  trip,
  user,
} from "@/../auth-schema";
import { eq, and, asc, desc, count } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function GET(request: NextRequest) {
  let searchParams = request.nextUrl.searchParams;
  let type = searchParams.get("type");
  let userID = searchParams.get("userID");
  let sortColumn = searchParams.get("sortColumn") || "createdAt";
  let sortOrder = searchParams.get("sortOrder") || "desc";
  let limit = parseInt(searchParams.get("limit") || "6");
  let page = parseInt(searchParams.get("page") || "1");
  let offset = (page - 1) * limit;

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
        .innerJoin(user, eq(user.id, trip.userID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField))
        .limit(limit)
        .offset(offset);
      
      let totalCount = await db
        .select({ count: count() })
        .from(savedPosts)
        .innerJoin(trip, eq(trip.id, savedPosts.postID))
        .where(and(...conditions));
        
      let results = savedTrips.map(({ savedPosts, trip, user }) => {
        return {
          savedPost: savedPosts,
          trip: {
            ...trip,
            isSaved: true,
            user: { name: user.name, image: user.image },
          },
        };
      });
      
      return NextResponse.json({
        savedPosts: results,
        pagination: {
          total: totalCount[0]?.count || 0,
          limit,
          page,
          pages: Math.ceil((totalCount[0]?.count || 0) / limit),
        },
      }, { status: 200 });
    } else if (type === "blog") {
      let savedBlogs = await db
        .select()
        .from(savedPosts)
        .innerJoin(blog, eq(blog.id, savedPosts.postID))
        .innerJoin(user, eq(user.id, blog.authorID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField))
        .limit(limit)
        .offset(offset);
        
      let totalCount = await db
        .select({ count: count() })
        .from(savedPosts)
        .innerJoin(blog, eq(blog.id, savedPosts.postID))
        .where(and(...conditions));
        
      let results = savedBlogs.map(({ savedPosts, blog, user }) => {
        return {
          savedPost: savedPosts,
          blog: {
            blog: { ...blog, isSaved: true },
            author: { name: user.name, image: user.image },
          },
        };
      });
      
      return NextResponse.json({
        savedPosts: results,
        pagination: {
          total: totalCount[0]?.count || 0,
          limit,
          page,
          pages: Math.ceil((totalCount[0]?.count || 0) / limit),
        },
      }, { status: 200 });
    } else if (type === "experience") {
      let savedExperiences = await db
        .select()
        .from(savedPosts)
        .innerJoin(experience, eq(experience.id, savedPosts.postID))
        .innerJoin(agent, eq(agent.id, experience.agentID))
        .innerJoin(user, eq(user.id, agent.userID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField))
        .limit(limit)
        .offset(offset);
        
      let totalCount = await db
        .select({ count: count() })
        .from(savedPosts)
        .innerJoin(experience, eq(experience.id, savedPosts.postID))
        .where(and(...conditions));
        
      let results = savedExperiences.map(
        ({ savedPosts, experience, agent, user }) => {
          return {
            savedPost: savedPosts,
            experience: {
              ...experience,
              isSaved: true,
              agent: { ...agent, name: user?.name, image: user?.image },
            },
          };
        }
      );
      
      return NextResponse.json({
        savedPosts: results,
        pagination: {
          total: totalCount[0]?.count || 0,
          limit,
          page,
          pages: Math.ceil((totalCount[0]?.count || 0) / limit),
        },
      }, { status: 200 });
    } else {
      let blogUser = alias(user, "blogUser");
      let experienceUser = alias(user, "experienceUser");
      let tripUser = alias(user, "tripUser");
      let allSavedPosts = await db
        .select()
        .from(savedPosts)
        .leftJoin(trip, eq(trip.id, savedPosts.postID))
        .leftJoin(tripUser, eq(tripUser.id, trip.userID))
        .leftJoin(blog, eq(blog.id, savedPosts.postID))
        .leftJoin(blogUser, eq(blogUser.id, blog.authorID))
        .leftJoin(experience, eq(experience.id, savedPosts.postID))
        .leftJoin(agent, eq(agent.id, experience.agentID))
        .leftJoin(experienceUser, eq(experienceUser.id, agent.userID))
        .where(and(...conditions))
        .orderBy(sortDirection(sortField))
        .limit(limit)
        .offset(offset);
        
      let totalCount = await db
        .select({ count: count() })
        .from(savedPosts)
        .where(and(...conditions));

      let results = allSavedPosts.map(
        (
          {
            savedPosts,
            trip,
            experience,
            blog,
            agent,
            experienceUser,
            blogUser,
            tripUser,
          },
          index
        ) => {
          return {
            trip: trip
              ? {
                  ...trip,
                  isSaved: true,
                  author: { name: tripUser?.name, image: tripUser?.image },
                }
              : null,
            experience: experience
              ? {
                  ...experience,
                  isSaved: true,
                  agent: {
                    ...agent,
                    name: experienceUser?.name,
                    image: experienceUser?.image,
                  },
                }
              : null,

            blog: blog
              ? {
                  blog: blog,
                  author: { name: blogUser?.name, image: blogUser?.image },
                }
              : null,
            savedPost: savedPosts,
          };
        }
      );

      return NextResponse.json({
        savedPosts: results,
        pagination: {
          total: totalCount[0]?.count || 0,
          limit,
          page,
          pages: Math.ceil((totalCount[0]?.count || 0) / limit),
        },
      }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

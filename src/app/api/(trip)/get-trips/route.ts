import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { trip, user, savedPosts } from "@/../auth-schema";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    
    const User = await auth.api.getSession({headers: request.headers})

    // Pagination parameters
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    // Calculate offset from page number
    const offset = (page - 1) * limit;

    // Sorting parameters
    const sortBy = searchParams.get("sortBy") || "createdAt"; // Default sort field
    const sortOrder = searchParams.get("sortOrder") || "desc"; // Default sort direction

    // Filtering parameters
    const minBudget = searchParams.get("minBudget");
    const maxBudget = searchParams.get("maxBudget");
    const minGroupSize = searchParams.get("minGroupSize");
    const maxGroupSize = searchParams.get("maxGroupSize");
    const minDistance = searchParams.get("minDistance");
    const maxDistance = searchParams.get("maxDistance");
    const waypoints = searchParams.get("waypoints"); // Comma-separated list of waypoints
    
    // Search parameter
    const searchQuery = searchParams.get("search");

    // Build filter conditions
    const buildFilterConditions = () => {
      const conditions = [];

      // Handle budget range filter
      if (minBudget !== null) {
        conditions.push(sql`${trip.estimatedBudget} >= ${parseFloat(minBudget)}`);
      }
      if (maxBudget !== null) {
        conditions.push(sql`${trip.estimatedBudget} <= ${parseFloat(maxBudget)}`);
      }

      // Handle group size range filter
      if (minGroupSize !== null) {
        conditions.push(
          sql`${trip.numOfPeople} >= ${parseInt(minGroupSize)}`
        );
      }
      if (maxGroupSize !== null) {
        conditions.push(
          sql`${trip.numOfPeople} <= ${parseInt(maxGroupSize)}`
        );
      }

      // Handle distance range filter
      if (minDistance !== null) {
        conditions.push(
          sql`${trip.estimatedDistance} >= ${parseInt(minDistance)}`
        );
      }
      if (maxDistance !== null) {
        conditions.push(
          sql`${trip.estimatedDistance} <= ${parseInt(maxDistance)}`
        );
      }


      // Handle waypoints filter - check if any waypoint cities match in JSONB
      if (waypoints !== null && waypoints.length > 0) {
        const waypointArray = waypoints.split(",");
        const waypointConditions = waypointArray.map(waypoint => 
          sql`${trip.waypoints}::text ILIKE '%${waypoint.trim()}%'`
        );
        
        if (waypointConditions.length > 0) {
          conditions.push(or(...waypointConditions));
        }
      }

      // Handle search query
      if (searchQuery !== null && searchQuery.length > 0) {
        conditions.push(
          // Search in waypoint cities stored in JSONB
          sql`${trip.waypoints}::text ILIKE '%${searchQuery}%'`
        );
      }

      return conditions;
    };

    // Get all filter conditions
    const filterConditions = buildFilterConditions();

    // Determine sort direction
    const sortDirection = sortOrder.toLowerCase() === "asc" ? asc : desc;

    // Valid sort columns
    const validSortColumns: Record<string, any> = {
      id: trip.id,
      estimatedBudget: trip.estimatedBudget,
      numOfPeople: trip.numOfPeople,
      estimatedDistance: trip.estimatedDistance,
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt,
    };

    const executeQuery = async () => {
      const query = db
        .select({
          trip: trip,
          user: { name: user.name, image: user.image },
          isSaved: sql`CASE WHEN ${savedPosts.postID} IS NOT NULL THEN true ELSE false END`.as('isSaved'),
        })
        .from(trip)
        .innerJoin(user, eq(user.id, trip.userID))
        .leftJoin(
          savedPosts,
          and(
            eq(savedPosts.postID, trip.id),
            eq(savedPosts.type, "trip"),
            User ? eq(savedPosts.userID, User.user.id) : sql`false`
          )
        )
        .where(
          filterConditions.length > 0 ? and(...filterConditions) : undefined
        )
        .limit(limit)
        .offset(offset)
        .orderBy(
          validSortColumns[sortBy]
            ? sortDirection(validSortColumns[sortBy])
            : sortDirection(trip.createdAt)
        );

      return await query.execute();
    };

    // Build and execute the count query with the same filters
    const executeCountQuery = async () => {
      let countQuery = await db
        .select({ count: sql`count(*)` })
        .from(trip)
        .innerJoin(user, eq(user.id, trip.userID))
        .where(
          filterConditions.length > 0 ? and(...filterConditions) : undefined
        )
        .execute();

      return Number(countQuery[0].count);
    };


    // Run both queries concurrently
    const [results, total] = await Promise.all([
      executeQuery(),
      executeCountQuery(),
    ]);

    // Format results
    const trips = results.map(
      ({ trip: tripData, user: userData, isSaved }) => ({
        id: tripData.id,
        estimatedBudget: tripData.estimatedBudget,
        numOfPeople: tripData.numOfPeople,
        estimatedDistance: tripData.estimatedDistance,
        currency: tripData.currency,
        createdAt: tripData.createdAt,
        updatedAt: tripData.updatedAt,
        waypoints: tripData.waypoints || [],
        user: {
          id: tripData.userID,
          name: userData.name,
          image: userData.image,
        },
        isSaved: Boolean(isSaved),
      })
    );

    return NextResponse.json(
      {
        trips,
        totalTrips: total,
        pagination: {
          total,
          limit,
          offset,
          pages: Math.ceil(total / limit),
        },
        filters: {
          budget: { min: minBudget, max: maxBudget },
          groupSize: { min: minGroupSize, max: maxGroupSize },
          distance: { min: minDistance, max: maxDistance },
          waypoints: waypoints ? waypoints.split(",") : null,
          search: searchQuery || null,
        },
        sort: {
          field: sortBy,
          order: sortOrder,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in trips API:", error);
    return NextResponse.json(
      { message: "Error fetching trips!" },
      { status: 500 }
    );
  }
}

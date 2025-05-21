import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { agent, experience, user } from "@/../auth-schema";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;

    // Pagination parameters
    // Pagination parameters
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    // Calculate offset from page number
    const offset = (page - 1) * limit;

    // Sorting parameters
    const sortBy = searchParams.get("sortBy") || "createdAt"; // Default sort field
    const sortOrder = searchParams.get("sortOrder") || "desc"; // Default sort direction

    // Filtering parameters
    const isAvailable = searchParams.get("isAvailable");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minDuration = searchParams.get("minDuration");
    const maxDuration = searchParams.get("maxDuration");
    const tags = searchParams.get("tags");

    const locations = searchParams.get("locations"); // Comma-separated list of locations
    // Search parameter
    const searchQuery = searchParams.get("search");

    // Build filter conditions using a switch-case style helper
    const buildFilterConditions = () => {
      const conditions = [];

      // Handle isAvailable filter
      if (isAvailable !== null) {
        conditions.push(eq(experience.isAvailable, isAvailable === "true"));
      }

      // Handle price range filter using the tierInfo array in tier
      if (minPrice !== null) {
        // Assume the lowest tier price is at index 0
        conditions.push(sql`${experience.maxPrice} >= ${parseFloat(minPrice)}`);
      }
      if (maxPrice !== null) {
        // Assume the highest tier price is at the last index
        conditions.push(sql`${experience.minPrice} <= ${parseFloat(maxPrice)}`);
      }

      // Handle duration range filter
      if (minDuration !== null) {
        conditions.push(
          sql`${experience.duration} >= ${parseInt(minDuration)}`
        );
      }
      if (maxDuration !== null) {
        conditions.push(
          sql`${experience.duration} <= ${parseInt(maxDuration)}`
        );
      }

      // Handle tags filter
      // Handle tags filter
      if (tags !== null && tags.length > 0) {
        const tagArray = tags.split(",");
        const tagArrayString = tagArray.map((tag) => `'${tag}'`).join(",");

        conditions.push(
          sql`${experience.tags} ?| ARRAY[${sql.raw(tagArrayString)}]`
        );
      }
      if (locations !== null && locations.length > 0) {
        const locationArray = locations.split(",");
        const locationArrayString = locationArray
          .map((location) => `'${location.toLowerCase()}'`)
          .join(",");

        // Add this condition to filter by country in the location object
        conditions.push(
          sql`LOWER(${experience.location}->>'country') IN (${sql.raw(
            locationArrayString
          )})`
        );
      }

      // Handle search query for title and description
      if (searchQuery !== null && searchQuery.length > 0) {
        conditions.push(
          or(
            ilike(experience.title, `%${searchQuery}%`),
            ilike(experience.description, `%${searchQuery}%`)
          )
        );
      }

      return conditions;
    };

    // Get all filter conditions
    const filterConditions = buildFilterConditions();

    // Determine sort direction (we remove the check "if (sortBy in experience)")
    const sortDirection = sortOrder.toLowerCase() === "asc" ? asc : desc;

    // Base query (without filters)

    const validSortColumns: Record<string, any> = {
      id: experience.id,
      title: experience.title,
      description: experience.description,
      minPrice: experience.minPrice,
      maxPrice: experience.maxPrice,
      duration: experience.duration,
      createdAt: experience.createdAt,
      averageRating: experience.averageRating,
      // Add any other sortable columns here
    };

    const executeQuery = async () => {
      const query = db
        .select({
          experience: experience,
          agent: { agentId: agent.id },
          user: { name: user.name, avatar: user.image },
        })
        .from(experience)
        .innerJoin(agent, eq(agent.id, experience.agentID))
        .innerJoin(user, eq(user.id, agent.userID))
        .where(
          filterConditions.length > 0 ? and(...filterConditions) : undefined
        )
        .limit(limit)
        .offset(offset)
        .orderBy(
          validSortColumns[sortBy]
            ? sortDirection(validSortColumns[sortBy])
            : sortDirection(experience.createdAt)
        );

      return await query.execute();
    };

    // Build and execute the count query with the same filtersF
    const executeCountQuery = async () => {
      let countQuery = await db
        .select({ count: sql`count(*)` })
        .from(experience)
        .innerJoin(agent, eq(agent.id, experience.agentID))
        .innerJoin(user, eq(user.id, agent.userID))
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
    const experiences = results.map(
      ({ experience, user: userData, agent: agentData }) => ({
        id: experience.id,
        title: experience.title,
        description: experience.description,
        duration: experience.duration,
        isAvailable: experience.isAvailable,
        experienceImage: experience.experienceImage, // Adjust if needed
        tier: experience.tier,
        tags: experience.tags,
        averageRating: experience.averageRating || 0,
        agent: {
          id: agentData.agentId,
          name: userData.name,
          avatar: userData.avatar,
        },
      })
    );

    return NextResponse.json(
      {
        experiences,
        pagination: {
          total,
          limit,
          offset,
          pages: Math.ceil(total / limit),
        },
        filters: {
          isAvailable: isAvailable !== null ? isAvailable === "true" : null,
          price: { min: minPrice, max: maxPrice },
          duration: { min: minDuration, max: maxDuration },
          tags: tags ? tags.split(",") : null,
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
    console.error("Error in experiences API:", error);
    return NextResponse.json(
      { message: "Error fetching experiences!" },
      { status: 500 }
    );
  }
}

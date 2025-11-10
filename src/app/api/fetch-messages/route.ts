import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { eq, and, or, desc } from "drizzle-orm";
import { messages } from "../../../../auth-schema";

export async function GET(request: NextRequest) {
  const userID = request.headers.get("x-user-id");
  
  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const recipientID = searchParams.get("recipientID");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  if (!recipientID) {
    return NextResponse.json(
      { message: "Recipient ID is required" },
      { status: 400 }
    );
  }

  try {
    const offset = (page - 1) * limit;
   
    // Get total count first
    const totalMessages = await db
      .select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderID, userID),
            eq(messages.recipientID, recipientID)
          ),
          and(
            eq(messages.senderID, recipientID),
            eq(messages.recipientID, userID)
          )
        )
      );

    const totalCount = totalMessages.length;
    
    // Fetch messages in DESC order (newest first)
    // Page 1 gets the most recent messages
    const fetchedMessages = await db
      .select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderID, userID),
            eq(messages.recipientID, recipientID)
          ),
          and(
            eq(messages.senderID, recipientID),
            eq(messages.recipientID, userID)
          )
        )
      )
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    const hasMore = offset + fetchedMessages.length < totalCount;

    return NextResponse.json({
      messages: fetchedMessages,
      hasMore,
      page,
      totalPages: Math.ceil(totalCount / limit),
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Error fetching messages" },
      { status: 500 }
    );
  }
}

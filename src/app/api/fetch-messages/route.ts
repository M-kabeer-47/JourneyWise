import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/server/db";
import { eq, and, or } from "drizzle-orm";
import { messages } from "../../../../auth-schema";
// Import your messages table schema here
// import { messages } from "@/../auth-schema";

export async function GET(request: NextRequest) {
  const userID = request.headers.get("x-user-id");
  
  if (!userID) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const recipientID = searchParams.get("recipientID");

  if (!recipientID) {
    return NextResponse.json(
      { message: "Recipient ID is required" },
      { status: 400 }
    );
  }

  try {
   
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
      .orderBy(messages.createdAt);

    // Temporary mock data until you set up your messages table
   

    return NextResponse.json(fetchedMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Error fetching messages" },
      { status: 500 }
    );
  }
}

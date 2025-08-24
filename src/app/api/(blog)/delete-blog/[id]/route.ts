import db from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { blog } from "@/../../auth-schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    console.log("Blog ID:", id);
    if (!id) return new Response("Missing id", { status: 400 });
    try {
        await db.delete(blog).where(eq(blog.id, id));
        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
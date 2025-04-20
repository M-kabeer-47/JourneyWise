import { NextRequest } from "next/server";
import { blog } from "@/../auth-schema"
import db from "@/lib/server/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest){
    const {blocks,content,skeleton,title} = await request.json();
    console.log(blocks,content,skeleton);
    try{
        await db.insert(blog).values({
            title: title,
            content: content,
            blocks: blocks,
            skeleton: skeleton,
            authorId:  "4Tlkb3LOqayKnRDTGayGXHWC6qsePSW7",
            createdAt: new Date(),
            updatedAt: new Date() 

        });
        return new Response("Blog inserted successfully", { status: 200 });
    } catch (error) {
        console.error("Error inserting blog:", error);
        return new Response("Error inserting blog", { status: 500 });
    }


    

}
export async function GET(request: NextRequest){
    


    try{
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return new Response("Missing blog ID", { status: 400 });
        }
        const blogData = await db.select().from(blog).where(eq(blog.id, id));
        if (blogData.length === 0) {
            return new Response("Blog not found", { status: 404 });
        }
        console.log(blogData);
        return new Response(JSON.stringify(blogData[0]), { headers: { 'Content-Type': 'application/json' }, status: 200 });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return new Response("Error fetching blog", { status: 500 });
    }
}
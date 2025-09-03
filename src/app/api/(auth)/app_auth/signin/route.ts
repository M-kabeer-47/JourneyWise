import { auth } from "@/lib/auth/auth"; // path to your Better Auth server instance
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    try{
            const response = await auth.api.signInEmail({
            body: {
                email,
                password
            },
            asResponse: true
            
        });
        return NextResponse.json({message: "Sign-in successful"}, { status: 200 });

    } catch (error) {
        console.error("Sign-in error:", error);
        return NextResponse.json({message: "Sign-in failed", data: error}, { status: 401 });
    }
    

     
}

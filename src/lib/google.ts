import { createAuthClient } from "better-auth/client"
const client = createAuthClient()
 
export const signIn = async () => {
    const data = await client.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/dashboard"
        
    })  
}
import { authClient } from "@/lib/auth/authClient";
export default async function fetchUserFromClient(){
    const {data:session,error} = await authClient.getSession()
    console.log("session",session);
    if(error){
        return "Failed to fetch"
    }
    else if(session){
        return session.user
    }
    return null;
}
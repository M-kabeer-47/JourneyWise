import { authClient } from "@/lib/auth/authClient";
export default async function fetchUserFromClient(){
    const {data:session,error} = await authClient.getSession()
    console.log("Session: "+session && JSON.stringify(session.user));
    if(error){
        return "Failed to fetch"
    }
    else if(session){
        return session.user
    }
    return null;
}

import axios from "axios";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "dotenv/config";
export default async function Dashboard() {
  console.log("BACKEND: "+process.env.NEXT_PUBLIC_BACKEND_URL);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in"); // This stops further execution
  }
    console.log("Phone: "+session.user.phoneNumber);
    
    if (session.user.phoneNumber === null) {
      redirect("/complete-profile"); 
    }
    
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

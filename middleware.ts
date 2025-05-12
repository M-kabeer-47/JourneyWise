import {NextRequest, NextResponse} from 'next/server'
import {authClient} from '@/lib/auth/authClient'


export default async function middleware(req:NextRequest,res:NextResponse){
    
    let session = await authClient.getSession()
    if(!session){
    return NextResponse.json({message:"Unauthorized"},{status:401})
    }
}




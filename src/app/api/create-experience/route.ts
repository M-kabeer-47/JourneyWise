import { NextRequest, NextResponse } from "next/server"
import db  from "@/lib/server/db"
import { gig } from "@/../auth-schema"
export async function POST(req: Request) {
    try{    
    const {data} = await req.json()
    console.log(data)
    let gigData = {
        gigImage: data.gigImage,
        tier: {
            tierInfo: data.tiers,
            currency: data.currency
        },
        gigImages: data.images,
        title: data.title,
        description: data.description,
        location: {
            country: data.country,
            countryCode: data.countryCode,
            city: data.city
        },
        duration: data.duration,
        includedServices: data.includedServices,
        excludedServices: data.excludedServices,
        itineraryDetails: data.destinations,
        agentId: data.agentId,
        tags: data.tags,
        category: data.category,
        isAvailable: data.availability==="available" ? true : false,
        createdAt: new Date(),
        reviews: [],
        averageRating: 0,
        requirements: data.requirements
    }
    await db.insert(gig).values(gigData)



    return NextResponse.json({message: "Experience created successfully!"},{status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "Experience creation failed!"}, {status: 500})
    }

}


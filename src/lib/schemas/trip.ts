import * as z from "zod"
export const tripSchema = z.object({
    waypoints: z.array(z.object({
    id: z.string(),
    name: z.string().min(1,"Name is required"),
    description: z.string().min(1,"Description is required").min(10,"Description must be atleast 10 characters"),
    type: z.enum(['start','end','stop','attraction']),
    hotels: z.array(z.object({
        id: z.string(),
        name: z.string().min(1,"Name is required"),
        detailsLink: z.string().optional(),
        locationLink: z.string().optional()
    })).optional(),
    imageUrl: z.string().optional()
    }))
    
})

export type tripData = z.infer<typeof tripSchema>





export type WaypointType = "attraction" | "stop" | "start" | "end"

export interface Hotel {
  id?: string
  name: string
  detailsLink?: string
  locationLink?: string
}

export interface Waypoint {
  id: string
  name: string
  type: WaypointType
  description: string
  imageUrl?: string  
  hotels?: Hotel[]
}



export interface Hotel {
  id: string;
  name: string;
  detailsLink: string;
  locationLink: string;
}
export interface Trip {
  id: string;
  userID: string;
  waypoints: Waypoint[];
  estimatedBudget: number;
  numOfPeople: number;
  estimatedDistance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  country: string;
  user?: {
    id: string;
    name: string;
    image?: string;
  };
  isSaved: boolean;
  thumbnailUrl?: string;
}

export interface Waypoint {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  hotels?: Hotel[];
}

export interface TripFilters {
  minBudget: number;
  maxBudget: number;
  minGroupSize: number;
  maxGroupSize: number;
  minDistance: number;
  maxDistance: number;
  countries: string[];
 
}

export interface BudgetRange {
  label: string;
  min: number;
  max: number;
}

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
  user?: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface Waypoint {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  order: number;
  description?: string;
}

export interface TripFilters {
  minBudget: number;
  maxBudget: number;
  minGroupSize: number;
  maxGroupSize: number;
  minDistance: number;
  maxDistance: number;
  currencies: string[];
  waypoints: string[];
}

export interface BudgetRange {
  label: string;
  min: number;
  max: number;
}

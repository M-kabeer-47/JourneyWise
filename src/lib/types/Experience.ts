export interface agent {
  id: string;
  name: string;
  avatar: string;
  agentID: string;
  userID: string;
}
export interface tier {
  name: string;
  price: number;
  members: number;
  description: string;
}
export interface Activity {
  id: string;
  name: string;
  time?: string;
  spot?: string;
}
export interface ItineraryDay {
  id: string;
  day: number;
  name: string;
  description: string;
  image: string;
  activities: Activity[];
}
export interface Experience {
  id: string;
  title: string;
  description: string;
  experienceImage: string;
  experienceImages: string[];
  averageRating: number;
  isAvailable: boolean;
  duration: number;
  tags?: string[];
  location: {
    city: string;
    country: string;
    code?: string;
  };
  category: string;
  minPrice: number;
  maxPrice: number;
  itineraryDetails: ItineraryDay[];

  requirements: string[];
  tiers: {
    currency: string;
    tiers: tier[];
  };
  agent?: {
    id: string;
    name: string;
    avatar: string;
  };
  includedServices: string[];
  excludedServices: string[];
}

export interface ExperienceResponse {
  experience: Experience;
  agent: agent;
}

export type Filters = {
  isAvailable: boolean;
  minPrice: number;
  maxPrice: number;
  minDuration: number;
  maxDuration: number;
  tags: string[];
  locations: string[];
};

export interface Review {
  id: string;
  experienceTitle: string;
  userName: string;
  userImage: string;
  comment: string;
  images?: string[];
  rating: number;
  createdAt: string;
  experienceId: string;
}

export interface agent {
  id: string;
  name: string;
  avatar: string;
  agentID: string;
  userID: string;
}
export interface tierInfo {
  name: string;
  price: number;
  members: number;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  experienceImage: string;
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

  tier: {
    currency: string;
    tierInfo: tierInfo[];
  };
  agent?: {
    id: string;
    name: string;
    avatar: string;
  };
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

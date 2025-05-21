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
    code: string;
  };
  
  tier: {
    currency: string;
    tierInfo: tierInfo[];
  };
  agent?:{
    id: string;
    name: string;
    avatar: string;
  }

}

export interface ExperienceResponse {
  experience: Experience;
  agent: agent
}

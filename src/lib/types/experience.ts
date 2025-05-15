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
  agent: { avatar: string | undefined; name: string; } | undefined;
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
  
  tier: tierInfo[];
}

export interface ExperienceResponse {
  experience: Experience;
  agent: agent
}

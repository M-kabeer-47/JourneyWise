export interface Experience {
  id: string;
  title: string;
  description: string;
  gigImage: string;
  averageRating: number;
  duration: number;
  tags?: string[];
  agent: {
    name: string;
    avatar: string;
  }
  tier: {
    currency: string;
    tierInfo: {
      name: string;
      price: number;
      members: number;
      description: string;
    }[];
  };
}

export interface ExperienceResponse {
  experience : Experience;
  agent: {
    agentID: any;
    name: string;
    avatar: string;
    agentId: string;
    userId: string;
  }
}
   
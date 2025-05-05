export interface Experience {
  id: string;
  title: string;
  description: string;
  gigImage: string;
  averageRating: number;
  tags?: string[];
  agent: {
    name: string;
    avatar: string;
  }
  tier?: {
    tierInfo?: {
      price?: number;
      members?: number;
      description?: string;
    }[];
  };
}
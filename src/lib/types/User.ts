export interface Agent {
  id: string;
  agencyName: string;
  verificationStatus: boolean;
  socialMediaHandles: Record<string, string>;
}
export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  twoFactorEnabled?: boolean | null;
  banned?: boolean | null;
  role?: string | null;
  banReason?: string | null;
  description?: string | null;
  country: string;
  bannerImage?: string | null;
};

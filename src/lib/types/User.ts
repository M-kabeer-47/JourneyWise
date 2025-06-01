export interface Agent {
  id: string;
  agencyName: string;
  verificationStatus: boolean;
  socialMediaHandles: Record<string, string>;
}
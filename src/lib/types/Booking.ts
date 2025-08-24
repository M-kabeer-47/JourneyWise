export type Booking = {
  experience: {
    title: string;
    experienceImage: string;
    location: {
      city: string;
      country: string;
    };
    description: string;
    category: any;
    tags: string[];
    includedServices: string[];
    excludedServices: string[];
    requirements: string[];
    duration: number;
    averageRating: number;
  };
  agent: {
    agencyName: string;
    image: string;
  };
  id: string;
  status: 'pending' | 'approved' | 'confirmed' | 'cancelled' | 'completed' | 'modificationRequested';
  startDate: string;
  endDate: string;
  tier: {
    name: string;
    description: string;
    members: number;
    price: number;
    currency: string;
  };
  totalPrice: number;
  isCustomRequest: boolean;
  notes?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  modifiedTotalPrice: number;
  modifiedStartDate: string;
  noOfPackages: number;
  payment?: {
    amount: number;
    transactionDateTime: string;
  };
};
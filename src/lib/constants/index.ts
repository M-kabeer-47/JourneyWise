export interface Agent {
  id: string;
  agencyName: string;
  verificationStatus: boolean;
  socialMediaHandles: Record<string, string>;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  experienceImage: string;
  location: {
    city: string;
    country: string;
  };
  duration: number;
  minPrice: number;
  maxPrice: number;
  averageRating: number;
  isAvailable: boolean;
  category: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  experienceTitle: string;
  experienceId: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'confirmed' | 'cancelled' | 'completed';
  tier: {
    name: string;
    price: number;
  };
}

export interface Review {
  id: string;
  experienceTitle: string;
  userName: string;
  userImage: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'booking' | 'message' | 'reminder' | 'alert';
  isRead: boolean;
  createdAt: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number;
  icon: string;
}
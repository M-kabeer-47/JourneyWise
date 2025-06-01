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
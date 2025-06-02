import { Experience, Review } from "@/lib/types/Experience";
import { Metric, Notification } from "@/lib/types/Notification";
import { Agent } from "@/lib/types/User";
import { Booking } from "@/lib/types/Booking";

export const agent: Agent = {
  id: "1",
  agencyName: "Wanderlust Adventures",
  verificationStatus: true,
  socialMediaHandles: {
    instagram: "@wanderlust_adventures",
    facebook: "WanderlustAdventures",
    twitter: "@wanderlust_adv",
  },
};

export const metrics: Metric[] = [
  {
    label: "Total Bookings",
    value: 124,
    change: 12,
    icon: "Calendar",
  },
  {
    label: "Revenue",
    value: "$12,546",
    change: 8.2,
    icon: "CreditCard",
  },
  {
    label: "Avg. Rating",
    value: 4.8,
    change: 0.3,
    icon: "Star",
  },
  {
    label: "Active Experiences",
    value: 15,
    change: 2,
    icon: "MapPin",
  },
];

export const recentBookings: Booking[] = [
  {
    id: "b1",
    customerName: "Emma Thompson",
    customerEmail: "emma.t@example.com",
    experienceTitle: "Kyoto Cultural Tour",
    experienceId: "e1",
    bookingDate: "2025-05-15",
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    status: "confirmed",
    tier: {
      name: "Premium",
      price: 1200,
    },
  },
  {
    id: "b2",
    customerName: "Michael Chen",
    customerEmail: "michael.c@example.com",
    experienceTitle: "Bali Retreat",
    experienceId: "e2",
    bookingDate: "2025-05-14",
    startDate: "2025-07-05",
    endDate: "2025-07-12",
    status: "pending",
    tier: {
      name: "Standard",
      price: 850,
    },
  },
  {
    id: "b3",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    experienceTitle: "Barcelona Food Tour",
    experienceId: "e3",
    bookingDate: "2025-05-12",
    startDate: "2025-05-28",
    endDate: "2025-05-30",
    status: "approved",
    tier: {
      name: "Deluxe",
      price: 450,
    },
  },
  {
    id: "b4",
    customerName: "David Wilson",
    customerEmail: "david.w@example.com",
    experienceTitle: "Tokyo Night Tour",
    experienceId: "e4",
    bookingDate: "2025-05-10",
    startDate: "2025-06-15",
    endDate: "2025-06-16",
    status: "completed",
    tier: {
      name: "Standard",
      price: 180,
    },
  },
];

export const experiences: Experience[] = [
  {
    id: "e1",
    title: "Kyoto Cultural Tour",
    description:
      "Explore the ancient temples and traditional tea houses of Kyoto.",
    experienceImage:
      "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: {
      city: "Kyoto",
      country: "Japan",
    },
    duration: 5,
    minPrice: 800,
    maxPrice: 1500,
    averageRating: 4.9,
    isAvailable: true,
    category: "Cultural",
    tier: {
      currency: "",
      tierInfo: [
        {
          price: 800,
          name: "Standard",
          members: 0,
          description: "",
        },
        {
          price: 1200,
          name: "Premium",
          members: 0,
          description: "",
        },
        {
          price: 1500,
          name: "Deluxe",
          members: 0,
          description: "",
        },
      ],
    },
  },
  {
    id: "e2",
    title: "Bali Retreat",
    description:
      "Relax and rejuvenate in the peaceful settings of Bali with yoga and meditation.",
    experienceImage:
      "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: {
      city: "Ubud",
      country: "Indonesia",
    },
    duration: 7,
    minPrice: 600,
    maxPrice: 1200,
    averageRating: 4.7,
    isAvailable: true,
    category: "Wellness",
    tier: {
      currency: "",
      tierInfo: [
        { price: 600, name: "Standard", members: 0, description: "" },
        {
          price: 850,
          name: "Premium",
          members: 0,
          description: "",
        },
      ],
    },
  },
  {
    id: "e3",
    title: "Barcelona Food Tour",
    description:
      "Taste the authentic flavors of Catalonia with our expert food guides.",
    experienceImage:
      "https://images.pexels.com/photos/3622643/pexels-photo-3622643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: {
      city: "Barcelona",
      country: "Spain",
    },
    duration: 2,
    minPrice: 300,
    maxPrice: 600,
    averageRating: 4.8,
    isAvailable: true,
    category: "Food & Drink",
    tier: {
      currency: "",
      tierInfo: [
        { price: 300, name: "Standard", members: 0, description: "" },
        // You can add more tiers if needed
        { price: 450, name: "Premium", members: 0, description: "" },
      ],
    },
  },
  {
    id: "e4",
    title: "Tokyo Night Tour",
    description: "Experience the vibrant nightlife and neon lights of Tokyo.",
    experienceImage:
      "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: {
      city: "Tokyo",
      country: "Japan",
    },
    duration: 1,
    minPrice: 120,
    maxPrice: 250,
    averageRating: 4.6,
    isAvailable: true,
    category: "Nightlife",
    tier: {
      currency: "",
      tierInfo: [{ price: 120, name: "Standard", members: 0, description: "" }],
    },
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    experienceTitle: "Kyoto Cultural Tour",
    userName: "Emma Thompson",
    userImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    comment:
      "This tour exceeded all my expectations! Our guide was incredibly knowledgeable about Kyoto's history.",
    rating: 5,
    createdAt: "2025-05-01",
    experienceId: "",
  },
  {
    id: "r2",
    experienceTitle: "Bali Retreat",
    userName: "Michael Chen",
    userImage:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    comment:
      "The retreat was exactly what I needed. Beautiful location and great instructors.",
    rating: 4.5,
    createdAt: "2025-04-28",
    experienceId: "",
  },
  {
    id: "r3",
    experienceTitle: "Barcelona Food Tour",
    userName: "Sarah Johnson",
    userImage:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    comment:
      "Amazing food and fantastic guide! I discovered so many hidden gems in Barcelona.",
    rating: 5,
    createdAt: "2025-04-25",
    experienceId: "",
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    message: "New booking request from Emma Thompson",
    type: "booking",
    isRead: false,
    createdAt: "2025-05-15T10:30:00",
  },
  {
    id: "n2",
    message: "Michael Chen left a new review",
    type: "message",
    isRead: false,
    createdAt: "2025-05-14T15:45:00",
  },
  {
    id: "n3",
    message: "Reminder: Prepare for Barcelona Food Tour starting in 3 days",
    type: "reminder",
    isRead: true,
    createdAt: "2025-05-12T09:15:00",
  },
  {
    id: "n4",
    message: "Your verification status has been approved",
    type: "alert",
    isRead: true,
    createdAt: "2025-05-10T14:20:00",
  },
];

export const mockUser = {
  id: "user123",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  image: null,
  isEmailVerified: true,
  country: "United States",
  banned: false,
  banReason: null,
  banExpires: null,
  createdAt: "2023-06-15T10:30:00Z",
  updatedAt: "2024-01-15T14:22:00Z",
};

export const mockTrips = [
  {
    id: "trip1",
    userID: "user123",
    startPoint: "New York",
    endPoint: "Los Angeles",
    estimatedBudget: 2500,
    numOfPeople: 2,
    estimatedDistance: 4500,
    currency: "USD",
    waypoints: JSON.stringify([
      {
        id: "w1",
        name: "Grand Canyon",
        imageUrl:
          "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800",
      },
      {
        id: "w2",
        name: "Las Vegas",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      },
    ]),
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "trip2",
    userID: "user123",
    startPoint: "San Francisco",
    endPoint: "Seattle",
    estimatedBudget: 1800,
    numOfPeople: 4,
    estimatedDistance: 1300,
    currency: "USD",
    waypoints: JSON.stringify([
      {
        id: "w3",
        name: "Portland",
        imageUrl:
          "https://images.unsplash.com/photo-1512386233331-f023884a92e8?w=800",
      },
    ]),
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-05T16:45:00Z",
  },
];

export const mockBlogs = [
  {
    blog: {
      id: "blog1",
      title: "Hidden Gems of the Pacific Coast Highway",
      content: "Discover breathtaking coastal views and secret spots...",
      isPublished: true,
      category: "Travel Guide",
      coverUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      commentsCount: 24,
      createdAt: "2024-01-08T11:20:00Z",
      updatedAt: "2024-01-12T09:30:00Z",
    },
    author: {
      id: "user123",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      image: null,
      isEmailVerified: true,
      country: "United States",
      banned: false,
      banReason: null,
      banExpires: null,
      createdAt: "2023-06-15T10:30:00Z",
      updatedAt: "2024-01-15T14:22:00Z",
    },
  },

  // do same for below

  {
    blog: {
      id: "blog2",
      title: "Budget Travel Tips for Solo Adventurers",
      content: "Learn how to explore the world without breaking the bank...",
      isPublished: false,
      authorID: "user123",
      category: "Tips & Tricks",
      coverUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
      commentsCount: 0,
      createdAt: "2024-01-14T14:15:00Z",
      updatedAt: "2024-01-14T14:15:00Z",
    },
    author: {
      id: "user123",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      image: null,
      isEmailVerified: true,
      country: "United States",
      banned: false,
      banReason: null,
      banExpires: null,
      createdAt: "2023-06-15T10:30:00Z",
      updatedAt: "2024-01-15T14:22:00Z",
    },
  },
];

export const mockSavedItems = [
  {
    id: "saved1",
    entityType: "experience" as const,
    entityID: "exp1",
    userID: "user123",
    createdAt: "2024-01-12T10:20:00Z",
    experience: {
      id: "exp1",
      title: "Sunset Photography Workshop in Santorini",
      imageUrl:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      location: "Santorini, Greece",
      price: 180,
      currency: "USD",
    },
  },
  {
    id: "saved2",
    entityType: "trip" as const,
    entityID: "trip3",
    userID: "user123",
    createdAt: "2024-01-10T15:30:00Z",
    trip: {
      id: "trip3",
      startPoint: "Paris",
      endPoint: "Rome",
      estimatedBudget: 3200,
      estimatedDistance: 1400,
    },
  },
];

export const mockBookings = [
  {
    id: "booking1",
    experienceID: "exp1",
    agentID: "agent1",
    customerID: "user123",
    bookingDate: "2024-01-15T09:00:00Z",
    status: "pending" as const,
    startDate: "2024-02-20T10:00:00Z",
    endDate: "2024-02-22T18:00:00Z",
    tier: {
      name: "Premium Package",
      inclusions: ["Photography gear", "Professional guide"],
      members: 2,
    },

    totalPrice: 540,
    paymentID: "pay1",
    isCustomRequest: false,
    noOfPackages: 2,
    notes: "Looking forward to this experience!",
    experience: {
      id: "fc524891-292a-4b64-a6a3-e82be4530dab",
      experienceImage:
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333295/a3477445cd7fb1b1f8aa4aed4c59586b.jpg",
      tiers: [
        {
          name: "Solo",
          price: 13000,
          members: 1,
          description: "Best solo package",
        },
        {
          name: "Premium",
          price: 32000,
          members: 3,
          description: "Best package for3 people",
        },
        {
          name: "Couple",
          price: 25000,
          members: 2,
          description: "Budget friendly package for couples",
        },
      ],
      experienceImages: [
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333298/035e23d694bbe30bd48f1b293d3a6fa4.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333300/6ffdf33d4a580782a1c2bde92118da92.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333302/f03ded945875772c83eccdd916e74cd4.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333304/253fac26c3677533be286c6b52af49e1.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333309/e14d0d3e7e6becee94e3f0c6cbcf842c.jpg",
      ],
      title: "Skardu",
      description: "This is an amazing trip to Skardu",
      location: { city: "Skardu", country: "Pakistan" },
      duration: 2,
      includedServices: [
        "Hotel",
        "Breakfast & Lunch",
        "Transport",
        "Photography",
        "Toll Taxes",
      ],
      excludedServices: ["First Aid", "Jeep", "Dinner", "Extra activities"],
      itineraryDetails: [
        {
          id: "mzjykhlbe",
          day: 1,
          name: "Islamabd",
          activities: [
            {
              id: "r7l3b89l7",
              name: "Departure",
              spot: "Islamabad",
              time: "07:30 AM",
            },
            {
              id: "i2e4eoj2k",
              name: "Breakfast ",
              spot: "Murree",
              time: "08:30 AM",
            },
            {
              id: "ebo8bp9wq",
              name: "Reach Naran",
              spot: "Naran",
              time: "12:00 PM",
            },
            { id: "x6flcaubv", name: "Lunch", spot: "Naran", time: "01:00 PM" },
            {
              id: "io2gtctps",
              name: "Departure for Skardu",
              spot: "Naran",
              time: "02:00 PM",
            },
            {
              id: "e5mdkuab8",
              name: "Reach Skardu ",
              spot: "Skardu",
              time: "06:00 PM",
            },
          ],
        },
        {
          id: "a9ftgbv90",
          day: 2,
          name: "Deosai",
          activities: [
            {
              id: "t82dhmkx7",
              name: "Breakfast",
              spot: "Skardu, Hotel",
              time: "07:00 AM",
            },
            {
              id: "wvmosyyc1",
              name: "Departure for Deosai ",
              spot: "Skardu, Hotel",
              time: "08:00 AM",
            },
            {
              id: "bu572hqjh",
              name: "Reach Deosai",
              spot: "Deosai",
              time: "11:00 AM",
            },
            {
              id: "gkepblobn",
              name: "Departure for Islamabad",
              spot: "Deosai",
              time: "05:00 PM",
            },
            {
              id: "kxj6ynya0",
              name: "Reach Islamabad",
              spot: "Islamabad",
              time: "02:00 AM",
            },
          ],
        },
      ],
      agentID: "4d19d13d-4c4b-4462-98a1-ab88c19aeb32",
      category: "Relaxation",
      requirements: [
        "National Identity Card",
        "Passport",
        "Visa",
        "Driving License",
      ],
      tags: ["Nature", "Family-friendly", "Luxury", "Mountain"],
      averageRating: 3.5,
      createdAt: "2025-08-04 18:48:36.655",
      isAvailable: true,
      minPrice: 13000,
      currency: "\nPKR\n",
    },

    agent: {
      id: "agent1",
      agencyName: "Aegean Adventures",
      email: "contact@aegeanadventures.com",
    },
    payment: {
      id: "pay1",
      status: "completed" as const,
      paymentType: "card" as const,
      amount: 540,
    },
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "+1234567890",
  },
  {
    id: "booking2",
    experienceID: "exp1",
    agentID: "agent1",
    customerID: "user123",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    customerPhone: "+0987654321",
    bookingDate: "2024-01-15T09:00:00Z",
    status: "modificationRequested" as const,
    startDate: "2024-02-20T10:00:00Z",
    modifiedStartDate: "2024-02-20T10:00:00Z",
    endDate: "2024-02-22T18:00:00Z",
    tier: {
      name: "Premium Package",
      inclusions: ["Photography gear", "Professional guide"],
      members: 4,
    },

    totalPrice: 540,
    modifiedTotalPrice: 600,
    paymentID: "pay1",
    isCustomRequest: false,
    noOfPackages: 2,
    notes: "Looking forward to this experience!",
    experience: {
      id: "fc524891-292a-4b64-a6a3-e82be4530dab",
      experienceImage:
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333295/a3477445cd7fb1b1f8aa4aed4c59586b.jpg",
      tiers: [
        {
          name: "Solo",
          price: 13000,
          members: 1,
          description: "Best solo package",
        },
        {
          name: "Premium",
          price: 32000,
          members: 3,
          description: "Best package for3 people",
        },
        {
          name: "Couple",
          price: 25000,
          members: 2,
          description: "Budget friendly package for couples",
        },
      ],
      experienceImages: [
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333298/035e23d694bbe30bd48f1b293d3a6fa4.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333300/6ffdf33d4a580782a1c2bde92118da92.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333302/f03ded945875772c83eccdd916e74cd4.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333304/253fac26c3677533be286c6b52af49e1.jpg",
        "https://res.cloudinary.com/e-commerce-muhammad-kabeer/image/upload/v1754333309/e14d0d3e7e6becee94e3f0c6cbcf842c.jpg",
      ],
      title: "Skardu",
      description: "This is an amazing trip to Skardu",
      location: { city: "Skardu", country: "Pakistan" },
      duration: 2,
      includedServices: [
        "Hotel",
        "Breakfast & Lunch",
        "Transport",
        "Photography",
        "Toll Taxes",
      ],
      excludedServices: ["First Aid", "Jeep", "Dinner", "Extra activities"],
      itineraryDetails: [
        {
          id: "mzjykhlbe",
          day: 1,
          name: "Islamabd",
          activities: [
            {
              id: "r7l3b89l7",
              name: "Departure",
              spot: "Islamabad",
              time: "07:30 AM",
            },
            {
              id: "i2e4eoj2k",
              name: "Breakfast ",
              spot: "Murree",
              time: "08:30 AM",
            },
            {
              id: "ebo8bp9wq",
              name: "Reach Naran",
              spot: "Naran",
              time: "12:00 PM",
            },
            { id: "x6flcaubv", name: "Lunch", spot: "Naran", time: "01:00 PM" },
            {
              id: "io2gtctps",
              name: "Departure for Skardu",
              spot: "Naran",
              time: "02:00 PM",
            },
            {
              id: "e5mdkuab8",
              name: "Reach Skardu ",
              spot: "Skardu",
              time: "06:00 PM",
            },
          ],
        },
        {
          id: "a9ftgbv90",
          day: 2,
          name: "Deosai",
          activities: [
            {
              id: "t82dhmkx7",
              name: "Breakfast",
              spot: "Skardu, Hotel",
              time: "07:00 AM",
            },
            {
              id: "wvmosyyc1",
              name: "Departure for Deosai ",
              spot: "Skardu, Hotel",
              time: "08:00 AM",
            },
            {
              id: "bu572hqjh",
              name: "Reach Deosai",
              spot: "Deosai",
              time: "11:00 AM",
            },
            {
              id: "gkepblobn",
              name: "Departure for Islamabad",
              spot: "Deosai",
              time: "05:00 PM",
            },
            {
              id: "kxj6ynya0",
              name: "Reach Islamabad",
              spot: "Islamabad",
              time: "02:00 AM",
            },
          ],
        },
      ],
      agentID: "4d19d13d-4c4b-4462-98a1-ab88c19aeb32",
      category: "Relaxation",
      requirements: ["National Identity Card"],
      tags: ["Nature", "Family-friendly", "Luxury", "Mountain"],
      averageRating: 3.5,
      createdAt: "2025-08-04 18:48:36.655",
      isAvailable: true,
      minPrice: 13000,
      currency: "\nPKR\n",
    },

    agent: {
      id: "agent1",
      agencyName: "Aegean Adventures",
      email: "contact@aegeanadventures.com",
    },
    payment: {
      id: "pay1",
      status: "completed" as const,
      paymentType: "card" as const,
      amount: 540,
    },
  },
];

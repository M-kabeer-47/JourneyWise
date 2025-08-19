export const mockUser = {
  id: "user123",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  image: "https://images.unsplash.com/photo-1494790108755-2616b612b524?w=400&h=400&fit=crop&crop=face",
  country: "United States",
  banned: false,
  banReason: null,
  banExpires: null,
  createdAt: "2023-06-15T10:30:00Z",
  updatedAt: "2024-01-15T14:22:00Z"
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
      { id: "w1", name: "Grand Canyon", imageUrl: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800" },
      { id: "w2", name: "Las Vegas", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" }
    ]),
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z"
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
      { id: "w3", name: "Portland", imageUrl: "https://images.unsplash.com/photo-1512386233331-f023884a92e8?w=800" }
    ]),
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-05T16:45:00Z"
  }
];

export const mockBlogs = [
  {
    id: "blog1",
    title: "Hidden Gems of the Pacific Coast Highway",
    content: "Discover breathtaking coastal views and secret spots...",
    isPublished: true,
    authorID: "user123",
    category: "Travel Guide",
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    commentsCount: 24,
    createdAt: "2024-01-08T11:20:00Z",
    updatedAt: "2024-01-12T09:30:00Z"
  },
  {
    id: "blog2",
    title: "Budget Travel Tips for Solo Adventurers",
    content: "Learn how to explore the world without breaking the bank...",
    isPublished: false,
    authorID: "user123", 
    category: "Tips & Tricks",
    coverUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    commentsCount: 0,
    createdAt: "2024-01-14T14:15:00Z",
    updatedAt: "2024-01-14T14:15:00Z"
  }
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
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      location: "Santorini, Greece",
      price: 180,
      currency: "USD"
    }
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
      estimatedDistance: 1400
    }
  }
];

export const mockBookings = [
  {
    id: "booking1",
    experienceID: "exp1",
    agentID: "agent1", 
    customerID: "user123",
    bookingDate: "2024-01-15T09:00:00Z",
    status: "confirmed" as const,
    startDate: "2024-02-20T10:00:00Z",
    endDate: "2024-02-22T18:00:00Z",
    tier: { name: "Premium Package", inclusions: ["Photography gear", "Professional guide"] },
    totalPrice: 540,
    paymentID: "pay1",
    isCustomRequest: false,
    noOfPackages: 1,
    notes: "Looking forward to this experience!",
    experience: {
      id: "exp1", 
      title: "Sunset Photography Workshop in Santorini",
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"
    },
    agent: {
      id: "agent1",
      agencyName: "Aegean Adventures",
      email: "contact@aegeanadventures.com"
    },
    payment: {
      id: "pay1",
      status: "completed" as const,
      paymentType: "card" as const,
      amount: 540
    }
  }
];
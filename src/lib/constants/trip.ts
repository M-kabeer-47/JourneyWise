import { Waypoint } from "@/lib/types/waypoint";

export const mockTrip = {
  id: "trip-001",
  userID: "user-123",
  estimatedBudget: 850,
  numPeople: 2,
  currency: "USD",
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",

  // Route between two main points
  startPoint: "Tokyo",
  endPoint: "Kyoto",
  routeDistance: "476 km",
  estimatedDuration: "3 hours by train",

  waypoints: [
    {
      id: "wp-start",
      name: "Tokyo Station",
      type: "start",
      description:
        "Begin your journey from the iconic Tokyo Station, the heart of Japan's rail network.",
    },
    {
      id: "wp-1",
      name: "Mount Fuji Viewpoint",
      type: "attraction",
      description:
        "A breathtaking stop to witness Japan's most iconic mountain. Perfect for photography and spiritual reflection.",
      imageUrl:
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "wp-2",
      name: "Hakone Hot Springs",
      type: "stop",
      description:
        "Relax and rejuvenate in traditional Japanese hot springs with stunning mountain views.",
      hotels: [
        {
          id: "hotel-1",
          name: "Hakone Kowakien Yunessun",
          detailsLink: "#",
          locationLink: "#",
        },
        {
          id: "hotel-2",
          name: "Gora Kadan",
          detailsLink: "#",
          locationLink: "#",
        },
      ],
    },
    {
      id: "wp-3",
      name: "Kamakura Great Buddha",
      type: "attraction",
      description:
        "Visit the famous bronze statue of Amida Buddha, one of Japan's most celebrated landmarks.",
      imageUrl:
        "https://images.unsplash.com/photo-1590559800719-6cb7aa9dbf5b?w=800&h=600&fit=crop&q=80",
    },
    {
      id: "wp-4",
      name: "Atami",
      type: "stop",
      description:
        "A charming coastal town known for its hot springs, plum blossoms, and ocean views.",
      hotels: [
        {
          id: "hotel-3",
          name: "Atami Korakuen Hotel",
          detailsLink: "#",
          locationLink: "#",
        },
      ],
    },
    {
      id: "wp-end",
      name: "Kyoto Station",
      type: "end",
      description:
        "Arrive in the ancient capital of Japan, ready to explore temples, gardens, and traditional culture.",
    },
  ] as Waypoint[],
};

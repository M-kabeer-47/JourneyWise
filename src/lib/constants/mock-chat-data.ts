// Mock data for chat functionality

export const currentUserId = "user-1";

export interface User {
  id: string;
  name: string;
  role: "traveler" | "agent" | "admin";
  initials: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  preview?: string;
  type: "image" | "file";
  size: number;
  file?: File;
  isUploading?: boolean;
  uploadProgress?: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "seen";
  replyTo?: string;
  attachments?: Attachment[];
  edited?: boolean;
  isUploading?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  typingStatus?: boolean;
}

// Mock users
export const users: Record<string, User> = {
  "user-1": {
    id: "user-1",
    name: "You",
    role: "traveler",
    initials: "YO",
    isOnline: true,
  },
  "user-2": {
    id: "user-2",
    name: "Maria Rodriguez",
    role: "agent",
    initials: "MR",
    avatar: "/images/agents/maria.jpg",
    isOnline: true,
  },
  "user-3": {
    id: "user-3",
    name: "David Chen",
    role: "agent",
    initials: "DC",
    avatar: "/images/agents/david.jpg",
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  "user-4": {
    id: "user-4",
    name: "Sarah Williams",
    role: "agent",
    initials: "SW",
    avatar: "/images/agents/sarah.jpg",
    isOnline: true,
  },
  "user-5": {
    id: "user-5",
    name: "Ahmed Hassan",
    role: "agent",
    initials: "AH",
    avatar: "/images/agents/ahmed.jpg",
    isOnline: false,
    lastSeen: new Date(Date.now() - 86400000), // 1 day ago
  },
};

// Mock conversations for the sidebar
export const conversations: Conversation[] = [
  {
    id: "conv-1",
    participantId: "user-2",
    lastMessage: "Perfect! I'll arrange the transportation for your group.",
    lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "conv-2",
    participantId: "user-3",
    lastMessage: "The Santorini sunset tour package includes...",
    lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "conv-3",
    participantId: "user-4",
    lastMessage: "I've sent you the updated itinerary for Paris!",
    lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "conv-4",
    participantId: "user-5",
    lastMessage: "Thank you for choosing our Dubai tour package!",
    lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
    unreadCount: 0,
    isOnline: false,
  },
];

// Mock messages for active conversation
export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    userId: "user-2",
    content: "Hi! Thanks for reaching out about our Barcelona adventure package. I'd be happy to help you plan your trip!",
    timestamp: new Date(Date.now() - 7200000),
    status: "seen",
  },
  {
    id: "msg-2",
    userId: "user-1",
    content: "Hi Maria! I'm planning a trip for 4 people from June 15-22. We're interested in the cultural and food experiences.",
    timestamp: new Date(Date.now() - 7000000),
    status: "seen",
  },
  {
    id: "msg-3",
    userId: "user-2",
    content: "Wonderful! Barcelona is perfect for that. Let me share some highlights of what we can include in your itinerary.",
    timestamp: new Date(Date.now() - 6800000),
    status: "seen",
    attachments: [
      {
        id: "att-1",
        name: "Barcelona_Itinerary_Draft.pdf",
        url: "/files/barcelona-itinerary.pdf",
        type: "file",
        size: 524288,
      },
    ],
  },
  {
    id: "msg-4",
    userId: "user-2",
    content: "Here are some photos from our previous tours. The Gothic Quarter tour is particularly popular!",
    timestamp: new Date(Date.now() - 6600000),
    status: "seen",
    attachments: [
      {
        id: "att-2",
        name: "gothic-quarter.jpg",
        url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
        type: "image",
        size: 1048576,
      },
      {
        id: "att-3",
        name: "sagrada-familia.jpg",
        url: "https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=800",
        type: "image",
        size: 1048576,
      },
    ],
  },
  {
    id: "msg-5",
    userId: "user-1",
    content: "This looks amazing! Can you tell me more about the food tours? We're all foodies 😊",
    timestamp: new Date(Date.now() - 6400000),
    status: "seen",
  },
  {
    id: "msg-6",
    userId: "user-2",
    content: "You'll love it! Our food tour includes:\n\n• Traditional tapas tasting in El Born\n• La Boqueria market experience\n• Wine tasting in a local bodega\n• Paella cooking class\n• Michelin-starred dining option",
    timestamp: new Date(Date.now() - 6200000),
    status: "seen",
  },
  {
    id: "msg-7",
    userId: "user-1",
    content: "That sounds perfect! What about accommodation? We'd prefer something central.",
    timestamp: new Date(Date.now() - 6000000),
    status: "seen",
  },
  {
    id: "msg-8",
    userId: "user-2",
    content: "I have the perfect options for you! Let me send you details of 3 boutique hotels in the Eixample district, all within walking distance of major attractions.",
    timestamp: new Date(Date.now() - 5800000),
    status: "seen",
    attachments: [
      {
        id: "att-4",
        name: "Hotel_Options_Barcelona.pdf",
        url: "/files/hotel-options.pdf",
        type: "file",
        size: 786432,
      },
    ],
  },
  {
    id: "msg-9",
    userId: "user-1",
    content: "Great! Also, we'd like to do a day trip to Montserrat. Is that included?",
    timestamp: new Date(Date.now() - 1200000),
    status: "seen",
  },
  {
    id: "msg-10",
    userId: "user-2",
    content: "Absolutely! The Montserrat day trip is one of our most popular add-ons. We can arrange:\n\n✓ Private transportation\n✓ Monastery guided tour\n✓ Wine tasting at a local vineyard\n✓ Scenic lunch with mountain views",
    timestamp: new Date(Date.now() - 900000),
    status: "seen",
  },
  {
    id: "msg-11",
    userId: "user-1",
    content: "Perfect! Can you send me a detailed quote for everything?",
    timestamp: new Date(Date.now() - 600000),
    status: "seen",
  },
  {
    id: "msg-12",
    userId: "user-2",
    content: "Of course! I'll prepare a comprehensive quote including all activities, accommodation, and transportation. Give me about 30 minutes to put together the best package for your group.",
    timestamp: new Date(Date.now() - 400000),
    status: "seen",
  },
  {
    id: "msg-13",
    userId: "user-1",
    content: "Sounds good! Also, do you arrange airport transfers?",
    timestamp: new Date(Date.now() - 350000),
    status: "seen",
  },
  {
    id: "msg-14",
    userId: "user-2",
    content: "Yes! Airport transfers are included in all our packages. We'll have a driver waiting for you at Barcelona-El Prat with a name sign. No extra charge! 🚗",
    timestamp: new Date(Date.now() - 320000),
    status: "seen",
  },
  {
    id: "msg-15",
    userId: "user-1",
    content: "Excellent! That's really helpful. Looking forward to the quote.",
    timestamp: new Date(Date.now() - 300000),
    status: "delivered",
  },
  {
    id: "msg-16",
    userId: "user-2",
    content: "Perfect! I'll arrange the transportation for your group and send everything over shortly. Just to confirm - 4 travelers, June 15-22, correct?",
    timestamp: new Date(Date.now() - 60000),
    status: "delivered",
  },
];

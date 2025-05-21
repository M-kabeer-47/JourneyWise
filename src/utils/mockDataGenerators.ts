// Mock data generation utilities
import { Experience } from "@/lib/types/experiences/Experience";


export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate mock data that matches our schema
export const generateMockExperiences = (count: number): Experience[] => {
  const categories = [
    'Adventure', 'Cultural', 'Food & Drink', 'Nature', 
    'Relaxation', 'Sightseeing', 'Sports', 'Urban'
  ];
  
  const locations = [
    { city: 'Hunza', country: 'Pakistan' },
    { city: 'Bali', country: 'Indonesia' },
    { city: 'Santorini', country: 'Greece' },
    { city: 'Kyoto', country: 'Japan' },
    { city: 'Paris', country: 'France' },
    { city: 'Barcelona', country: 'Spain' },
  ];
  
  const durations = [3, 5, 7, 10, 14, 21]; // in days
  const agentNames = ['Alex Johnson', 'Maria Garcia', 'David Kim', 'Sarah Ahmed', 'James Wilson', 'Priya Patel'];
  
  return Array(count).fill(0).map((_, i) => {
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    const basePrice = Math.floor(Math.random() * 900) + 100;
    const randomAgentName = agentNames[Math.floor(Math.random() * agentNames.length)];
    
    return {
      id: `exp-${i + 1}`,
      title: `${randomLocation.city} ${randomCat} Experience`,
      description: `An amazing ${randomCat} experience in ${randomLocation.city}, ${randomLocation.country}. 
        Enjoy this unforgettable journey through one of the most beautiful destinations in the world. 
        Our expert guides will show you hidden gems and local favorites.`,
      gigImage: `/images/experiences/${i % 5 + 1}.jpg`,
      averageRating: Math.floor(Math.random() * 20 + 30) / 10, // 3.0 to 5.0
      duration: randomDuration,
      tags: shuffleArray(["scenic", "historical", "family-friendly", "adventure", "romantic", "cultural"]).slice(0, 3),
      agent: {
        name: randomAgentName,
        avatar: `/images/avatars/avatar${Math.floor(Math.random() * 6) + 1}.jpg`
      },
      tier: {
        currency: ["USD", "PKR", "EUR", "JPY"][Math.floor(Math.random() * 4)],
        tierInfo: [
          {
            name: "Solo",
            price: basePrice,
            members: 1,
            description: "Perfect for solo travelers"
          },
          {
            name: "Couple",
            price: Math.floor(basePrice * 1.8),
            members: 2,
            description: "Great for couples"
          },
          {
            name: "Family",
            price: Math.floor(basePrice * 2.5),
            members: 4,
            description: "Family package"
          }
        ]
      }
    };
  });
};
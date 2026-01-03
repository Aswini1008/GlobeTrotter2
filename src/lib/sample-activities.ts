export type ActivityCategory = 'Sightseeing' | 'Food & Dining' | 'Adventure' | 'Culture' | 'Relaxation';
export type ActivityCost = 'Free' | '$' | '$$' | '$$$';
export type ActivityDuration = '< 1 hour' | '1-3 hours' | 'Half day' | 'Full day';
export type ActivityTime = 'Morning' | 'Afternoon' | 'Evening';

export type SearchableActivity = {
  id: string;
  name: string;
  city: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: ActivityCategory;
  cost: ActivityCost;
  estimatedCost: number;
  duration: ActivityDuration;
  bestTime: ActivityTime[];
  rating: number;
  reviews: number;
};

export const sampleActivities: SearchableActivity[] = [
  {
    id: 'sact-1',
    name: 'Louvre Museum Guided Tour',
    city: 'Paris, France',
    description: 'Skip the lines and explore the masterpieces of the Louvre with an expert guide, including the Mona Lisa and Venus de Milo.',
    imageUrl: 'https://picsum.photos/seed/louvre/400/300',
    imageHint: 'louvre museum',
    category: 'Culture',
    cost: '$$',
    estimatedCost: 75,
    duration: 'Half day',
    bestTime: ['Morning', 'Afternoon'],
    rating: 4.8,
    reviews: 1250,
  },
  {
    id: 'sact-2',
    name: 'Eiffel Tower Summit Access',
    city: 'Paris, France',
    description: 'Get priority access to all levels of the Eiffel Tower, including the summit, for breathtaking panoramic views of Paris.',
    imageUrl: 'https://picsum.photos/seed/eiffel/400/300',
    imageHint: 'eiffel tower',
    category: 'Sightseeing',
    cost: '$$',
    estimatedCost: 50,
    duration: '1-3 hours',
    bestTime: ['Afternoon', 'Evening'],
    rating: 4.9,
    reviews: 3200,
  },
  {
    id: 'sact-3',
    name: 'Bateaux-Mouches Seine River Cruise',
    city: 'Paris, France',
    description: 'Enjoy a relaxing cruise along the Seine, passing by iconic landmarks like Notre Dame and the Musée d\'Orsay.',
    imageUrl: 'https://picsum.photos/seed/seine-cruise/400/300',
    imageHint: 'seine cruise',
    category: 'Sightseeing',
    cost: '$',
    estimatedCost: 20,
    duration: '1-3 hours',
    bestTime: ['Afternoon', 'Evening'],
    rating: 4.6,
    reviews: 2100,
  },
  {
    id: 'sact-4',
    name: 'Le Marais Food & Wine Tour',
    city: 'Paris, France',
    description: 'Taste your way through the historic Le Marais district, sampling delicious cheeses, pastries, wines, and more.',
    imageUrl: 'https://picsum.photos/seed/marais-food/400/300',
    imageHint: 'paris food tour',
    category: 'Food & Dining',
    cost: '$$$',
    estimatedCost: 110,
    duration: 'Half day',
    bestTime: ['Afternoon'],
    rating: 4.9,
    reviews: 850,
  },
  {
    id: 'sact-5',
    name: 'Montmartre Walking Tour & Sacré-Cœur',
    city: 'Paris, France',
    description: 'Discover the bohemian heart of Paris in Montmartre, visit the Sacré-Cœur Basilica, and see where famous artists lived.',
    imageUrl: 'https://picsum.photos/seed/montmartre-walk/400/300',
    imageHint: 'montmartre walk',
    category: 'Culture',
    cost: '$',
    estimatedCost: 30,
    duration: '1-3 hours',
    bestTime: ['Morning', 'Afternoon'],
    rating: 4.7,
    reviews: 980,
  },
   {
    id: 'sact-6',
    name: 'Jardin du Luxembourg Stroll',
    city: 'Paris, France',
    description: 'Relax and enjoy the beautiful scenery of the Luxembourg Gardens, a favorite spot for locals and tourists alike.',
    imageUrl: 'https://picsum.photos/seed/luxembourg/400/300',
    imageHint: 'luxembourg garden',
    category: 'Relaxation',
    cost: 'Free',
    estimatedCost: 0,
    duration: '< 1 hour',
    bestTime: ['Morning', 'Afternoon'],
    rating: 4.8,
    reviews: 1500,
  },
  {
    id: 'sact-7',
    name: 'Catacombs of Paris Skip-the-Line',
    city: 'Paris, France',
    description: 'Delve into the mysterious underground tunnels of Paris and see the final resting place of millions of Parisians.',
    imageUrl: 'https://picsum.photos/seed/catacombs/400/300',
    imageHint: 'paris catacombs',
    category: 'Adventure',
    cost: '$$',
    estimatedCost: 40,
    duration: '1-3 hours',
    bestTime: ['Morning', 'Afternoon'],
    rating: 4.5,
    reviews: 1100,
  },
   {
    id: 'sact-8',
    name: 'French Baking Class: Croissants & Pain au Chocolat',
    city: 'Paris, France',
    description: 'Learn the secrets of French pastry from a master baker in a hands-on class and enjoy your delicious creations.',
    imageUrl: 'https://picsum.photos/seed/baking-class/400/300',
    imageHint: 'baking class',
    category: 'Food & Dining',
    cost: '$$$',
    estimatedCost: 150,
    duration: 'Half day',
    bestTime: ['Morning'],
    rating: 4.9,
    reviews: 600,
  },
];

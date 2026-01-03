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
    id: 'sact-2',
    name: 'Eiffel Tower Summit Access',
    city: 'Paris, France',
    description: 'Get priority access to the summit for breathtaking panoramic views of Paris.',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&h=300&fit=crop',
    imageHint: 'eiffel tower paris',
    category: 'Sightseeing',
    cost: '$$',
    estimatedCost: 50,
    duration: '1-3 hours',
    bestTime: ['Afternoon', 'Evening'],
    rating: 4.9,
    reviews: 3200,
  },
  {
    id: 'sact-1',
    name: 'Louvre Museum Guided Tour',
    city: 'Paris, France',
    description: 'Skip the lines and explore masterpieces like the Mona Lisa and Venus de Milo.',
    imageUrl: 'https://images.unsplash.com/photo-1598605272254-82aa7f2a8a18?q=80&w=400&h=300&fit=crop',
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
    id: 'sact-4',
    name: 'Le Marais Food & Wine Tour',
    city: 'Paris, France',
    description: 'Taste your way through the historic Le Marais with delicious cheeses, pastries, and wines.',
    imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=400&h=300&fit=crop',
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
    id: 'sact-3',
    name: 'Bateaux-Mouches Seine River Cruise',
    city: 'Paris, France',
    description: 'A relaxing cruise passing by iconic landmarks like Notre Dame and Musée d\'Orsay.',
    imageUrl: 'https://images.unsplash.com/photo-1550349079-6a3c6339d338?q=80&w=400&h=300&fit=crop',
    imageHint: 'seine river cruise',
    category: 'Sightseeing',
    cost: '$',
    estimatedCost: 20,
    duration: '1-3 hours',
    bestTime: ['Afternoon', 'Evening'],
    rating: 4.6,
    reviews: 2100,
  },
  {
    id: 'sact-5',
    name: 'Montmartre Walking Tour & Sacré-Cœur',
    city: 'Paris, France',
    description: 'Discover the bohemian heart of Paris and see where famous artists lived.',
    imageUrl: 'https://images.unsplash.com/photo-1595101909823-933a220a2278?q=80&w=400&h=300&fit=crop',
    imageHint: 'montmartre paris',
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
    description: 'Relax and enjoy the beautiful scenery of these iconic Parisian gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1590240733596-37a6b252069a?q=80&w=400&h=300&fit=crop',
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
    description: 'Delve into the mysterious underground tunnels and see the final resting place of millions.',
    imageUrl: 'https://images.unsplash.com/photo-1616413948529-688424594611?q=80&w=400&h=300&fit=crop',
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
    name: 'French Baking Class: Croissants',
    city: 'Paris, France',
    description: 'Learn the secrets of French pastry from a master baker in a hands-on class.',
    imageUrl: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=400&h=300&fit=crop',
    imageHint: 'paris baking class',
    category: 'Food & Dining',
    cost: '$$$',
    estimatedCost: 150,
    duration: 'Half day',
    bestTime: ['Morning'],
    rating: 4.9,
    reviews: 600,
  },
];

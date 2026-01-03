export type Destination = {
  id: string;
  city: string;
  country: string;
  imageUrl: string;
  tags: string[];
  bestTime: string;
  budget: 'Low' | 'Medium' | 'High';
};

export const sampleDestinations: Destination[] = [
  {
    id: 'dest-1',
    city: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://picsum.photos/seed/kyoto/800/600',
    tags: ['Culture', 'Food', 'Nature'],
    bestTime: 'Mar-May, Sep-Nov',
    budget: 'Medium',
  },
  {
    id: 'dest-2',
    city: 'Amalfi Coast',
    country: 'Italy',
    imageUrl: 'https://picsum.photos/seed/amalfi/800/600',
    tags: ['Beaches', 'Scenery', 'Food'],
    bestTime: 'Apr-Jun, Sep',
    budget: 'High',
  },
  {
    id: 'dest-3',
    city: 'Queenstown',
    country: 'New Zealand',
    imageUrl: 'https://picsum.photos/seed/queenstown/800/600',
    tags: ['Adventure', 'Nature', 'Scenery'],
    bestTime: 'Dec-Feb, Jun-Aug',
    budget: 'High',
  },
  {
    id: 'dest-4',
    city: 'Marrakech',
    country: 'Morocco',
    imageUrl: 'https://picsum.photos/seed/marrakech/800/600',
    tags: ['Culture', 'Markets', 'History'],
    bestTime: 'Mar-May, Sep-Nov',
    budget: 'Low',
  },
   {
    id: 'dest-5',
    city: 'Bora Bora',
    country: 'French Polynesia',
    imageUrl: 'https://picsum.photos/seed/borabora/800/600',
    tags: ['Beaches', 'Luxury', 'Romance'],
    bestTime: 'May-Oct',
    budget: 'High',
  },
   {
    id: 'dest-6',
    city: 'Reykjavik',
    country: 'Iceland',
    imageUrl: 'https://picsum.photos/seed/reykjavik/800/600',
    tags: ['Nature', 'Adventure', 'Scenery'],
    bestTime: 'Jun-Aug, Sep-Oct',
    budget: 'High',
  },
   {
    id: 'dest-7',
    city: 'Hanoi',
    country: 'Vietnam',
    imageUrl: 'https://picsum.photos/seed/hanoi/800/600',
    tags: ['Food', 'Culture', 'History'],
    bestTime: 'Feb-Apr, Oct-Nov',
    budget: 'Low',
  },
   {
    id: 'dest-8',
    city: 'Cairo',
    country: 'Egypt',
    imageUrl: 'https://picsum.photos/seed/cairo/800/600',
    tags: ['History', 'Culture', 'Landmarks'],
    bestTime: 'Oct-Apr',
    budget: 'Low',
  },
];

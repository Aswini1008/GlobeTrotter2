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
    city: 'Ooty',
    country: 'Tamil Nadu',
    imageUrl: 'https://picsum.photos/seed/ooty-dest/800/600',
    tags: ['Hill Station', 'Nature', 'Relaxation'],
    bestTime: 'Oct-Jun',
    budget: 'Medium',
  },
  {
    id: 'dest-2',
    city: 'Goa',
    country: 'India',
    imageUrl: 'https://picsum.photos/seed/goa-dest/800/600',
    tags: ['Beaches', 'Parties', 'Food'],
    bestTime: 'Nov-Feb',
    budget: 'Medium',
  },
  {
    id: 'dest-3',
    city: 'Munnar',
    country: 'Kerala',
    imageUrl: 'https://picsum.photos/seed/munnar-dest/800/600',
    tags: ['Hill Station', 'Tea Gardens', 'Scenery'],
    bestTime: 'Sep-Mar',
    budget: 'Low',
  },
  {
    id: 'dest-4',
    city: 'Jaipur',
    country: 'Rajasthan',
    imageUrl: 'https://picsum.photos/seed/jaipur-dest/800/600',
    tags: ['Culture', 'Forts', 'History'],
    bestTime: 'Oct-Mar',
    budget: 'Medium',
  },
   {
    id: 'dest-5',
    city: 'Kodaikanal',
    country: 'Tamil Nadu',
    imageUrl: 'https://picsum.photos/seed/kodai-dest/800/600',
    tags: ['Hill Station', 'Lakes', 'Nature'],
    bestTime: 'Sep-May',
    budget: 'Low',
  },
   {
    id: 'dest-6',
    city: 'Rishikesh',
    country: 'Uttarakhand',
    imageUrl: 'https://picsum.photos/seed/rishikesh-dest/800/600',
    tags: ['Spirituality', 'Adventure', 'Yoga'],
    bestTime: 'Sep-Nov, Feb-Apr',
    budget: 'Low',
  },
   {
    id: 'dest-7',
    city: 'Srinagar',
    country: 'Jammu & Kashmir',
    imageUrl: 'https://picsum.photos/seed/srinagar-dest/800/600',
    tags: ['Lakes', 'Gardens', 'Scenery'],
    bestTime: 'Apr-Oct',
    budget: 'High',
  },
   {
    id: 'dest-8',
    city: 'Pondicherry',
    country: 'Puducherry',
    imageUrl: 'https://picsum.photos/seed/pondy-dest/800/600',
    tags: ['Beaches', 'French Colony', 'Spirituality'],
    bestTime: 'Oct-Mar',
    budget: 'Medium',
  },
];

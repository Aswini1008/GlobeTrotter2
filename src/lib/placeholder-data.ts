import type { Trip, User, CommunityPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const sampleUser: User = {
  id: 'user-1',
  firstName: 'Alex',
  lastName: 'Doe',
  email: 'alex.doe@example.com',
  photoURL: 'https://i.pravatar.cc/150?u=alexdoe',
};

export const sampleUser2: User = {
  id: 'user-2',
  firstName: 'Sam',
  lastName: 'Jones',
  email: 'sam.jones@example.com',
  photoURL: 'https://i.pravatar.cc/150?u=samjones',
};

const allUsers = [sampleUser, sampleUser2];

export const getUserById = (id: string): User | undefined => {
    return allUsers.find(u => u.id === id);
}

const tripImages = PlaceHolderImages.filter((img) => img.id.startsWith('trip'));

export const sampleTrips: Trip[] = [
  {
    id: 'trip-1',
    userId: 'user-1',
    tripName: 'European Adventure',
    startDate: new Date('2024-08-15'),
    endDate: new Date('2024-08-29'),
    totalBudget: 3000,
    isPublic: true,
    createdAt: new Date('2024-05-10'),
    stops: [
      {
        id: 'stop-1',
        tripId: 'trip-1',
        city: 'Paris, France',
        startDate: new Date('2024-08-15'),
        endDate: new Date('2024-08-20'),
        order: 1,
        activities: [
          { id: 'act-1', stopId: 'stop-1', title: 'Visit the Eiffel Tower', estimatedCost: 25, duration: '3 hours' },
          { id: 'act-2', stopId: 'stop-1', title: 'Louvre Museum Tour', estimatedCost: 40, duration: '4 hours' },
          { id: 'act-3', stopId: 'stop-1', title: 'Seine River Cruise', estimatedCost: 15, duration: '1.5 hours' },
        ],
      },
      {
        id: 'stop-2',
        tripId: 'trip-1',
        city: 'Rome, Italy',
        startDate: new Date('2024-08-21'),
        endDate: new Date('2024-08-25'),
        order: 2,
        activities: [
          { id: 'act-4', stopId: 'stop-2', title: 'Colosseum & Roman Forum', estimatedCost: 30, duration: '4 hours' },
          { id: 'act-5', stopId: 'stop-2', title: 'Vatican City Tour', estimatedCost: 45, duration: '5 hours' },
        ],
      },
      {
        id: 'stop-3',
        tripId: 'trip-1',
        city: 'Barcelona, Spain',
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-08-29'),
        order: 3,
        activities: [
          { id: 'act-6', stopId: 'stop-3', title: 'Sagrada Familia Visit', estimatedCost: 35, duration: '2 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-1')!
  },
  {
    id: 'trip-2',
    userId: 'user-1',
    tripName: 'Tropical Getaway',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-20'),
    totalBudget: 2500,
    isPublic: false,
    createdAt: new Date('2024-06-01'),
    stops: [
      {
        id: 'stop-4',
        tripId: 'trip-2',
        city: 'Maui, Hawaii',
        startDate: new Date('2024-07-10'),
        endDate: new Date('2024-07-20'),
        order: 1,
        activities: [
          { id: 'act-7', stopId: 'stop-4', title: 'Road to Hana', estimatedCost: 50, duration: 'Full day' },
          { id: 'act-8', stopId: 'stop-4', title: 'Snorkeling at Molokini', estimatedCost: 120, duration: '4 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-2')!
  },
  {
    id: 'trip-3',
    userId: 'user-2',
    tripName: 'Mountain Expedition',
    startDate: new Date('2024-09-05'),
    endDate: new Date('2024-09-12'),
    totalBudget: 1800,
    isPublic: true,
    createdAt: new Date('2024-07-15'),
    stops: [
       {
        id: 'stop-5',
        tripId: 'trip-3',
        city: 'Banff, Canada',
        startDate: new Date('2024-09-05'),
        endDate: new Date('2024-09-12'),
        order: 1,
        activities: [
            { id: 'act-9', stopId: 'stop-5', title: 'Hike to Lake Agnes Tea House', estimatedCost: 10, duration: '5 hours' },
            { id: 'act-10', stopId: 'stop-5', title: 'Canoeing on Lake Louise', estimatedCost: 90, duration: '2 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-3')!
  },
    {
    id: 'trip-4',
    userId: 'user-1',
    tripName: 'Trip to India',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2024-11-15'),
    totalBudget: 2800,
    isPublic: false,
    createdAt: new Date('2024-08-01'),
    stops: [
      {
        id: 'stop-6',
        tripId: 'trip-4',
        city: 'Delhi, India',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-05'),
        order: 1,
        activities: [
          { id: 'act-11', stopId: 'stop-6', title: 'Explore Old Delhi', estimatedCost: 20, duration: '6 hours' },
        ],
      },
      {
        id: 'stop-7',
        tripId: 'trip-4',
        city: 'Agra, India',
        startDate: new Date('2024-11-06'),
        endDate: new Date('2024-11-08'),
        order: 2,
        activities: [
          { id: 'act-12', stopId: 'stop-7', title: 'Visit Taj Mahal', estimatedCost: 50, duration: '4 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-india')!,
  },
  {
    id: 'trip-5',
    userId: 'user-2',
    tripName: 'Weekend in New York',
    startDate: new Date('2024-10-18'),
    endDate: new Date('2024-10-20'),
    totalBudget: 900,
    isPublic: true,
    createdAt: new Date('2024-08-10'),
    stops: [
       {
        id: 'stop-8',
        tripId: 'trip-5',
        city: 'New York, USA',
        startDate: new Date('2024-10-18'),
        endDate: new Date('2024-10-20'),
        order: 1,
        activities: [
          { id: 'act-13', stopId: 'stop-8', title: 'Broadway Show', estimatedCost: 150, duration: '3 hours' },
        ],
      },
    ],
    imageUrl: "https://picsum.photos/seed/nyc-trip/800/600",
    imageHint: "new york city trip",
    description: "A photo of New York City"
  },
  {
    id: 'trip-6',
    userId: 'user-1',
    tripName: 'Australian Outback',
    startDate: new Date('2025-02-20'),
    endDate: new Date('2025-03-05'),
    totalBudget: 4000,
    isPublic: false,
    createdAt: new Date('2024-08-15'),
    stops: [
       {
        id: 'stop-9',
        tripId: 'trip-6',
        city: 'Alice Springs, Australia',
        startDate: new Date('2025-02-20'),
        endDate: new Date('2025-03-05'),
        order: 1,
        activities: [
          { id: 'act-14', stopId: 'stop-9', title: 'Uluru Base Walk', estimatedCost: 0, duration: '4 hours' },
        ],
      },
    ],
    imageUrl: "https://picsum.photos/seed/outback/800/600",
    imageHint: "australian outback",
    description: "A photo of the Australian Outback"
  }
];


export const sampleCommunityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        userId: 'user-1',
        createdAt: new Date('2024-08-12'),
        type: 'ITINERARY',
        trip: sampleTrips.find(t => t.id === 'trip-1')!
    },
    {
        id: 'post-2',
        userId: 'user-2',
        createdAt: new Date('2024-08-11'),
        type: 'STORY',
        city: 'Varanasi',
        country: 'India',
        text: 'I visited Varanasi during monsoon. The chaos, the rain, the peace — it changed me. Watching the Ganga Aarti ceremony from a boat on the river was an unforgettable spiritual experience.',
    },
    {
        id: 'post-3',
        userId: 'user-1',
        createdAt: new Date('2024-08-10'),
        type: 'TIP',
        city: 'Bali',
        country: 'Indonesia',
        text: '💡 Tip for Bali: Rent a scooter only if you’re confident—traffic is intense near Ubud. For a more relaxed experience, hire a driver for the day. It\'s surprisingly affordable!'
    },
    {
        id: 'post-4',
        userId: 'user-2',
        createdAt: new Date('2024-08-09'),
        type: 'ITINERARY',
        trip: sampleTrips.find(t => t.id === 'trip-3')!
    },
    {
        id: 'post-5',
        userId: 'user-1',
        createdAt: new Date('2024-08-08'),
        type: 'EXPERIENCE',
        city: 'Barcelona',
        country: 'Spain',
        text: 'Barcelona is magical at night, but avoid La Rambla after 11 PM if you’re solo. The Gothic Quarter\'s narrow streets offer a much more authentic and safer vibe for an evening walk.',
        imageUrl: 'https://picsum.photos/seed/barcelona-night/800/600',
        imageHint: 'barcelona night street'
    },
    {
        id: 'post-6',
        userId: 'user-2',
        createdAt: new Date('2024-08-07'),
        type: 'ITINERARY',
        trip: sampleTrips.find(t => t.id === 'trip-5')!
    }
]

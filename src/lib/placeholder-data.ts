import type { Trip, User, CommunityPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const sampleUser: User = {
  id: 'user-1',
  fullName: 'Aswini S M',
  email: 'aswini.sm@example.com',
  photoURL: '/avatars/aswini.png',
};

export const sampleUser2: User = {
  id: 'user-2',
  fullName: 'Rohan Sharma',
  email: 'rohan.sharma@example.com',
  photoURL: '/avatars/rohan.png',
};

export const sampleUser3: User = {
  id: 'user-3',
  fullName: 'Virat Kumar',
  email: 'virat.kumar@example.com',
  photoURL: '/avatars/virat.png',
};

export const sampleUser4: User = {
  id: 'user-4',
  fullName: 'Priya Patel',
  email: 'priya.patel@example.com',
  photoURL: '/avatars/priya.png',
};

export const sampleUser5: User = {
  id: 'user-5',
  fullName: 'Jeeva Shankar',
  email: 'jeeva.shankar@example.com',
  photoURL: '/avatars/jeeva.png',
};


const allUsers = [sampleUser, sampleUser2, sampleUser3, sampleUser4, sampleUser5];

export const getUserById = (id: string): User | undefined => {
    return allUsers.find(u => u.id === id);
}

const tripImages = PlaceHolderImages.filter((img) => img.id.startsWith('trip'));

export const sampleTrips: Trip[] = [
  {
    id: 'trip-1',
    userId: 'user-1',
    tripName: 'Weekend Trip to Ooty',
    startDate: new Date('2024-10-18'),
    endDate: new Date('2024-10-20'),
    totalBudget: 15000,
    isPublic: true,
    createdAt: new Date('2024-09-01'),
    stops: [
      {
        id: 'stop-1',
        tripId: 'trip-1',
        city: 'Ooty, Tamil Nadu',
        startDate: new Date('2024-10-18'),
        endDate: new Date('2024-10-20'),
        order: 1,
        activities: [
          { id: 'act-1', stopId: 'stop-1', title: 'Ooty Lake & Boat Club', estimatedCost: 500, duration: '3 hours' },
          { id: 'act-2', stopId: 'stop-1', title: 'Botanical Gardens', estimatedCost: 300, duration: '2 hours' },
          { id: 'act-3', stopId: 'stop-1', title: 'Doddabetta Peak', estimatedCost: 100, duration: '1.5 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-ooty')!
  },
  {
    id: 'trip-2',
    userId: 'user-1',
    tripName: 'Kerala Backwaters Plan',
    startDate: new Date('2024-11-05'),
    endDate: new Date('2024-11-10'),
    totalBudget: 30000,
    isPublic: true,
    createdAt: new Date('2024-09-15'),
    stops: [
      {
        id: 'stop-4',
        tripId: 'trip-2',
        city: 'Alleppey, Kerala',
        startDate: new Date('2024-11-05'),
        endDate: new Date('2024-11-10'),
        order: 1,
        activities: [
          { id: 'act-7', stopId: 'stop-4', title: 'Houseboat Day Cruise', estimatedCost: 8000, duration: 'Full day' },
          { id: 'act-8', stopId: 'stop-4', title: 'Marari Beach Visit', estimatedCost: 200, duration: '4 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-kerala')!
  },
  {
    id: 'trip-3',
    userId: 'user-2',
    tripName: 'Temple Visit – Madurai',
    startDate: new Date('2024-12-20'),
    endDate: new Date('2024-12-22'),
    totalBudget: 12000,
    isPublic: true,
    createdAt: new Date('2024-10-01'),
    stops: [
       {
        id: 'stop-5',
        tripId: 'trip-3',
        city: 'Madurai, Tamil Nadu',
        startDate: new Date('2024-12-20'),
        endDate: new Date('2024-12-22'),
        order: 1,
        activities: [
            { id: 'act-9', stopId: 'stop-5', title: 'Meenakshi Amman Temple', estimatedCost: 100, duration: '4 hours' },
            { id: 'act-10', stopId: 'stop-5', title: 'Thirumalai Nayakar Mahal', estimatedCost: 50, duration: '2 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-madurai')!
  },
    {
    id: 'trip-4',
    userId: 'user-1',
    tripName: 'Goa Beach Holiday',
    startDate: new Date('2025-02-10'),
    endDate: new Date('2025-02-15'),
    totalBudget: 40000,
    isPublic: false,
    createdAt: new Date('2024-11-01'),
    stops: [
      {
        id: 'stop-6',
        tripId: 'trip-4',
        city: 'North Goa, Goa',
        startDate: new Date('2025-02-10'),
        endDate: new Date('2025-02-12'),
        order: 1,
        activities: [
          { id: 'act-11', stopId: 'stop-6', title: 'Baga Beach Watersports', estimatedCost: 3000, duration: '5 hours' },
        ],
      },
      {
        id: 'stop-7',
        tripId: 'trip-4',
        city: 'South Goa, Goa',
        startDate: new Date('2025-02-13'),
        endDate: new Date('2025-02-15'),
        order: 2,
        activities: [
          { id: 'act-12', stopId: 'stop-7', title: 'Palolem Beach Relaxation', estimatedCost: 500, duration: 'Full day' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-goa')!,
  },
  {
    id: 'trip-5',
    userId: 'user-4',
    tripName: 'Spiritual Rishikesh',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-03-05'),
    totalBudget: 22000,
    isPublic: true,
    createdAt: new Date('2025-02-01'),
    stops: [
      {
        id: 'stop-8',
        tripId: 'trip-5',
        city: 'Rishikesh, Uttarakhand',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-03-05'),
        order: 1,
        activities: [
            { id: 'act-13', stopId: 'stop-8', title: 'River Rafting', estimatedCost: 2500, duration: 'Half day' },
            { id: 'act-14', stopId: 'stop-8', title: 'Visit Beatles Ashram', estimatedCost: 600, duration: '3 hours' },
        ],
      },
    ],
    imageUrl: 'https://picsum.photos/seed/rishikesh/800/600',
    imageHint: 'rishikesh river',
    description: 'A spiritual journey to the yoga capital of the world, Rishikesh.'
  },
  {
    id: 'trip-7',
    userId: 'user-1',
    tripName: 'Mumbai Getaway',
    startDate: new Date('2025-01-13'),
    endDate: new Date('2025-01-15'),
    totalBudget: 20000,
    isPublic: false,
    createdAt: new Date('2024-12-01'),
    stops: [
       {
        id: 'stop-10',
        tripId: 'trip-7',
        city: 'Mumbai, Maharashtra',
        startDate: new Date('2025-01-13'),
        endDate: new Date('2025-01-15'),
        order: 1,
        activities: [
          { id: 'act-15', stopId: 'stop-10', title: 'Gateway of India Visit', estimatedCost: 0, duration: '1 hour' },
          { id: 'act-16', stopId: 'stop-10', title: 'Street Food Tour at Juhu', estimatedCost: 1000, duration: '3 hours' },
        ],
      },
    ],
    ...tripImages.find(img => img.id === 'trip-mumbai')!,
  }
];


export const sampleCommunityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        userId: 'user-1',
        createdAt: new Date('2024-10-25'),
        type: 'ITINERARY',
        trip: sampleTrips.find(t => t.id === 'trip-1')!,
        likes: 132,
        comments: 18,
    },
    {
        id: 'post-2',
        userId: 'user-2',
        createdAt: new Date('2024-11-01'),
        type: 'STORY',
        city: 'Varanasi',
        country: 'India',
        text: 'I visited Varanasi during monsoon. The chaos, the rain, the peace — it changed me. Watching the Ganga Aarti ceremony from a boat on the river was an unforgettable spiritual experience.',
        imageUrl: 'https://picsum.photos/seed/varanasi-ghat/800/600',
        imageHint: 'varanasi ghat',
        likes: 247,
        comments: 42,
    },
    {
        id: 'post-3',
        userId: 'user-1',
        createdAt: new Date('2024-11-12'),
        type: 'TIP',
        city: 'Goa',
        country: 'India',
        text: '💡 Tip for Goa: Rent a scooter only if you’re confident—traffic can be intense. For a more relaxed experience, hire a cab for the day. It\'s surprisingly affordable!',
        likes: 98,
        comments: 12,
    },
    {
        id: 'post-4',
        userId: 'user-2',
        createdAt: new Date('2024-12-28'),
        type: 'ITINERARY',
        trip: sampleTrips.find(t => t.id === 'trip-3')!,
        likes: 76,
        comments: 9,
    },
    {
        id: 'post-5',
        userId: 'user-1',
        createdAt: new Date('2025-01-02'),
        type: 'EXPERIENCE',
        city: 'Jaipur',
        country: 'India',
        text: 'The view from Nahargarh Fort at sunset is magical. Make sure to visit the stepwell located inside the fort, it\'s a hidden gem!',
        imageUrl: 'https://picsum.photos/seed/jaipur-fort/800/600',
        imageHint: 'jaipur fort',
        likes: 188,
        comments: 25,
    },
    {
        id: 'post-6',
        userId: 'user-3',
        createdAt: new Date('2025-01-15'),
        type: 'EXPERIENCE',
        city: 'Srinagar',
        country: 'Jammu & Kashmir',
        text: 'A shikara ride on Dal Lake is pure bliss. The floating markets and majestic mountains in the background are a sight to behold.',
        imageUrl: 'https://picsum.photos/seed/dal-lake/800/600',
        imageHint: 'dal lake shikara',
        likes: 215,
        comments: 31,
    },
    {
        id: 'post-7',
        userId: 'user-4',
        createdAt: new Date('2025-02-10'),
        type: 'ITINERARY',
        trip: sampleTrips.find(t => t.id === 'trip-5')!,
        likes: 155,
        comments: 22,
    },
    {
        id: 'post-8',
        userId: 'user-5',
        createdAt: new Date('2025-02-18'),
        type: 'STORY',
        city: 'Hampi',
        country: 'Karnataka',
        text: 'Exploring the ruins of Hampi felt like stepping back in time. The scale of the Vijayanagara Empire is just mind-boggling. Tip: Rent a bicycle to cover the vast area.',
        imageUrl: 'https://picsum.photos/seed/hampi-ruins/800/600',
        imageHint: 'hampi ruins',
        likes: 190,
        comments: 28,
    },
    {
        id: 'post-9',
        userId: 'user-3',
        createdAt: new Date('2025-03-05'),
        type: 'TIP',
        city: 'Mumbai',
        country: 'India',
        text: 'Trying the Vada Pav at a local stall is a must-do in Mumbai. Don\'t be afraid to try the street food, it\'s the soul of the city!',
        likes: 120,
        comments: 15,
    },
    {
        id: 'post-10',
        userId: 'user-4',
        createdAt: new Date('2025-03-20'),
        type: 'EXPERIENCE',
        city: 'Jaipur',
        country: 'Rajasthan',
        text: 'The intricate designs of Hawa Mahal are even more stunning in person. Go early in the morning to see it glow in the soft sunlight.',
        imageUrl: 'https://picsum.photos/seed/hawa-mahal/800/600',
        imageHint: 'hawa mahal',
        likes: 310,
        comments: 45,
    }
]

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
    id: 'trip-10',
    userId: 'user-1',
    tripName: 'Incredible India Trip',
    startDate: new Date('2026-02-10'),
    endDate: new Date('2026-02-16'),
    totalBudget: 45000,
    dailyBudget: 4000,
    isPublic: true,
    createdAt: new Date('2025-12-01'),
    stops: [
      {
        id: 'stop-20',
        tripId: 'trip-10',
        city: 'Chennai',
        startDate: new Date('2026-02-10'),
        endDate: new Date('2026-02-11'),
        order: 1,
        activities: {
            '2026-02-10': [
                { id: 'act-101', stopId: 'stop-20', title: 'Marina Beach Walk', estimatedCost: 0, duration: '2 hours' },
                { id: 'act-102', stopId: 'stop-20', title: 'Local South Indian Breakfast', estimatedCost: 250, duration: '1 hour' },
                { id: 'act-103', stopId: 'stop-20', title: 'Kapaleeshwarar Temple Visit', estimatedCost: 0, duration: '1.5 hours' },
            ],
            '2026-02-11': [
                { id: 'act-104', stopId: 'stop-20', title: 'Mahabalipuram Day Trip', estimatedCost: 1200, duration: 'Full day' },
                { id: 'act-105', stopId: 'stop-20', title: 'Street Food Dinner', estimatedCost: 400, duration: '2 hours' },
            ]
        },
      },
      {
        id: 'stop-21',
        tripId: 'trip-10',
        city: 'Bengaluru',
        startDate: new Date('2026-02-12'),
        endDate: new Date('2026-02-14'),
        order: 2,
        activities: {
            '2026-02-12': [
                { id: 'act-201', stopId: 'stop-21', title: 'Travel Day (Chennai → Bengaluru)', estimatedCost: 1800, duration: '6 hours' },
            ],
            '2026-02-13': [
                { id: 'act-202', stopId: 'stop-21', title: 'Lalbagh Botanical Garden', estimatedCost: 300, duration: '3 hours' },
                { id: 'act-203', stopId: 'stop-21', title: 'Cafe Hopping in Koramangala', estimatedCost: 1200, duration: '4 hours' },
            ],
            '2026-02-14': [
                { id: 'act-204', stopId: 'stop-21', title: 'Coorg Day Trip', estimatedCost: 6500, duration: 'Full day' },
                { id: 'act-205', stopId: 'stop-21', title: 'Local Dinner at VV Puram', estimatedCost: 700, duration: '2 hours' },
            ],
        },
      },
       {
        id: 'stop-22',
        tripId: 'trip-10',
        city: 'Hyderabad',
        startDate: new Date('2026-02-15'),
        endDate: new Date('2026-02-16'),
        order: 3,
        activities: {
            '2026-02-15': [
                { id: 'act-301', stopId: 'stop-22', title: 'Travel Day (Bengaluru → Hyderabad)', estimatedCost: 1200, duration: '8 hours' },
            ],
            '2026-02-16': [
                { id: 'act-302', stopId: 'stop-22', title: 'Charminar & Old City Tour', estimatedCost: 800, duration: 'Half day' },
                { id: 'act-303', stopId: 'stop-22', title: 'Biryani Dinner at Paradise', estimatedCost: 600, duration: '2 hours' },
            ]
        },
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532375836203-32433b499187?q=80&w=1920',
    description: 'A collage of iconic Indian landmarks and scenery',
    imageHint: 'incredible india collage'
  },
];


export const sampleCommunityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        userId: 'user-1',
        createdAt: new Date('2024-10-25'),
        type: 'ITINERARY',
        trip: sampleTrips[0],
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
        imageUrl: 'https://images.unsplash.com/photo-1563361488-888935a84beb?q=80&w=1920',
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
        trip: sampleTrips[0],
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
        imageUrl: 'https://images.unsplash.com/photo-1559991802-f6046e0a5a31?q=80&w=1920',
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
        imageUrl: 'https://images.unsplash.com/photo-1579724128096-2d57a2f5a6f2?q=80&w=1920',
        imageHint: 'dal lake shikara',
        likes: 215,
        comments: 31,
    },
    {
        id: 'post-7',
        userId: 'user-4',
        createdAt: new Date('2025-02-10'),
        type: 'ITINERARY',
        trip: sampleTrips[0],
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
        imageUrl: 'https://images.unsplash.com/photo-1590002151739-644fe1157c24?q=80&w=1920',
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
        imageUrl: 'https://images.unsplash.com/photo-1567219946895-9b1a520c4a75?q=80&w=1920',
        imageHint: 'hawa mahal',
        likes: 310,
        comments: 45,
    }
]

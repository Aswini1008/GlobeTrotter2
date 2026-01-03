import type { Trip, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const sampleUser: User = {
  id: 'user-1',
  firstName: 'Alex',
  lastName: 'Doe',
  email: 'alex.doe@example.com',
  photoURL: 'https://i.pravatar.cc/150?u=alexdoe',
};

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
          { id: 'act-4', stopId: 'stop-2', title: 'Explore the Colosseum', estimatedCost: 30, duration: '3 hours' },
          { id: 'act-5', stopId: 'stop-2', title: 'Vatican City Tour', estimatedCost: 50, duration: '5 hours' },
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
    ...tripImages[0],
  },
  {
    id: 'trip-2',
    userId: 'user-1',
    tripName: 'Tropical Getaway',
    startDate: new Date('2024-09-05'),
    endDate: new Date('2024-09-12'),
    totalBudget: 2500,
    isPublic: false,
    createdAt: new Date('2024-06-20'),
    stops: [
       {
        id: 'stop-4',
        tripId: 'trip-2',
        city: 'Maui, USA',
        startDate: new Date('2024-09-05'),
        endDate: new Date('2024-09-12'),
        order: 1,
        activities: [
          { id: 'act-7', stopId: 'stop-4', title: 'Road to Hana', estimatedCost: 100, duration: 'Full day' },
          { id: 'act-8', stopId: 'stop-4', title: 'Snorkeling at Molokini', estimatedCost: 150, duration: 'Half day' },
        ],
      },
    ],
    ...tripImages[1],
  },
  {
    id: 'trip-3',
    userId: 'user-1',
    tripName: 'Mountain Expedition',
    startDate: new Date('2024-10-10'),
    endDate: new Date('2024-10-18'),
    totalBudget: 1800,
    isPublic: true,
    createdAt: new Date('2024-07-01'),
    stops: [],
    ...tripImages[2],
  },
];

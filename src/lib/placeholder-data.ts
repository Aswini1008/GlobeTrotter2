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
          { id: 'act-4', stopId: 'stop-2', title:.
..
  },
];

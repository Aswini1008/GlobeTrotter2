import type { ImagePlaceholder } from './placeholder-images';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  city?: string;
  country?: string;
};

export type Trip = {
  id: string;
  userId: string;
  tripName: string;
  startDate: Date;
  endDate: Date;
  totalBudget: number;
  isPublic: boolean;
  createdAt: Date;
  stops: Stop[];
} & ImagePlaceholder;

export type Stop = {
  id: string;
  tripId: string;
  city: string;
  startDate: Date;
  endDate: Date;
  order: number;
  activities: Activity[];
};

export type Activity = {
  id: string;
  stopId: string;
  title: string;
  estimatedCost: number;
  duration: string;
};

export type IntelligentSuggestion = {
  activity: string;
  suggestion: string;
};

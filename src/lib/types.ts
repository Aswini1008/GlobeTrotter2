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

export type CommunityPostType = 'ITINERARY' | 'STORY' | 'TIP' | 'EXPERIENCE';

export interface CommunityPostBase {
  id: string;
  userId: string;
  createdAt: Date;
  type: CommunityPostType;
  text?: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  imageHint?: string;
  likes: number;
  comments: number;
}

export interface CommunityItineraryPost extends CommunityPostBase {
  type: 'ITINERARY';
  trip: Trip;
}

export interface CommunityStoryPost extends CommunityPostBase {
  type: 'STORY' | 'TIP' | 'EXPERIENCE';
}

export type CommunityPost = CommunityItineraryPost | CommunityStoryPost;

'use client';

import * as React from 'react';
import {
  Search,
  ListFilter,
  ArrowUpDown,
  Users,
} from 'lucide-react';
import { sampleTrips, sampleUser } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CommunityTripCard } from '@/components/community/community-trip-card';
import { EmptyState } from '@/components/community/empty-state';
import type { Trip, User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

// Mock function to get creator for a trip
const getTripCreator = (userId: string): User => {
  // In a real app, you'd fetch this from your user data
  return sampleUser;
};

export default function CommunityPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortOption, setSortOption] = React.useState('popular');
  const [publicTrips, setPublicTrips] = React.useState<Trip[]>([]);

  React.useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const filtered = sampleTrips.filter((trip) => trip.isPublic);
      setPublicTrips(filtered);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTrips = React.useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    
    let filtered = publicTrips.filter(
      (trip) =>
        trip.tripName.toLowerCase().includes(lowercasedQuery) ||
        trip.stops.some((stop) =>
          stop.city.toLowerCase().includes(lowercasedQuery)
        )
    );

    // Add sorting logic here based on sortOption
    // For now, this is a placeholder
    if (sortOption === 'newest') {
      filtered.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortOption === 'popular') {
      // Placeholder for popularity logic
      filtered.sort((a,b) => b.stops.length - a.stops.length);
    }


    return filtered;
  }, [searchQuery, publicTrips, sortOption]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <Users className="h-8 w-8" /> Community Hub
        </h1>
        <p className="text-muted-foreground">
          Discover, explore, and get inspired by shared itineraries from the GlobeTrotter community.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-card border rounded-xl shadow-sm">
        <div className="relative w-full md:w-1/2 lg:w-2/5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search city, country, theme (e.g. beach)"
            className="pl-10 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full">
            <ListFilter className="h-5 w-5 text-muted-foreground" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder="Group by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="destination">Destination</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                 <SelectItem value="budget">Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 w-full">
            <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="copied">Most Copied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                <Skeleton className="h-[225px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
          ))}
        </div>
      ) : filteredTrips.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map((trip) => (
            <CommunityTripCard
              key={trip.id}
              trip={trip}
              creator={getTripCreator(trip.userId)}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

'use client';

import * as React from 'react';
import {
  Search,
  ListFilter,
  ArrowUpDown,
  List,
  LayoutGrid,
} from 'lucide-react';
import { sampleTrips } from '@/lib/placeholder-data';
import type { Trip } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TripCard } from '@/components/dashboard/trip-card';
import { getTripStatus, type TripStatus } from '@/lib/utils';
import { EmptyState } from '@/components/dashboard/empty-state';

const statusConfig: Record<
  TripStatus,
  { label: string; color: string; emoji: string }
> = {
  Ongoing: { label: 'Ongoing', color: 'text-green-400', emoji: '🟢' },
  Upcoming: { label: 'Upcoming', color: 'text-yellow-400', emoji: '🟡' },
  Completed: { label: 'Completed', color: 'text-blue-400', emoji: '🔵' },
  Draft: { label: 'Saved / Draft', color: 'text-gray-400', emoji: '⭐' },
};

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortOption, setSortOption] = React.useState('start-date-desc');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const categorizedTrips = React.useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    const filtered = sampleTrips.filter(
      (trip) =>
        trip.tripName.toLowerCase().includes(lowercasedQuery) ||
        trip.stops.some((stop) =>
          stop.city.toLowerCase().includes(lowercasedQuery)
        )
    );

    const sorted = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'start-date-asc':
          return a.startDate.getTime() - b.startDate.getTime();
        case 'name-asc':
          return a.tripName.localeCompare(b.tripName);
        case 'name-desc':
          return b.tripName.localeCompare(a.tripName);
        case 'start-date-desc':
        default:
          return b.startDate.getTime() - a.startDate.getTime();
      }
    });

    const groups: Record<TripStatus, Trip[]> = {
      Ongoing: [],
      Upcoming: [],
      Completed: [],
      Draft: [],
    };

    sorted.forEach((trip) => {
      const status = getTripStatus(trip.startDate, trip.endDate, trip.isPublic);
      if (groups[status]) {
        groups[status].push(trip);
      }
    });

    return groups;
  }, [searchQuery, sortOption]);
  
  const totalTrips = sampleTrips.length;

  if (totalTrips === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-card border rounded-xl shadow-sm">
        <div className="relative w-full md:w-1/2 lg:w-2/5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search trips, cities, or dates..."
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
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="destination">Destination</SelectItem>
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
                <SelectItem value="start-date-desc">Start Date (Newest)</SelectItem>
                <SelectItem value="start-date-asc">Start Date (Oldest)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}><LayoutGrid /></Button>
           <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}><List /></Button>
        </div>
      </div>

      <div className="space-y-10">
        {(Object.keys(categorizedTrips) as TripStatus[]).map((status) => {
          if (categorizedTrips[status].length > 0) {
            const config = statusConfig[status];
            return (
              <section key={status}>
                <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
                  <span className={config.color}>{config.emoji}</span>
                  {config.label}
                  <span className="text-lg font-light text-muted-foreground">({categorizedTrips[status].length})</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categorizedTrips[status].map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </section>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

'use client';

import { PlusCircle } from 'lucide-react';
import type { Trip } from '@/lib/types';
import { Button } from '../ui/button';
import { StopCard } from './stop-card';

interface ItineraryViewProps {
  trip: Trip;
}

export function ItineraryView({ trip }: ItineraryViewProps) {
  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add City
        </Button>
      </div>
      <div className="space-y-6">
        {trip.stops.map((stop) => (
          <StopCard key={stop.id} stop={stop} />
        ))}
         {trip.stops.length === 0 && (
            <div className="text-center py-12 px-6 bg-card rounded-lg border border-dashed">
                <h3 className="text-xl font-semibold font-headline">Your Itinerary is Empty</h3>
                <p className="text-muted-foreground mt-2">Start by adding a city to your trip.</p>
            </div>
        )}
      </div>
    </div>
  );
}

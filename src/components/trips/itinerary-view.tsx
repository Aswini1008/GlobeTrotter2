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
      <div className="space-y-6">
        {trip.stops.map((stop) => (
          <StopCard key={stop.id} stop={stop} />
        ))}
        {trip.stops.length === 0 && (
          <div className="text-center py-12 px-6 bg-card rounded-lg border-2 border-dashed">
            <h3 className="text-xl font-semibold font-headline">
              Your Itinerary is Empty
            </h3>
            <p className="text-muted-foreground mt-2">
              Start by adding a city to your trip.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Button variant="outline" className="w-full max-w-md py-6 text-lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add another Section
        </Button>
      </div>
    </div>
  );
}

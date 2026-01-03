import { TripCard } from '@/components/dashboard/trip-card';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Button } from '@/components/ui/button';
import { sampleTrips } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function TripsPage() {
  const trips = sampleTrips;

  if (trips.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Trips
          </h1>
          <p className="text-muted-foreground">
            All your adventures, in one place.
          </p>
        </div>
        <Link href="/trips/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Plan New Trip
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

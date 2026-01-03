import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { sampleTrips, sampleUser } from '@/lib/placeholder-data';
import { TripCard } from '@/components/dashboard/trip-card';
import { EmptyState } from '@/components/dashboard/empty-state';

export default function DashboardPage() {
  const hasTrips = sampleTrips.length > 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Welcome back, {sampleUser.firstName}!
          </h1>
          <p className="text-muted-foreground">Here are your upcoming adventures.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/trips/new">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Plan New Trip
            </Button>
          </Link>
        </div>
      </div>
      {hasTrips ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sampleTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}

import Link from 'next/link';
import { Map, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <Map className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight font-headline">
          You have no trips yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Start planning your next adventure. Create a trip to add cities,
          activities, and manage your budget.
        </p>
        <Link href="/trips/new">
          <Button className="mt-4 bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Plan New Trip
          </Button>
        </Link>
      </div>
    </div>
  );
}

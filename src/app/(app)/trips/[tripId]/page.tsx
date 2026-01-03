import Link from 'next/link';
import { ChevronLeft, Share2 } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ItineraryView } from '@/components/trips/itinerary-view';
import { BudgetView } from '@/components/trips/budget-view';
import { TimelineView } from '@/components/trips/timeline-view';
import { sampleTrips } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';

export default function TripDetailsPage({
  params,
}: {
  params: { tripId: string };
}) {
  const trip = sampleTrips.find((t) => t.id === params.tripId);

  if (!trip) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
            {trip.tripName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/public/trips/${trip.id}`} target="_blank">
             <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="itinerary" className="mt-6 flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary" className="flex-grow">
          <ItineraryView trip={trip} />
        </TabsContent>
        <TabsContent value="budget" className="flex-grow">
          <BudgetView trip={trip} />
        </TabsContent>
        <TabsContent value="timeline" className="flex-grow">
          <TimelineView trip={trip} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

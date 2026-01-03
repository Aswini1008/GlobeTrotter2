'use client';

import Link from 'next/link';
import {
  ChevronLeft,
  Copy,
  Users,
  Calendar,
  MapPin,
  Heart,
} from 'lucide-react';
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
import { sampleTrips, sampleUser } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PublicTripDetailsPage({
  params,
}: {
  params: { tripId: string };
}) {
  const { toast } = useToast();
  const trip = sampleTrips.find((t) => t.id === params.tripId);
  const creator = sampleUser; // In a real app, fetch creator info based on trip.userId

  if (!trip || !trip.isPublic) {
    notFound();
  }

  const handleCopyTrip = () => {
    // Logic to copy trip to the current user's account
    toast({
      title: 'Trip Copied!',
      description: `"${trip.tripName}" has been added to your trips.`,
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-card border-b p-4 flex items-center justify-between">
        <Link href="/community">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={handleCopyTrip} size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Copy to My Trips
          </Button>
        </div>
      </header>
      <main className="p-4 lg:p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <CardTitle className="font-headline text-3xl">
                  {trip.tripName}
                </CardTitle>
                <CardDescription className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={creator.photoURL}
                        alt={`${creator.firstName} ${creator.lastName}`}
                      />
                      <AvatarFallback>
                        {creator.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      By {creator.firstName} {creator.lastName}
                    </span>
                  </div>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(trip.startDate, 'MMM d, yyyy')} -{' '}
                    {format(trip.endDate, 'MMM d, yyyy')}
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Public Itinerary
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="itinerary" className="flex-grow flex flex-col">
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
      </main>
    </div>
  );
}

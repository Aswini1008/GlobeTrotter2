import { notFound } from 'next/navigation';
import { sampleTrips } from '@/lib/placeholder-data';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobeTrotterLogo } from '@/components/icons';

export default function PublicTripPage({
  params,
}: {
  params: { tripId: string };
}) {
  const trip = sampleTrips.find((t) => t.id === params.tripId);

  if (!trip || !trip.isPublic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-semibold">
            <GlobeTrotterLogo className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl">GlobeTrotter</span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <Users className="h-3 w-3" />
            Public Trip
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={trip.imageUrl}
            alt={trip.description}
            data-ai-hint={trip.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-headline">
              {trip.tripName}
            </h1>
            <div className="flex items-center gap-2 text-base text-white/90 mt-2">
              <Calendar className="h-4 w-4" />
              <span>
                {format(trip.startDate, 'MMM d')} -{' '}
                {format(trip.endDate, 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {trip.stops.map((stop) => (
            <Card key={stop.id} className="overflow-hidden shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <MapPin className="text-primary h-6 w-6" />
                  {stop.city}
                </CardTitle>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(stop.startDate, 'MMM d')} -{' '}
                    {format(stop.endDate, 'MMM d, yyyy')}
                  </span>
                </p>
              </CardHeader>
              <CardContent>
                {stop.activities.length > 0 ? (
                  <ul className="space-y-3">
                    {stop.activities.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex items-center gap-4"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                           <span className="text-primary font-bold text-sm">
                            ${activity.estimatedCost}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.duration}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No activities planned for this stop.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
       <footer className="py-8 text-center text-muted-foreground text-sm">
          <p>Shared from GlobeTrotter - Your adventure awaits.</p>
        </footer>
    </div>
  );
}

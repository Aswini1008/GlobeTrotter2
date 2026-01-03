import { ItineraryView } from '@/components/trips/itinerary-view';
import { sampleTrips } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { GlobeTrotterLogo } from '@/components/icons';
import { format } from 'date-fns';
import { Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    <div className="bg-background min-h-screen">
      <header className="py-4 px-6 md:px-10 flex items-center justify-between border-b">
         <div className="flex items-center gap-2 font-semibold">
            <GlobeTrotterLogo className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl">GlobeTrotter</span>
          </div>
      </header>
      <main className="max-w-5xl mx-auto p-4 md:p-8">
         <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-2xl mb-8">
             <Image
              src={trip.imageUrl}
              alt={trip.description}
              data-ai-hint={trip.imageHint}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline drop-shadow-lg">{trip.tripName}</h1>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm drop-shadow-md">
                        <Calendar className="h-4 w-4" />
                        <span>
                            {format(trip.startDate, 'MMM d')} -{' '}
                            {format(trip.endDate, 'MMM d, yyyy')}
                        </span>
                    </div>
                    {trip.isPublic && (
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-white/20 text-white backdrop-blur-sm border-white/50"
                    >
                        <Users className="h-3 w-3" />
                        Public
                    </Badge>
                    )}
                </div>
            </div>
         </div>

        <ItineraryView trip={trip} />
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        <p>This itinerary was created with GlobeTrotter.</p>
      </footer>
    </div>
  );
}

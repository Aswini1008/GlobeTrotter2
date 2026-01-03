import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, DollarSign, Clock, Users } from 'lucide-react';
import { sampleTrips } from '@/lib/placeholder-data';
import { GlobeTrotterLogo } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function PublicTripPage({
  params,
}: {
  params: { tripId: string };
}) {
  const trip = sampleTrips.find((t) => t.id === params.tripId && t.isPublic);

  if (!trip) {
    notFound();
  }
  
  const totalCost = trip.stops.reduce(
    (acc, stop) =>
      acc +
      stop.activities.reduce((sum, activity) => sum + activity.estimatedCost, 0),
    0
  );

  return (
    <div className="bg-background min-h-screen">
      <header className="py-4 px-6 md:px-10 border-b">
         <div className="flex items-center gap-2">
            <GlobeTrotterLogo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">GlobeTrotter</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6 md:p-10">
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
             <Image
              src={trip.imageUrl}
              alt={trip.description}
              data-ai-hint={trip.imageHint}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"/>
             <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-4xl md:text-5xl font-bold font-headline">{trip.tripName}</h2>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-4 rounded-lg flex items-center gap-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Dates</p>
                    <p className="font-semibold">{format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d, yyyy')}</p>
                </div>
            </div>
             <div className="bg-card p-4 rounded-lg flex items-center gap-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <p className="font-semibold">${totalCost.toLocaleString()}</p>
                </div>
            </div>
             <div className="bg-card p-4 rounded-lg flex items-center gap-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Trip by</p>
                    <p className="font-semibold">Alex Doe</p>
                </div>
            </div>
        </div>
        
        <Separator className="my-8" />

        <div>
          <h3 className="text-3xl font-bold font-headline mb-6">Itinerary</h3>
          <div className="space-y-8">
            {trip.stops.map((stop) => (
              <div key={stop.id}>
                <h4 className="text-2xl font-semibold font-headline text-primary">{stop.city}</h4>
                <p className="text-muted-foreground mb-4">{format(stop.startDate, 'MMM d')} - {format(stop.endDate, 'MMM d')}</p>
                <div className="space-y-4 border-l-2 border-primary/50 pl-6 ml-1">
                  {stop.activities.map((activity) => (
                     <div key={activity.id} className="relative">
                        <div className="absolute -left-[30px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                        <p className="font-semibold">{activity.title}</p>
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {activity.estimatedCost.toLocaleString()}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {activity.duration}</span>
                        </div>
                     </div>
                  ))}
                   {stop.activities.length === 0 && (
                        <p className="text-muted-foreground text-sm">No activities planned.</p>
                   )}
                </div>
              </div>
            ))}
            {trip.stops.length === 0 && (
                <div className="text-center py-10 bg-card rounded-lg border-dashed border">
                    <p className="text-muted-foreground">This itinerary is currently empty.</p>
                </div>
            )}
          </div>
        </div>
      </main>
       <footer className="text-center py-6 text-muted-foreground text-sm border-t">
          <p>Powered by GlobeTrotter</p>
      </footer>
    </div>
  );
}

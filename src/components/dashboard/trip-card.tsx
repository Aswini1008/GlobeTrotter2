import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Users, DollarSign, ArrowRight } from 'lucide-react';

import type { Trip } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const totalCost = trip.stops.reduce(
    (acc, stop) =>
      acc +
      stop.activities.reduce((sum, activity) => sum + activity.estimatedCost, 0),
    0
  );
  const budgetProgress = (totalCost / trip.totalBudget) * 100;
  const isOverBudget = budgetProgress > 100;

  return (
    <Card className="flex flex-col overflow-hidden h-full transform hover:scale-[1.02] transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
      <Link href={`/trips/${trip.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={trip.imageUrl}
              alt={trip.description}
              data-ai-hint={trip.imageHint}
              fill
              className="object-cover"
            />
            {trip.isPublic && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 flex items-center gap-1"
              >
                <Users className="h-3 w-3" />
                Public
              </Badge>
            )}
          </div>
          <div className="p-4">
            <CardTitle className="font-headline text-xl mb-1">{trip.tripName}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>
                {format(trip.startDate, 'MMM d')} -{' '}
                {format(trip.endDate, 'MMM d, yyyy')}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">
                        ${totalCost.toLocaleString()} / ${trip.totalBudget.toLocaleString()}
                    </span>
                </div>
                <Progress value={budgetProgress} className={isOverBudget ? '[&>div]:bg-destructive' : ''} />
                {isOverBudget && <p className="text-xs text-destructive text-right">Over budget!</p>}
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end">
            <div className="text-primary font-semibold flex items-center gap-1">
              View Itinerary <ArrowRight className="h-4 w-4" />
            </div>
        </CardFooter>
      </Link>
    </Card>
  );
}

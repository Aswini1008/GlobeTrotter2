import Image from 'next/image';
import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import { Calendar, Users, BarChart, Clock, Eye, Edit3 } from 'lucide-react';

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
import { getTripStatus, type TripStatus } from '@/lib/utils';
import { Button } from '../ui/button';

interface TripCardProps {
  trip: Trip;
}

const statusConfig: Record<
  TripStatus,
  { label: string; color: string; badgeVariant: 'default' | 'secondary' | 'outline' }
> = {
  Ongoing: { label: 'Ongoing', color: 'bg-green-500/20 text-green-500 border-green-500/30', badgeVariant: 'outline' },
  Upcoming: { label: 'Upcoming', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30', badgeVariant: 'outline' },
  Completed: { label: 'Completed', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30', badgeVariant: 'outline' },
  Draft: { label: 'Draft', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', badgeVariant: 'secondary' },
};

const StatusBadge = ({ status }: { status: TripStatus }) => {
  const config = statusConfig[status];
  return (
    <Badge variant={config.badgeVariant} className={config.color}>
      {config.label}
    </Badge>
  );
};

const TripInfo = ({ trip, status }: { trip: Trip, status: TripStatus }) => {
    const today = new Date();
    if (status === 'Ongoing') {
        const totalDays = differenceInDays(trip.endDate, trip.startDate) + 1;
        const currentDay = differenceInDays(today, trip.startDate) + 1;
        const progress = (currentDay / totalDays) * 100;
        return (
            <div className="space-y-1">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Day {currentDay} of {totalDays}</span>
                </div>
                <Progress value={progress} />
            </div>
        )
    }
    if (status === 'Upcoming') {
        const daysToGo = differenceInDays(trip.startDate, today);
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4"/>
                <span>{daysToGo > 0 ? `${daysToGo} days to go` : 'Starts today!'}</span>
            </div>
        )
    }
    if (status === 'Completed') {
         const duration = differenceInDays(trip.endDate, trip.startDate) + 1;
         return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart className="h-4 w-4"/>
                <span>{duration} Days Travelled</span>
            </div>
         )
    }
    return (
        <p className="text-sm text-muted-foreground">This trip is currently a draft.</p>
    );
}


export function TripCard({ trip }: TripCardProps) {
  const tripStatus = getTripStatus(trip.startDate, trip.endDate, trip.isPublic);

  return (
    <Card className="flex flex-col overflow-hidden h-full transform hover:scale-[1.02] transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl group">
      <Link href={`/trips/${trip.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={trip.imageUrl}
              alt={trip.tripName}
              data-ai-hint={trip.imageHint}
              fill
              className="object-cover"
            />
             <div className="absolute top-2 right-2">
                <StatusBadge status={tripStatus} />
             </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-3">
            <CardTitle className="font-headline text-xl leading-tight">{trip.tripName}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>
                {format(trip.startDate, 'd MMM')} - {format(trip.endDate, 'd MMM, yyyy')}
              </span>
            </CardDescription>
             <p className="text-sm text-muted-foreground line-clamp-2">
                {trip.description}
            </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col items-start gap-4">
            <TripInfo trip={trip} status={tripStatus} />
            {tripStatus === 'Completed' ? (
                 <Button variant="outline" className="w-full mt-2">
                    <Eye className="mr-2 h-4 w-4" /> View Memories
                 </Button>
            ) : tripStatus === 'Draft' ? (
                 <Button variant="secondary" className="w-full mt-2">
                    <Edit3 className="mr-2 h-4 w-4" /> Continue Planning
                 </Button>
            ) : null}
        </CardFooter>
      </Link>
    </Card>
  );
}

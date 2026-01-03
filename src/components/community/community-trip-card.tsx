'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Copy,
  Heart,
  MessageCircle,
  Bookmark,
  Calendar,
  MapPin,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import type { Trip, User } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CommunityTripCardProps {
  trip: Trip;
  creator: User;
}

export function CommunityTripCard({ trip, creator }: CommunityTripCardProps) {
  const { toast } = useToast();
  const tripDuration =
    (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 3600 * 24) + 1;

  const totalCost = trip.stops.reduce(
    (acc, stop) =>
      acc +
      stop.activities.reduce((sum, activity) => sum + activity.estimatedCost, 0),
    0
  );

  const budgetCategory = () => {
    const costPerDay = totalCost / tripDuration;
    if (costPerDay < 100) return 'Budget';
    if (costPerDay < 250) return 'Mid-Range';
    return 'Luxury';
  };

  const handleCopyTrip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: 'Trip Copied!',
      description: `"${trip.tripName}" has been added to your trips.`,
    });
  };

  const routePreview = trip.stops.map(s => s.city.split(',')[0]).slice(0, 3).join(' → ');
  const moreStops = trip.stops.length > 3 ? ` +${trip.stops.length - 3} more` : '';

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 group">
      <CardHeader className="flex-row gap-3 items-center">
        <Avatar>
          <AvatarImage
            src={creator.photoURL}
            alt={`${creator.firstName} ${creator.lastName}`}
          />
          <AvatarFallback>{creator.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="font-semibold">
            {creator.firstName} {creator.lastName}
          </p>
          <p className="text-xs text-muted-foreground">
            Shared {formatDistanceToNow(trip.createdAt, { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <div className="relative h-48 w-full">
           <Image
              src={trip.imageUrl}
              alt={trip.description}
              data-ai-hint={trip.imageHint}
              fill
              className="object-cover"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
         <div className="p-4 space-y-3">
          <h3 className="text-xl font-bold font-headline leading-tight truncate">{trip.tripName}</h3>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <p className="truncate">{routePreview}{moreStops}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary">{tripDuration} Days</Badge>
            <Badge variant="outline">{budgetCategory()}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start gap-4">
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                </Button>
            </div>
            <Button variant="secondary" size="sm" onClick={handleCopyTrip}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
        </div>
         <Link href={`/public/trips/${trip.id}`} className={cn(buttonVariants({ variant: 'default' }), 'w-full')} >
            View Itinerary <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </CardFooter>
    </Card>
  );
}

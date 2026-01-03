'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Copy,
  Heart,
  MessageCircle,
  Bookmark,
  MapPin,
  ArrowRight,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import type { CommunityPost, CommunityItineraryPost } from '@/lib/types';
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
  post: CommunityPost & { creator: { firstName: string; lastName: string; photoURL?: string } };
}

const ItineraryContent = ({ trip }: { trip: CommunityItineraryPost['trip'] }) => {
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

  const routePreview = trip.stops.map(s => s.city.split(',')[0]).slice(0, 3).join(' → ');
  const moreStops = trip.stops.length > 3 ? ` +${trip.stops.length - 3} more` : '';

  return (
    <>
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
    </>
  );
};

const TextContent = ({ post }: { post: CommunityPost }) => {
  const Icon = post.type === 'TIP' ? Lightbulb : Sparkles;
  return (
    <div className="p-4 space-y-3">
      {post.imageUrl && (
        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.text?.substring(0, 50) || 'Community post image'}
            data-ai-hint={post.imageHint}
            fill
            className="object-cover"
          />
        </div>
      )}
      <p className="text-base font-serif italic text-foreground/80">"{post.text}"</p>
      {post.city && (
        <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <p className="truncate">{post.city}, {post.country}</p>
        </div>
      )}
    </div>
  )
}

export function CommunityTripCard({ post }: CommunityTripCardProps) {
  const { toast } = useToast();
  const { creator } = post;

  const handleCopyTrip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.type !== 'ITINERARY') return;
    toast({
      title: 'Trip Copied!',
      description: `"${post.trip.tripName}" has been added to your trips.`,
    });
  };
  
  const cardLink = post.type === 'ITINERARY' ? `/public/trips/${post.trip.id}` : '#';

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
            Shared {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        {post.type === 'ITINERARY' ? <ItineraryContent trip={post.trip} /> : <TextContent post={post} />}
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
          {post.type === 'ITINERARY' && (
            <Button variant="secondary" size="sm" onClick={handleCopyTrip}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </div>
        {post.type === 'ITINERARY' && (
          <Link href={cardLink} className={cn(buttonVariants({ variant: 'default' }), 'w-full')}>
            View Itinerary <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

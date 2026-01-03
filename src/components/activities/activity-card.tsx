'use client';

import Image from 'next/image';
import { PlusCircle, Star, Clock, Tag, DollarSign } from 'lucide-react';
import type { SearchableActivity } from '@/lib/sample-activities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ActivityCardProps {
  activity: SearchableActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { toast } = useToast();

  const handleAdd = () => {
    // Here you would typically open a dialog to select the day
    toast({
      title: 'Activity Added!',
      description: `"${activity.name}" has been added to your trip.`,
    });
  };

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50">
      <div className="relative h-48 md:h-auto md:w-1/3">
        <Image
          src={activity.imageUrl}
          alt={activity.name}
          data-ai-hint={activity.imageHint}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <CardHeader className="pb-3">
          <h3 className="font-bold text-lg font-headline">{activity.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
            <span>{activity.rating}</span>
            <span className="text-xs">({activity.reviews} reviews)</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-4">
          <p className="text-sm text-muted-foreground mb-4">
            {activity.description}
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" /> {activity.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {activity.duration}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
               <DollarSign className="h-3 w-3" /> {activity.cost}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
          <div className="font-semibold">
            <span className="text-xl">${activity.estimatedCost}</span>
            <span className="text-sm text-muted-foreground"> / person</span>
          </div>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add to Trip
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

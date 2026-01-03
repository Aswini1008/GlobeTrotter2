'use client';

import Image from 'next/image';
import { PlusCircle, Star, Clock, Tag, CheckCircle } from 'lucide-react';
import type { SearchableActivity } from '@/lib/sample-activities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: SearchableActivity;
  isAdded: boolean;
  onAdd: () => void;
}

export function ActivityCard({ activity, isAdded, onAdd }: ActivityCardProps) {
  const isRecommended = activity.rating >= 4.8;
  const isPopular = activity.reviews > 1500;

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 relative">
      {(isRecommended || isPopular) && (
        <Badge 
          variant={isRecommended ? 'default' : 'secondary'} 
          className="absolute top-3 left-3 z-10"
        >
          {isRecommended ? 'Recommended' : 'Popular'}
        </Badge>
      )}
      <div className="relative h-56 md:h-auto md:w-5/12 lg:w-1/3">
        <Image
          src={activity.imageUrl}
          alt={activity.name}
          data-ai-hint={activity.imageHint}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between p-5">
        <div>
          <h3 className="font-bold text-lg font-headline leading-tight">{activity.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
            <span>{activity.rating}</span>
            <span className="text-xs">({activity.reviews} reviews)</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 line-clamp-1">
            {activity.description}
          </p>
          <div className="flex flex-wrap gap-2 text-xs mt-4">
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <Tag className="h-3 w-3" /> {activity.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {activity.duration}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="font-semibold">
            <span className="text-2xl">${activity.estimatedCost}</span>
            <span className="text-sm text-muted-foreground"> / person</span>
          </div>
          <Button onClick={onAdd} disabled={isAdded} className={cn(
              'bg-accent text-accent-foreground hover:bg-accent/90 w-32',
              isAdded && 'bg-green-600 hover:bg-green-700'
          )}>
            {isAdded ? (
                <><CheckCircle className="mr-2 h-4 w-4" /> Added</>
            ) : (
                <><PlusCircle className="mr-2 h-4 w-4" /> Add to Trip</>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

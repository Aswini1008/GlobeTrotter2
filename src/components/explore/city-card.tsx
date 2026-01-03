import Image from 'next/image';
import { Plus, Clock, BarChart } from 'lucide-react';
import type { Destination } from '@/lib/sample-destinations';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';

interface CityCardProps {
  destination: Destination;
}

export function CityCard({ destination }: CityCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transform hover:scale-[1.02] transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl group">
      <div className="relative h-48 w-full">
        <Image
          src={destination.imageUrl}
          alt={destination.city}
          data-ai-hint={`${destination.city} ${destination.country}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <CardTitle className="font-headline text-xl text-white">
            {destination.city}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {destination.country}
          </CardDescription>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              <strong>Best time:</strong> {destination.bestTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>
              <strong>Budget:</strong> {destination.budget}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add to Trip
        </Button>
      </CardFooter>
    </Card>
  );
}

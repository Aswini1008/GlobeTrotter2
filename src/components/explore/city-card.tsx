'use client';

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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

interface CityCardProps {
  destination: Destination;
}

export function CityCard({ destination }: CityCardProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000 + Math.random() * 1000, stopOnInteraction: true })
  );

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl group hover:scale-[1.02]">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {destination.imageUrls.map((url, index) => (
            <CarouselItem key={index}>
              <div className="relative h-48 w-full">
                <Image
                  src={url}
                  alt={`${destination.city} view ${index + 1}`}
                  data-ai-hint={`${destination.city} ${destination.country}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-4">
          <CardTitle className="font-headline text-xl text-white drop-shadow-md">
            {destination.city}
          </CardTitle>
          <CardDescription className="text-gray-200 drop-shadow-md">
            {destination.country}
          </CardDescription>
        </div>
      </Carousel>
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

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sampleTrips, sampleUser } from '@/lib/placeholder-data';
import {
  ArrowRight,
  Map,
  PlusCircle,
  PiggyBank,
  Heart,
  Compass,
  Search,
  ArrowUpDown,
  ListFilter,
} from 'lucide-react';
import Link from 'next/link';
import { HeroBanner } from '@/components/home/hero-banner';
import { TripCard } from '@/components/dashboard/trip-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Trip } from '@/lib/types';

const quickActions = [
  {
    href: '/trips/new',
    icon: PlusCircle,
    label: 'Plan New Trip',
  },
  {
    href: '/trips',
    icon: Heart,
    label: 'Saved Trips',
  },
  {
    href: '#',
    icon: PiggyBank,
    label: 'Budget Planner',
  },
  {
    href: '/explore',
    icon: Compass,
    label: 'Explore Cities',
  },
];

const initialPopularDestinations = [
  {
    city: 'Tokyo, Japan',
    image: {
      imageUrl: 'https://picsum.photos/seed/tokyo/600/400',
      imageHint: 'tokyo japan',
      description: 'Tokyo',
    },
    budget: '1500',
  },
  {
    city: 'Santorini, Greece',
    image: {
      imageUrl: 'https://picsum.photos/seed/greece/600/400',
      imageHint: 'greece santorini',
      description: 'Santorini',
    },
    budget: '2200',
  },
  {
    city: 'New York, USA',
    image: {
      imageUrl: 'https://picsum.photos/seed/nyc/600/400',
      imageHint: 'new york city',
      description: 'NYC',
    },
    budget: '1800',
  },
  {
    city: 'Bali, Indonesia',
    image: {
      imageUrl: 'https://picsum.photos/seed/bali/600/400',
      imageHint: 'bali indonesia',
      description: 'Bali',
    },
    budget: '1200',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredTrips, setFilteredTrips] = React.useState<Trip[]>(sampleTrips.slice(0, 3));
  const [filteredDestinations, setFilteredDestinations] = React.useState(initialPopularDestinations);
  
  React.useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    // Filter recent trips
    const filteredRecentTrips = sampleTrips
      .filter((trip) =>
        trip.tripName.toLowerCase().includes(lowercasedQuery) ||
        trip.stops.some(stop => stop.city.toLowerCase().includes(lowercasedQuery))
      )
      .slice(0, 3);
    setFilteredTrips(filteredRecentTrips);

    // Filter popular destinations
    const filteredPopularDestinations = initialPopularDestinations.filter(
      (destination) =>
        destination.city.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDestinations(filteredPopularDestinations);

  }, [searchQuery]);


  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <HeroBanner />

      <section className="px-0 md:px-0">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-card border rounded-xl shadow-sm -mt-4 md:-mt-8">
          <div className="relative w-full md:w-1/2 lg:w-2/5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search destinations, trips..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full">
              <ListFilter className="h-5 w-5 text-muted-foreground" />
              <Select>
                <SelectTrigger className="w-full md:w-[180px] h-11">
                  <SelectValue placeholder="Group by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="destination">Destination</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full">
              <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
              <Select>
                <SelectTrigger className="w-full md:w-[180px] h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="h-full flex flex-col items-center justify-center p-4 text-center hover:bg-muted/50 transition-colors duration-200 shadow-sm hover:shadow-md">
              <action.icon className="h-8 w-8 text-primary mb-2" />
              <p className="font-semibold text-sm">{action.label}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-headline">
            Popular Destinations
          </h2>
          <Button variant="link" asChild>
            <Link href="/explore">
              See All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {filteredDestinations.length > 0 ? (
        <Carousel
          opts={{
            align: 'start',
            loop: filteredDestinations.length > 1,
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredDestinations.map((dest) => (
              <CarouselItem
                key={dest.city}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
                  <div className="relative h-48 w-full">
                    <Image
                      src={dest.image?.imageUrl || ''}
                      alt={dest.image?.description || dest.city}
                      data-ai-hint={dest.image?.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">
                      {dest.city}
                    </CardTitle>
                    <CardDescription>
                      Starting from ${dest.budget}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No popular destinations found.</p>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-headline">Recent Trips</h2>
          <Button variant="link" asChild>
            <Link href="/trips">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {filteredTrips.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <Map className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Recent Trips</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your past adventures will appear here. No trips found matching your search.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

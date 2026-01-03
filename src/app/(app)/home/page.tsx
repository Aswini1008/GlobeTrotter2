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
    href: '#',
    icon: Compass,
    label: 'Explore Cities',
  },
];

const popularDestinations = [
  {
    city: 'Tokyo, Japan',
    image: PlaceHolderImages.find((img) => img.id === 'trip-4'), // Using existing placeholder
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
  const recentTrips = sampleTrips.slice(0, 3);
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <HeroBanner />

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
            <Link href="#">
              See All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {popularDestinations.map((dest) => (
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
        {recentTrips.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <Map className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Recent Trips</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your past adventures will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

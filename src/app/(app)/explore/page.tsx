import { sampleDestinations } from '@/lib/sample-destinations';
import { CityCard } from '@/components/explore/city-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Explore Destinations
        </h1>
        <p className="text-muted-foreground">
          Discover your next adventure from our curated list of popular cities.
        </p>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for a city..." className="pl-10 h-11" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleDestinations.map((destination) => (
          <CityCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}

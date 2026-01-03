'use client';

import * as React from 'react';
import { sampleDestinations } from '@/lib/sample-destinations';
import { CityCard } from '@/components/explore/city-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { Destination } from '@/lib/sample-destinations';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredDestinations = React.useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) {
      return sampleDestinations;
    }
    return sampleDestinations.filter(
      (destination) =>
        destination.city.toLowerCase().includes(lowercasedQuery) ||
        destination.country.toLowerCase().includes(lowercasedQuery) ||
        destination.tags.some((tag) =>
          tag.toLowerCase().includes(lowercasedQuery)
        )
    );
  }, [searchQuery]);

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
        <Input
          placeholder="Search for a city, country, or tag..."
          className="pl-10 h-11"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDestinations.map((destination) => (
          <CityCard key={destination.id} destination={destination} />
        ))}
      </div>
      {filteredDestinations.length === 0 && (
        <div className="text-center py-10 col-span-full">
            <p className="text-muted-foreground">No destinations found matching your search.</p>
        </div>
      )}
    </div>
  );
}

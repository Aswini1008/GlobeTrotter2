'use client';

import * as React from 'react';
import {
  Search,
  ListFilter,
  ArrowUpDown,
  Tag,
  Clock,
  DollarSign,
  X,
  Eye,
  Utensils,
  Mountain,
  Drama,
  Smile,
  MapPin,
} from 'lucide-react';
import {
  sampleActivities,
  type SearchableActivity,
  type ActivityCategory,
  type ActivityCost,
  type ActivityDuration,
} from '@/lib/sample-activities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ActivityCard } from '@/components/activities/activity-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const categories: { name: ActivityCategory; icon: React.ElementType }[] = [
  { name: 'Sightseeing', icon: Eye },
  { name: 'Food & Dining', icon: Utensils },
  { name: 'Adventure', icon: Mountain },
  { name: 'Culture', icon: Drama },
  { name: 'Relaxation', icon: Smile },
];
const costs: ActivityCost[] = ['Free', '$', '$$', '$$$'];
const durations: ActivityDuration[] = [
  '< 1 hour',
  '1-3 hours',
  'Half day',
  'Full day',
];

export default function ActivitySearchPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const [activities, setActivities] =
    React.useState<SearchableActivity[]>(sampleActivities);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortOption, setSortOption] = React.useState('rating');
  const [filters, setFilters] = React.useState<{
    category: ActivityCategory[];
    cost: ActivityCost[];
    duration: ActivityDuration[];
  }>({
    category: [],
    cost: [],
    duration: [],
  });

  const [addedActivities, setAddedActivities] = React.useState<Set<string>>(
    new Set()
  );

  React.useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setActivities(sampleActivities);
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (
    type: 'category' | 'cost' | 'duration',
    value: string
  ) => {
    setFilters((prev) => {
      const existing = prev[type] as string[];
      if (existing.includes(value)) {
        return { ...prev, [type]: existing.filter((item) => item !== value) };
      } else {
        return { ...prev, [type]: [...existing, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({ category: [], cost: [], duration: [] });
  };

  const filteredActivities = React.useMemo(() => {
    setIsLoading(true);
    const lowercasedQuery = searchQuery.toLowerCase();

    let filtered = activities.filter((activity) => {
      const matchesQuery =
        activity.name.toLowerCase().includes(lowercasedQuery) ||
        activity.description.toLowerCase().includes(lowercasedQuery) ||
        activity.category.toLowerCase().includes(lowercasedQuery);

      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(activity.category);
      const matchesCost =
        filters.cost.length === 0 || filters.cost.includes(activity.cost);
      const matchesDuration =
        filters.duration.length === 0 ||
        filters.duration.includes(activity.duration);

      return matchesQuery && matchesCategory && matchesCost && matchesDuration;
    });

    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_asc':
          return a.estimatedCost - b.estimatedCost;
        case 'price_desc':
          return b.estimatedCost - a.estimatedCost;
        case 'duration':
            const durationA = durations.indexOf(a.duration);
            const durationB = durations.indexOf(b.duration);
            return durationA - durationB;
        default:
          return 0;
      }
    });
    
    // Simulate loading for filter changes
    setTimeout(() => setIsLoading(false), 300);

    return filtered;
  }, [searchQuery, activities, sortOption, filters]);

  const activeFilterCount = Object.values(filters).reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  
  const handleAddActivity = (activity: SearchableActivity) => {
    setAddedActivities(prev => new Set(prev.add(activity.id)));
    toast({
        title: 'Activity Added!',
        description: `"${activity.name}" has been added to your trip.`,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Activities in Paris
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
            <span className='flex items-center gap-1.5'><MapPin className='h-4 w-4' /> Paris, France</span>
        </div>
        <p className="text-muted-foreground mt-1">
          Handpicked experiences curated for your trip.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 items-start">
        {/* Filter Panel */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 hidden lg:block">
          <div className="p-4 bg-card border rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-headline flex items-center gap-2">
                <ListFilter className="h-5 w-5" /> Filters
              </h3>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                     <Button
                      key={cat.name}
                      variant={filters.category.includes(cat.name) ? 'secondary' : 'ghost'}
                      className="w-full justify-start gap-2"
                      onClick={() => handleFilterChange('category', cat.name)}
                    >
                      <cat.icon className="h-4 w-4" />
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cost Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Cost</h4>
                 <div className="flex items-center gap-2">
                  {costs.map((cost) => (
                     <Button
                      key={cost}
                      variant={filters.cost.includes(cost) ? 'secondary' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => handleFilterChange('cost', cost)}
                    >
                      {cost}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Duration</h4>
                <div className="grid grid-cols-2 gap-2">
                  {durations.map((dur) => (
                    <Button
                      key={dur}
                      variant={filters.duration.includes(dur) ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('duration', dur)}
                      className="text-xs px-2 h-8"
                    >
                      {dur}
                    </Button>
                  ))}
                </div>
              </div>
                
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full mt-4">
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 p-4 bg-card border rounded-xl shadow-sm">
            <div className="relative w-full md:w-auto md:flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search landmarks, tours, food, experiences..."
                className="pl-10 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full">
                <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full md:w-[180px] h-11">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Recommended</SelectItem>
                    <SelectItem value="price_asc">Price: Low-High</SelectItem>
                    <SelectItem value="price_desc">Price: High-Low</SelectItem>
                    <SelectItem value="duration">Shortest Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="flex flex-col md:flex-row overflow-hidden">
                    <Skeleton className="h-48 md:h-auto md:w-1/3" />
                    <div className="flex flex-col flex-1 p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-10 w-full" />
                       <div className="flex items-center justify-between pt-4">
                         <Skeleton className="h-8 w-1/4" />
                         <Skeleton className="h-10 w-1/3" />
                       </div>
                    </div>
                  </Card>
                ))
              : filteredActivities.length > 0
              ? filteredActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} isAdded={addedActivities.has(activity.id)} onAdd={() => handleAddActivity(activity)} />
                ))
              : (
                  <div className="text-center py-16 rounded-lg border-2 border-dashed">
                      <h3 className="text-xl font-semibold">No Activities Found</h3>
                      <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

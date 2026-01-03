'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ListFilter,
  ArrowUpDown,
  MapPin,
} from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';

import { sampleTrips } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Trip } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredTrips, setFilteredTrips] = React.useState<Trip[]>(sampleTrips);

  React.useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = sampleTrips.filter(
      (trip) =>
        trip.tripName.toLowerCase().includes(lowercasedQuery) ||
        trip.stops.some((stop) =>
          stop.city.toLowerCase().includes(lowercasedQuery)
        )
    );
    setFilteredTrips(filtered);
  }, [searchQuery]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const tripsInMonth = filteredTrips.filter((trip) => {
    const tripInterval = { start: trip.startDate, end: trip.endDate };
    const monthInterval = { start: monthStart, end: monthEnd };
    return (
      isWithinInterval(trip.startDate, monthInterval) ||
      isWithinInterval(trip.endDate, monthInterval) ||
      isWithinInterval(monthStart, tripInterval) ||
      isWithinInterval(monthEnd, tripInterval)
    );
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Calendar View
        </h1>
        <p className="text-muted-foreground">
          Your travel plans at a glance.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="font-headline text-2xl">
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search trips..."
                className="pl-10 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-11">
                <ListFilter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Select>
                <SelectTrigger className="w-[180px] h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px border-t border-l bg-border">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold py-2 bg-card text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {days.map((day) => (
              <div
                key={day.toString()}
                className={cn(
                  'relative h-24 md:h-32 p-2 bg-card border-b border-r',
                  !isSameMonth(day, currentMonth) && 'bg-muted/50'
                )}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={cn(
                    'font-medium',
                    isSameDay(day, new Date()) &&
                      'flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'
                  )}
                >
                  {format(day, 'd')}
                </time>
                <div className="absolute inset-x-0 top-9 space-y-1 px-1">
                  <TooltipProvider>
                    {tripsInMonth
                      .filter((trip) => isSameDay(day, trip.startDate))
                      .map((trip) => (
                        <Tooltip key={trip.id}>
                          <TooltipTrigger asChild>
                            <Link href={`/trips/${trip.id}`}>
                              <div className="text-xs text-white bg-primary rounded-md p-1 truncate cursor-pointer hover:opacity-80">
                                {trip.tripName}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{trip.tripName}</p>
                            <p className="text-muted-foreground">
                              {format(trip.startDate, 'MMM d')} -{' '}
                              {format(trip.endDate, 'MMM d')}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

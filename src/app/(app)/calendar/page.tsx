'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ListFilter,
  ArrowUpDown,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
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
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Trip Calendar
        </h1>
        <p className="text-muted-foreground">
          A visual overview of all your adventures.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-card border rounded-xl shadow-sm">
        <div className="relative w-full md:w-1/2 lg:w-2/5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search trips, destinations..."
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
                <SelectItem value="date-desc">Date</SelectItem>
                <SelectItem value="name-asc">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <h2 className="text-xl font-semibold font-headline">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {weekdays.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const tripsOnDay = filteredTrips.filter((trip) =>
                isWithinInterval(day, {
                  start: trip.startDate,
                  end: trip.endDate,
                })
              );
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    'h-36 border-b border-r p-2 flex flex-col gap-1 overflow-hidden relative',
                    !isSameMonth(day, currentMonth) && 'bg-muted/50 text-muted-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'font-semibold',
                      isSameDay(day, new Date()) &&
                        'flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="flex-grow space-y-1 overflow-y-auto">
                    {tripsOnDay.map((trip) => (
                      <TooltipProvider key={trip.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/trips/${trip.id}`}>
                              <Badge
                                className="w-full truncate text-xs cursor-pointer"
                                variant={
                                  trip.isPublic ? 'default' : 'secondary'
                                }
                              >
                                {trip.tripName}
                              </Badge>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-semibold">{trip.tripName}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d')}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

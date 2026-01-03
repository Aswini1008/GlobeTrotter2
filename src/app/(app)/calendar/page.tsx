'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ListFilter,
  ArrowUpDown,
} from 'lucide-react';
import { format, addMonths, subMonths, isWithinInterval } from 'date-fns';

import { sampleTrips } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Calendar } from '@/components/ui/calendar';
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

  const dayContent = (day: Date) => {
    const tripsOnDay = filteredTrips.filter((trip) =>
      isWithinInterval(day, { start: trip.startDate, end: trip.endDate })
    );

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative h-full w-full">
              <span className="absolute top-1 right-1">{format(day, 'd')}</span>
              <div className="flex flex-col gap-1 mt-6 p-1 overflow-y-auto">
                {tripsOnDay.map((trip) => (
                  <Link key={trip.id} href={`/trips/${trip.id}`}>
                    <Badge
                      className="w-full truncate text-xs cursor-pointer"
                      variant={trip.isPublic ? 'default' : 'secondary'}
                    >
                      {trip.tripName}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </TooltipTrigger>
          {tripsOnDay.length > 0 && (
            <TooltipContent>
              {tripsOnDay.map((trip) => (
                <p key={trip.id}>{trip.tripName}</p>
              ))}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

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
        <CardHeader className="flex flex-row items-center justify-between">
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
        <CardContent>
          <Calendar
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={{
              trip: filteredTrips.flatMap((trip) => {
                const dates = [];
                let currentDate = new Date(trip.startDate);
                while (currentDate <= trip.endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return dates;
              }),
            }}
            modifiersClassNames={{
              trip: 'bg-primary/10',
            }}
            components={{
              DayContent: ({ date }) => dayContent(date),
            }}
            className="p-0 [&_td]:h-32 [&_td]:w-auto [&_td]:flex-1 [&_td]:align-top [&_td]:border [&_tr]:border-b-0"
          />
        </CardContent>
      </Card>
    </div>
  );
}

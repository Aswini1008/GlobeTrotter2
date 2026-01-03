'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ListFilter,
  ArrowUpDown,
  MapPin,
  Edit,
  Trash2,
  DollarSign,
  Clock,
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
  differenceInDays,
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
import type { Trip, Activity } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Function to get a consistent color for a trip
const getTripColor = (tripId: string) => {
  const colors = [
    'bg-blue-200 border-blue-300 text-blue-800',
    'bg-green-200 border-green-300 text-green-800',
    'bg-yellow-200 border-yellow-300 text-yellow-800',
    'bg-purple-200 border-purple-300 text-purple-800',
    'bg-pink-200 border-pink-300 text-pink-800',
    'bg-indigo-200 border-indigo-300 text-indigo-800',
  ];
  // Simple hash function to get a consistent color
  let hash = 0;
  for (let i = 0; i < tripId.length; i++) {
    hash = tripId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const ActivityItem = ({ activity }: { activity: Activity }) => (
  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
    <div className="grid gap-0.5">
      <p className="font-semibold text-sm">{activity.title}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          {activity.estimatedCost.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {activity.duration}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7">
            <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
        </Button>
    </div>
  </div>
);


export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredTrips, setFilteredTrips] = React.useState<Trip[]>(sampleTrips);
  const [expandedDay, setExpandedDay] = React.useState<Date | null>(null);

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

  const monthTrips = React.useMemo(() => {
    const events: (Trip & {
      startDay: number;
      span: number;
      level: number;
    })[] = [];

    const monthInterval = { start: calendarStart, end: calendarEnd };
    
    const relevantTrips = filteredTrips.filter(trip => 
        isWithinInterval(trip.startDate, monthInterval) || 
        isWithinInterval(trip.endDate, monthInterval) || 
        (trip.startDate < calendarStart && trip.endDate > calendarEnd)
    ).sort((a,b) => differenceInDays(a.startDate, b.startDate));

    for (const trip of relevantTrips) {
        const start = trip.startDate < calendarStart ? calendarStart : trip.startDate;
        const end = trip.endDate > calendarEnd ? calendarEnd : trip.endDate;
        const startDay = differenceInDays(start, calendarStart);
        const span = differenceInDays(end, start) + 1;
        events.push({ ...trip, startDay, span, level: 0 });
    }

    for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < i; j++) {
            const e1 = events[i];
            const e2 = events[j];
            if (e1.level === e2.level && !(e1.startDay + e1.span <= e2.startDay || e1.startDay >= e2.startDay + e2.span)) {
               e1.level++;
               j = -1;
            }
        }
    }
    return events;
  }, [currentMonth, filteredTrips, calendarStart, calendarEnd]);

  const activitiesByDay = (day: Date) => {
    return sampleTrips
      .flatMap(trip => trip.stops)
      .flatMap(stop => {
        if (isWithinInterval(day, { start: stop.startDate, end: stop.endDate })) {
          return stop.activities.map(act => ({...act, city: stop.city}));
        }
        return [];
      }).filter(Boolean) as (Activity & {city: string})[];
  };

  const handleDayClick = (day: Date) => {
    if (expandedDay && isSameDay(day, expandedDay)) {
        setExpandedDay(null);
    } else {
        setExpandedDay(day);
    }
  }

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
        <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3 sm:px-6">
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
                className="py-2 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="relative grid grid-cols-7" style={{gridTemplateRows: 'repeat(6, minmax(0, 1fr))'}}>
             {days.map((day, dayIdx) => {
               const dayActivities = activitiesByDay(day);
               const isExpanded = expandedDay && isSameDay(day, expandedDay);

               return (
                <Collapsible asChild key={day.toString()} open={isExpanded} onOpenChange={() => handleDayClick(day)}>
                  <div className={cn('border-b border-r relative last:border-r-0 transition-all duration-300', dayIdx > 34 && 'border-b-0', (dayIdx + 1) % 7 === 0 && 'border-r-0')}>
                      <CollapsibleTrigger asChild>
                         <div className={cn("p-2 flex flex-col gap-1 cursor-pointer",
                                !isSameMonth(day, currentMonth) && 'bg-muted/50 text-muted-foreground',
                                isExpanded ? "h-auto" : "h-36"
                              )}>
                            <span className={cn('font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full', isSameDay(day, new Date()) && 'bg-primary text-primary-foreground')}>
                              {format(day, 'd')}
                            </span>
                         </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-2 pt-0 space-y-2">
                           <h4 className="font-semibold text-sm">Activities</h4>
                          {dayActivities.length > 0 ? (
                              dayActivities.map(act => <ActivityItem key={act.id} activity={act} />)
                          ) : (
                              <p className="text-xs text-muted-foreground">No activities planned.</p>
                          )}
                      </CollapsibleContent>
                  </div>
                </Collapsible>
               )
            })}
            
            {monthTrips.map(trip => {
                const cities = trip.stops.map(s => s.city.split(',')[0]);
                const cityText = cities.length > 2 ? `${cities.slice(0, 2).join(', ')} & more` : cities.join(', ');
                const topPosition = (2.5 + trip.level * 2.2);
                const weekRow = Math.floor(trip.startDay / 7);

                return (
                    <TooltipProvider key={trip.id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={`/trips/${trip.id}`}
                                   className={cn("absolute rounded-md p-1 text-xs cursor-pointer overflow-hidden border z-10", getTripColor(trip.id))}
                                   style={{
                                       top: `calc(${weekRow * (isSameDay(expandedDay || new Date(), new Date()) ? 9 : 9)}rem + ${topPosition}rem)`,
                                       left: `${(trip.startDay % 7) * 100/7}%`,
                                       width: `${trip.span * 100/7}%`,
                                       height: '2rem',
                                   }}
                                >
                                    <p className="font-bold truncate">{trip.tripName}</p>
                                    <div className="flex items-center gap-1 truncate text-xs">
                                        <MapPin className="h-3 w-3 shrink-0" />
                                        <span>{cityText}</span>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold">{trip.tripName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d')}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-4 w-4" /> {trip.stops.map(s => s.city).join(', ')}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

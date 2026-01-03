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
import { ActivityItem } from '@/components/trips/activity-item';

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
  
  const trip = sampleTrips[0]; // Using the first trip for this view.
  const tripDays: { date: Date; activities: any[], city: string }[] = [];
  const startDate = trip.startDate;
  const endDate = trip.endDate;

  if (startDate && endDate) {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      let cityForDay = '';
      const activitiesForDay = trip.stops
        .flatMap((stop) => {
          if (currentDate >= stop.startDate && currentDate <= stop.endDate) {
            cityForDay = stop.city;
            return stop.activities.map((act) => ({ ...act, city: stop.city }));
          }
          return [];
        })
        .filter(Boolean);

      tripDays.push({
        date: new Date(currentDate),
        activities: activitiesForDay,
        city: cityForDay
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Trip Calendar
        </h1>
        <p className="text-muted-foreground">
          A day-by-day breakdown of your adventures.
        </p>
      </div>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3 sm:px-6">
          <h2 className="text-xl font-semibold font-headline">
            {trip.tripName}
          </h2>
          <div className='text-sm text-muted-foreground'>
            {format(trip.startDate, 'MMM d, yyyy')} - {format(trip.endDate, 'MMM d, yyyy')}
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-6">
           {tripDays.map((day, index) => {
             const dayTotal = day.activities.reduce((sum, act) => sum + act.estimatedCost, 0);
             // Simple budget status logic
             const dailyBudget = trip.totalBudget / differenceInDays(trip.endDate, trip.startDate);
             let status: 'Under' | 'Near' | 'Over' = 'Under';
             if (dayTotal > dailyBudget) status = 'Over';
             else if (dayTotal > dailyBudget * 0.8) status = 'Near';
             
             const statusStyles = {
                 'Under': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                 'Near': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                 'Over': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
             }
             
             return (
              <Card key={index} className="shadow-md border">
                <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold font-headline">
                      {format(day.date, 'MMM dd')}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="font-semibold">{day.city || 'Travel Day'}</span>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                      Day {index + 1}
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                   {day.activities.length > 0 ? (
                      day.activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)
                   ) : (
                      <p className="text-sm text-muted-foreground py-4 text-center">No activities planned for this day.</p>
                   )}
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 flex items-center justify-between rounded-b-lg">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">Day Total:</span>
                        <span className="font-semibold text-lg">${dayTotal.toLocaleString()}</span>
                    </div>
                    <div className={cn('px-3 py-1 rounded-full text-sm font-medium', statusStyles[status])}>
                        {status === 'Under' && 'Under Budget'}
                        {status === 'Near' && 'Near Limit'}
                        {status === 'Over' && 'Over Budget'}
                    </div>
                </CardFooter>
              </Card>
             )
            })}
             {tripDays.length === 0 && (
                <div className="text-center py-12 px-6">
                    <h3 className="text-xl font-semibold font-headline">No Dates Set</h3>
                    <p className="text-muted-foreground mt-2">Set your trip dates to see the calendar.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

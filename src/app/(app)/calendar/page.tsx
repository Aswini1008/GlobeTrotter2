'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  List,
  X,
  PlusCircle,
  BarChart2,
  TrendingUp,
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
  isToday,
} from 'date-fns';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { sampleTrips } from '@/lib/placeholder-data';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Trip, Activity, Stop } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const trip = sampleTrips[0]; // Using the detailed "Incredible India Trip"

const getActivitiesForDate = (date: Date): Activity[] => {
  const activities: Activity[] = [];
  trip.stops.forEach(stop => {
    if (isWithinInterval(date, { start: stop.startDate, end: stop.endDate })) {
      activities.push(...(stop.activities[format(date, 'yyyy-MM-dd')] || []));
    }
  });
  return activities;
};

const getCityForDate = (date: Date): string | null => {
  const stop = trip.stops.find(s =>
    isWithinInterval(date, { start: s.startDate, end: s.endDate })
  );
  return stop ? stop.city : null;
};

const DayCard = ({
  day,
  isCurrentMonth,
  isTripDay,
  onSelectDay,
  isSelected,
}: {
  day: Date;
  isCurrentMonth: boolean;
  isTripDay: boolean;
  onSelectDay: (day: Date | null) => void;
  isSelected: boolean;
}) => {
  const activities = getActivitiesForDate(day);
  const city = getCityForDate(day);
  const dayTotal = activities.reduce((sum, act) => sum + act.estimatedCost, 0);

  const getBudgetStatus = (): {
    color: string;
    bgColor: string;
    text: string;
    badgeVariant: 'default' | 'destructive' | 'secondary';
  } => {
    const dailyBudget = trip.dailyBudget || 2500; // Default daily budget
    if (dayTotal > dailyBudget * 1.1)
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        text: 'Over Budget',
        badgeVariant: 'destructive',
      };
    if (dayTotal > dailyBudget * 0.8)
      return {
        color: 'text-amber-600',
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'High Spend',
        badgeVariant: 'secondary',
      };
    return {
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      text: 'Under Budget',
      badgeVariant: 'default',
    };
  };

  const status = getBudgetStatus();

  return (
    <div
      className={cn(
        'relative p-2 bg-card border-b border-r min-h-[140px] flex flex-col justify-between transition-all duration-200 ease-in-out',
        !isCurrentMonth && 'bg-muted/50 text-muted-foreground',
        isTripDay && 'bg-primary/5 hover:bg-primary/10 hover:shadow-lg',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isTripDay && 'cursor-pointer'
      )}
      onClick={() => (isTripDay ? onSelectDay(day) : onSelectDay(null))}
    >
      <div>
        <time
          dateTime={format(day, 'yyyy-MM-dd')}
          className={cn(
            'text-xs font-semibold',
            isToday(day) &&
              'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground'
          )}
        >
          {format(day, 'd')}
        </time>
        {isTripDay && (
          <div className="mt-1 space-y-1">
            <p className="text-xs font-bold truncate">{city}</p>
            {activities.slice(0, 2).map(act => (
              <div
                key={act.id}
                className="text-[10px] bg-secondary/50 rounded-sm px-1 py-0.5 truncate"
              >
                {act.title}
              </div>
            ))}
            {activities.length > 2 && (
              <div className="text-[10px] text-muted-foreground">
                + {activities.length - 2} more
              </div>
            )}
          </div>
        )}
      </div>
      {isTripDay && activities.length > 0 && (
        <div className="text-right mt-1">
          <Badge
            variant={status.badgeVariant}
            className={cn(
              'text-[10px] px-1.5 py-0.5',
              status.badgeVariant === 'default' &&
                'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20',
              status.badgeVariant === 'secondary' &&
                'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20',
              status.badgeVariant === 'destructive' &&
                'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20'
            )}
          >
            ₹{dayTotal.toLocaleString()}
          </Badge>
        </div>
      )}
    </div>
  );
};

const DetailPanel = ({
  day,
  onClose,
}: {
  day: Date | null;
  onClose: () => void;
}) => {
  if (!day) return null;

  const activities = getActivitiesForDate(day);
  const city = getCityForDate(day);
  const dayTotal = activities.reduce((sum, act) => sum + act.estimatedCost, 0);
  const dailyBudget = trip.dailyBudget || 2500;
  const budgetProgress = (dayTotal / dailyBudget) * 100;
  const isOverBudget = budgetProgress > 100;
  
  const getBudgetInsight = () => {
    if (dayTotal > dailyBudget * 1.1) return "This day is over budget. Review optional activities.";
    if (dayTotal > dailyBudget * 0.8) return "This is a high-spend day, keep an eye on your expenses.";
    if (dayTotal === 0) return "No expenses logged. A perfect day to explore freely!";
    return "You are well within your daily budget. Consider adding one more activity!";
  }

  return (
    <Card className="absolute top-0 right-0 h-full w-full md:w-[380px] z-20 shadow-2xl rounded-l-none border-l-2 flex flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">
            {format(day, 'MMMM d, yyyy')}
          </CardTitle>
          <CardDescription>{city}</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground">Activities</h3>
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map(act => (
              <div key={act.id} className="flex justify-between items-center text-sm">
                <span>{act.title}</span>
                <span className="font-medium">
                  {act.estimatedCost > 0
                    ? `₹${act.estimatedCost.toLocaleString()}`
                    : 'Free'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No activities planned for this day.</p>
          )}
        </div>
        <Separator />
        <h3 className="text-sm font-semibold text-muted-foreground">Day Summary</h3>
         <div className="space-y-3">
            <div className="flex justify-between items-center font-medium">
              <span>Total Spend</span>
              <span>₹{dayTotal.toLocaleString()}</span>
            </div>
            <Progress value={budgetProgress} className={isOverBudget ? '[&>div]:bg-destructive' : ''} />
            <p className="text-xs text-muted-foreground">{getBudgetInsight()}</p>
         </div>
      </CardContent>
       <CardContent>
          <Button variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Activity
          </Button>
       </CardContent>
    </Card>
  );
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = React.useState(trip.startDate);
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<'calendar' | 'timeline'>('calendar');

  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const tripDuration = (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 3600 * 24) + 1;
  const totalCities = new Set(trip.stops.map(s => s.city)).size;
  const totalCost = trip.stops
    .flatMap(s => Object.values(s.activities).flat())
    .reduce((sum, act) => sum + act.estimatedCost, 0);

  if (isLoading) {
    return (
        <div className="flex flex-col gap-8">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-8 w-1/4" />
            <Card>
                <CardHeader className="grid grid-cols-7 gap-px">
                     {Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-8" />)}
                </CardHeader>
                <CardContent className="grid grid-cols-7 gap-px">
                     {Array.from({ length: 35 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-headline text-2xl">
              {format(currentMonth, 'MMMM yyyy')}
            </h1>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">
                {tripDuration} Days · {totalCities} Cities · Total Budget ₹{trip.totalBudget.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant={viewMode === 'calendar' ? 'secondary' : 'ghost'} onClick={() => setViewMode('calendar')}>
                <Calendar className="mr-2 h-4 w-4" /> Calendar View
            </Button>
            <Button variant={viewMode === 'timeline' ? 'secondary' : 'ghost'} onClick={() => setViewMode('timeline')}>
                <List className="mr-2 h-4 w-4" /> Timeline View
            </Button>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="grid grid-cols-7 bg-border border-t border-l rounded-lg overflow-hidden h-full">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div
              key={day}
              className="text-center text-xs font-semibold py-2 bg-card text-muted-foreground border-b"
            >
              {day}
            </div>
          ))}
          {days.map(day => {
            const isTripDay = isWithinInterval(day, {
              start: trip.startDate,
              end: trip.endDate,
            });
            return (
              <DayCard
                key={day.toString()}
                day={day}
                isCurrentMonth={isSameMonth(day, currentMonth)}
                isTripDay={isTripDay}
                onSelectDay={setSelectedDay}
                isSelected={!!selectedDay && isSameDay(day, selectedDay)}
              />
            );
          })}
        </div>
        <DetailPanel day={selectedDay} onClose={() => setSelectedDay(null)} />
      </div>

      <Card className="sticky bottom-0 mt-auto">
        <CardContent className="p-4 flex items-center justify-between gap-4">
           <div className="flex-1 space-y-1">
             <div className="flex justify-between text-sm font-medium">
                <span>Total Trip Cost</span>
                <span>₹{totalCost.toLocaleString()} / ₹{trip.totalBudget.toLocaleString()}</span>
             </div>
             <Progress value={(totalCost/trip.totalBudget) * 100} />
           </div>
            <Button>
                <BarChart2 className="mr-2 h-4 w-4" /> View Budget Breakdown
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

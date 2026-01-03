import { format } from 'date-fns';
import type { Trip } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ActivityItem } from './activity-item';

interface TimelineViewProps {
  trip: Trip;
}

export function TimelineView({ trip }: TimelineViewProps) {
  const tripDays: { date: Date; activities: any[] }[] = [];
  const startDate = trip.startDate;
  const endDate = trip.endDate;

  if (startDate && endDate) {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const activitiesForDay = trip.stops
        .flatMap((stop) => {
          if (currentDate >= stop.startDate && currentDate <= stop.endDate) {
            return stop.activities.map((act) => ({ ...act, city: stop.city }));
          }
          return [];
        })
        .filter(Boolean);

      tripDays.push({
        date: new Date(currentDate),
        activities: activitiesForDay,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return (
    <div className="mt-4">
      <div className="relative pl-8">
        <div className="absolute left-4 top-0 h-full w-px bg-border"></div>
        {tripDays.map((day, index) => (
          <div key={index} className="relative mb-8">
            <div className="absolute -left-1.5 top-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {format(day.date, 'd')}
            </div>
            <div className="pl-8">
              <p className="font-semibold text-lg font-headline">
                {format(day.date, 'EEEE, MMM d')}
              </p>
              <div className="mt-4 space-y-4">
                {day.activities.length > 0 ? (
                  day.activities.map((activity) => (
                    <Card key={activity.id}>
                       <CardContent className="p-0">
                         <ActivityItem activity={activity} />
                       </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No activities planned for this day.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        {tripDays.length === 0 && (
            <div className="text-center py-12 px-6">
                <h3 className="text-xl font-semibold font-headline">No Dates Set</h3>
                <p className="text-muted-foreground mt-2">Set your trip dates to see the timeline.</p>
            </div>
        )}
      </div>
    </div>
  );
}

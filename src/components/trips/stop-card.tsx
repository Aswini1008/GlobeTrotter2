import { format } from 'date-fns';
import { Calendar, PlusCircle, MoreVertical, DollarSign } from 'lucide-react';
import type { Stop } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { ActivityItem } from './activity-item';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface StopCardProps {
  stop: Stop;
}

export function StopCard({ stop }: StopCardProps) {
    const stopBudget = stop.activities.reduce((sum, act) => sum + act.estimatedCost, 0);
  return (
    <Card className="shadow-md border">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="grid gap-2">
          <CardTitle className="font-headline text-2xl">{stop.city}</CardTitle>
          <CardDescription>All activities and plans for this destination.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Stop</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete Stop
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {stop.activities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
            ))}
            {stop.activities.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                    <p>No activities planned for {stop.city} yet.</p>
                </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex items-center justify-between rounded-b-lg">
        <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-sm font-medium">
                 <Calendar className="h-4 w-4 text-muted-foreground" />
                 <span>{format(stop.startDate, 'MMM d, yyyy')} - {format(stop.endDate, 'MMM d, yyyy')}</span>
            </div>
             <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Budget: ${stopBudget.toLocaleString()}</span>
            </div>
        </div>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </CardFooter>
    </Card>
  );
}

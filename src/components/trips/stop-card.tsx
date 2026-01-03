import { format } from 'date-fns';
import { Calendar, PlusCircle, MoreVertical } from 'lucide-react';
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
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle className="font-headline text-2xl">{stop.city}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {format(stop.startDate, 'MMM d')} - {format(stop.endDate, 'MMM d, yyyy')}
            </span>
          </CardDescription>
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
        <Separator className="mb-4" />
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
      <CardFooter>
        <Button variant="outline" className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </CardFooter>
    </Card>
  );
}

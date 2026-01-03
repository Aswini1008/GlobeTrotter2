'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AlertCircle, Bot, Sparkles } from 'lucide-react';

import type { Trip } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';
import {
  intelligentBudgetSuggestions,
  IntelligentBudgetSuggestionsInput,
} from '@/ai/flows/intelligent-budget-suggestions';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';
import type { IntelligentSuggestion } from '@/lib/types';

interface BudgetViewProps {
  trip: Trip;
}

export function BudgetView({ trip }: BudgetViewProps) {
  const [suggestions, setSuggestions] = React.useState<IntelligentSuggestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const totalCost = trip.stops.reduce(
    (acc, stop) =>
      acc +
      Object.values(stop.activities).flat().reduce((sum, act) => sum + act.estimatedCost, 0),
    0
  );
  const budgetProgress = (totalCost / trip.totalBudget) * 100;
  const isOverBudget = budgetProgress > 100;
  const remainingBudget = trip.totalBudget - totalCost;

  const costPerCity = trip.stops.map((stop) => ({
    name: stop.city.split(',')[0],
    total: Object.values(stop.activities).flat().reduce((sum, act) => sum + act.estimatedCost, 0),
  }));

  const tripDurationDays =
    (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 3600 * 24) + 1;
  const costPerDay = totalCost / tripDurationDays || 0;

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    const activities = trip.stops.flatMap((stop) => Object.values(stop.activities).flat());
    if (activities.length === 0) {
      setError('Add some activities to get AI budget suggestions.');
      setIsLoading(false);
      return;
    }

    const input: IntelligentBudgetSuggestionsInput = {
      tripName: trip.tripName,
      destination: trip.stops.map((s) => s.city).join(', '),
      activities: activities,
      totalBudget: trip.totalBudget,
    };

    try {
      const result = await intelligentBudgetSuggestions(input);
      setSuggestions(result.suggestions);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="font-headline">Budget Overview</CardTitle>
          <CardDescription>
            Your real-time financial breakdown for {trip.tripName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isOverBudget && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Over Budget!</AlertTitle>
              <AlertDescription>
                Your estimated cost exceeds your total budget by $
                {Math.abs(remainingBudget).toLocaleString()}.
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <div className="flex justify-between items-center font-medium">
              <span>
                ${totalCost.toLocaleString()}
                <span className="text-muted-foreground text-sm"> spent</span>
              </span>
              <span>
                Total Budget: ${trip.totalBudget.toLocaleString()}
              </span>
            </div>
            <Progress
              value={budgetProgress}
              className={isOverBudget ? '[&>div]:bg-destructive' : ''}
            />
            <div className="text-sm text-muted-foreground text-right">
              {isOverBudget ? (
                `$${Math.abs(remainingBudget).toLocaleString()} over budget`
              ) : (
                `$${remainingBudget.toLocaleString()} remaining`
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Daily Average</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            ${costPerDay.toFixed(2)}
            <span className="text-lg font-normal text-muted-foreground">
              / day
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Cost per City</CardTitle>
        </CardHeader>
        <CardContent>
          {costPerCity.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={costPerCity} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                City
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Cost
                              </span>
                              <span className="font-bold">
                                ${payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-[200px] flex items-center justify-center text-muted-foreground text-center">
                <p>Add some cities and activities to see the cost breakdown.</p>
             </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="text-primary h-6 w-6" />
                Intelligent Budget Suggestions
              </CardTitle>
              <CardDescription>
                Use AI to find ways to optimize your spending.
              </CardDescription>
            </div>
            <Button onClick={handleGetSuggestions} disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Get Suggestions'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="space-y-4">
              {suggestions.map((s, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold">{s.activity}</p>
                  <p className="text-sm text-muted-foreground mt-1 flex items-start gap-2">
                    <Bot className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                    {s.suggestion}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!isLoading && !error && suggestions.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Click the button to generate AI-powered suggestions.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

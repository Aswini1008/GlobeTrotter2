'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  DollarSign,
  MapPin,
  UploadCloud,
  X,
  Plus,
  Wand2,
  Loader,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import {
  getTripSuggestions,
  TripSuggestion,
} from '@/ai/flows/trip-suggestions';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z
  .object({
    tripName: z.string().min(1, { message: 'Trip name is required.' }),
    destination: z.string().min(1, { message: 'Destination is required.' }),
    dateRange: z.object({
      from: z.date({ required_error: 'Start date is required.' }),
      to: z.date({ required_error: 'End date is required.' }),
    }),
    description: z.string().optional(),
    totalBudget: z.coerce
      .number({ invalid_type_error: 'Budget must be a number.' })
      .positive({ message: 'Budget must be a positive number.' }),
    coverPhoto: z.string().optional(),
  })
  .refine((data) => data.dateRange.to >= data.dateRange.from, {
    message: 'End date must be on or after the start date.',
    path: ['dateRange'],
  });

  const suggestionImages = [
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1488646953041-8f219b23b313?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=400&h=300&fit=crop',
  ];

export function CreateTripForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = React.useState<TripSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);
  const [suggestionError, setSuggestionError] = React.useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripName: '',
      destination: '',
      totalBudget: 10000,
      description: '',
    },
  });

  const { formState, setValue, getValues, trigger, watch } = form;

  const destinationValue = watch('destination');

  const handleGetSuggestions = React.useCallback(async () => {
    const destinationIsValid = await trigger('destination');
    if (!destinationIsValid || !destinationValue) {
        setSuggestions([]);
        return;
    };

    setIsLoadingSuggestions(true);
    setSuggestionError(null);
    setSuggestions([]);

    try {
      const result = await getTripSuggestions({ destination: destinationValue });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      setSuggestionError(
        'Sorry, we couldn\'t fetch suggestions at this time. Please try again.'
      );
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [trigger, destinationValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setValue('coverPhoto', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('coverPhoto', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('New trip created (simulated):', values);
    toast({
      title: 'Trip Created!',
      description: 'Redirecting to your new itinerary...',
    });
    router.push('/trips/trip-1');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="tripName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Weekend Trip to Ooty"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="e.g., Ooty, Tamil Nadu"
                          className="pl-8"
                          {...field}
                        />
                      </FormControl>
                    </div>
                     {/* <FormDescription>
                      Start typing a destination to get AI suggestions.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Trip Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value?.from && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Budget (INR)</FormLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                        ₹
                      </span>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="25000"
                          className="pl-8"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add notes, purpose, or ideas for this trip..."
                        className="resize-none h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Photo (Optional)</FormLabel>
                    {imagePreview ? (
                      <div className="relative aspect-video w-full rounded-md overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Cover photo preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-7 w-7"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <FormControl>
                        <div
                          className="w-full aspect-video border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadCloud className="h-8 w-8 mb-2" />
                          <span>Click to upload image</span>
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                          />
                        </div>
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between items-center">
            <Button
                type="button"
                variant="secondary"
                onClick={handleGetSuggestions}
                disabled={isLoadingSuggestions || !destinationValue}
              >
                {isLoadingSuggestions ? (
                  <><Loader className="mr-2 h-4 w-4 animate-spin" /> Generating Ideas</>
                ) : (
                  <><Wand2 className="mr-2 h-4 w-4" /> Get Suggestions</>
                )}
              </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'Creating...' : 'Create Trip'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Wand2 className="text-primary h-6 w-6" />
              Smart Suggestions
            </CardTitle>
            <CardDescription>
              Get inspired with these AI-powered popular spots for your
              destination.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingSuggestions && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            )}
            {suggestionError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{suggestionError}</AlertDescription>
              </Alert>
            )}
            {!isLoadingSuggestions &&
              !suggestionError &&
              suggestions.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {suggestions.map((suggestion, i) => (
                    <div
                      key={suggestion.name}
                      className="relative group aspect-w-16 aspect-h-9 rounded-md overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={suggestionImages[i % suggestionImages.length]}
                        alt={suggestion.name}
                        data-ai-hint={suggestion.imageHint}
                        fill
                        className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <p className="text-white text-sm font-semibold">
                          {suggestion.name}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full h-9 w-9"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            {!isLoadingSuggestions &&
              !suggestionError &&
              suggestions.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <p>
                    Enter a destination and click "Get Suggestions" to see AI-powered ideas.
                  </p>
                </div>
              )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

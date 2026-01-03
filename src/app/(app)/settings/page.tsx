'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Trash2,
  LogOut,
  ChevronRight,
  MapPin,
  Save,
  X,
  Camera,
  Moon,
  Sun,
  Laptop,
} from 'lucide-react';
import { sampleUser, sampleTrips } from '@/lib/placeholder-data';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Label } from '@/components/ui/label';

const profileFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phoneNumber: z.string().optional(),
  photoURL: z.string().optional(),
});

export default function SettingsPage() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    sampleUser.photoURL || null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: `${sampleUser.fullName}`,
      email: sampleUser.email,
      phoneNumber: '+91 98765 43210', // sample data
      photoURL: sampleUser.photoURL,
    },
  });

  const { formState, setValue } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setValue('photoURL', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log('Form Submitted with values:', values);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been successfully saved.',
    });
  }

  const savedDestinations = React.useMemo(() => {
    const destinations = new Set<string>();
    sampleTrips.forEach(trip => {
      trip.stops.forEach(stop => {
        destinations.add(stop.city);
      });
    });
    return Array.from(destinations);
  }, []);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences.
          </p>
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Profile</CardTitle>
          <CardDescription>
            This is your public-facing information.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar
                    className="h-24 w-24 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <AvatarImage
                      src={imagePreview ?? undefined}
                      alt={`${sampleUser.fullName} profile picture`}
                    />
                    <AvatarFallback className="text-3xl">
                      {sampleUser.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change photo</span>
                  </button>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-headline">{`${sampleUser.fullName}`}</h2>
                  <p className="text-muted-foreground">{sampleUser.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="yourname@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => form.reset()}
                disabled={!formState.isDirty || formState.isSubmitting}
              >
                <X className="mr-2" /> Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formState.isDirty || formState.isSubmitting}
              >
                <Save className="mr-2" />
                {formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Preferences</CardTitle>
          <CardDescription>Customize your app experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {isClient && (
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun /> Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon /> Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Laptop /> System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Trip Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about upcoming trips and activities.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Promotional Offers</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about special offers and new features.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Data */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Saved Destinations</CardTitle>
          <CardDescription>
            Your favorite places for future adventures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedDestinations.length > 0 ? (
            <div className="space-y-2">
              {savedDestinations.map(destination => (
                <div
                  key={destination}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin className="text-primary" />
                    {destination}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 />
                    <span className="sr-only">Remove {destination}</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                You haven&apos;t saved any destinations yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Privacy & Security</CardTitle>
          <CardDescription>
            Manage your password and account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Change Password</h4>
              <p className="text-sm text-muted-foreground">
                It&apos;s a good idea to use a strong password that you&apos;re
                not using elsewhere.
              </p>
            </div>
            <Button variant="outline">
              Change Password <ChevronRight className="ml-2" />
            </Button>
          </div>
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Log Out</h4>
              <p className="text-sm text-muted-foreground">
                Log out from your current session.
              </p>
            </div>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              <LogOut className="mr-2" />
              Logout
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="font-headline text-destructive">
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2" />
                Delete My Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    toast({
                      title: 'Account Deletion Requested',
                      description: 'Your account is scheduled for deletion.',
                      variant: 'destructive',
                    })
                  }
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Yes, Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}

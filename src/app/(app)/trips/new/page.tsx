import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { CreateTripForm } from '@/components/trips/create-trip-form';
import { Button } from '@/components/ui/button';

export default function NewTripPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/home">
           <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
        </Link>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            Create a New Trip
          </h1>
          <p className="text-muted-foreground">
            Let&apos;s get the basic details down for your next adventure.
          </p>
        </div>
      </div>
      <div className="py-8">
        <CreateTripForm />
      </div>
    </>
  );
}

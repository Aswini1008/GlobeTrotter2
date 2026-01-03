import { CreateTripForm } from '@/components/trips/create-trip-form';

export default function NewTripPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Plan a New Trip
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

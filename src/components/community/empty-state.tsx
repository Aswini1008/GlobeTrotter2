import Link from 'next/link';
import { Users, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm my-16">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <Users className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight font-headline">
          The Community Hub is Quiet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Be the first to share an adventure! Public trips from other users will appear here.
        </p>
        <Link href="/trips">
          <Button className="mt-4 bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Manage My Trips
          </Button>
        </Link>
      </div>
    </div>
  );
}

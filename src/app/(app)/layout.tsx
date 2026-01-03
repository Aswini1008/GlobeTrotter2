'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTripsPage = pathname.startsWith('/trips');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <AppHeader />
        <main
          className={cn(
            'flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6',
            isTripsPage ? 'bg-muted/40' : 'bg-background'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

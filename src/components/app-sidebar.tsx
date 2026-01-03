'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Home,
  Map,
  Settings,
  Plane,
  Compass,
  CalendarDays,
  Users,
  Search,
  Shield,
} from 'lucide-react';
import { GlobeTrotterLogo } from './icons';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/trips', icon: Plane, label: 'My Trips' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { href: '/activities/search', icon: Search, label: 'Activities' },
];

const adminNavItems = [
    { href: '/admin', icon: Shield, label: 'Admin' },
];

const bottomNavItems = [
    { href: '/settings', icon: Settings, label: 'Settings' },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/home" className="flex items-center gap-2 font-semibold">
            <GlobeTrotterLogo />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith(item.href) && item.href !== '/home' ? 'bg-muted text-primary' : '',
                  pathname === item.href && item.href === '/home' ? 'bg-muted text-primary' : ''
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <Separator className="my-4" />
           <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
             {adminNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith(item.href) ? 'bg-muted text-primary' : ''
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
           </nav>
        </div>
        <div className="mt-auto p-4 border-t">
            <nav className="grid items-start text-sm font-medium">
                {bottomNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      pathname.startsWith(item.href) ? 'bg-muted text-primary' : ''
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
            </nav>
        </div>
      </div>
    </div>
  );
}

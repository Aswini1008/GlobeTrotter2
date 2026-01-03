'use client';

import Link from 'next/link';
import {
  Home,
  Menu,
  Plane,
  Settings,
  User,
  LogOut,
  Compass,
  CalendarDays,
  Users,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GlobeTrotterLogo } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { sampleUser } from '@/lib/placeholder-data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/trips', icon: Plane, label: 'My Trips' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { href: '/activities/search', icon: Search, label: 'Activities' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function AppHeader() {
  const pathname = usePathname();
  const nameInitial = sampleUser.firstName.charAt(0);
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <GlobeTrotterLogo />
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn('flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                  pathname === item.href ? 'bg-muted text-foreground' : ''
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        {/* Breadcrumbs can be added here if needed */}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
             <Avatar>
              <AvatarImage src={sampleUser.photoURL} alt={`${sampleUser.firstName} ${sampleUser.lastName}`} />
              <AvatarFallback>{nameInitial}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
           <Link href="/login">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

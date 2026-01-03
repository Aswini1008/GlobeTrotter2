'use client';

import * as React from 'react';
import {
  Users,
  Plane,
  Activity,
  IndianRupee,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { KpiCard } from '@/components/admin/kpi-card';
import { TripsChart } from '@/components/admin/trips-chart';
import { CitiesChart } from '@/components/admin/cities-chart';
import { ActivitiesChart } from '@/components/admin/activities-chart';
import { RecentTripsTable } from '@/components/admin/recent-trips-table';
import { UserManagementTable } from '@/components/admin/user-management-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  // In a real app, this would be a server-side check or a more robust client-side guard.
  React.useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/home'); // Or a dedicated /access-denied page
    }
  }, [user, router]);
  
  if (user?.role !== 'admin') {
      // Render a loading state or null while redirecting
      return null; 
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-gray-900 text-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="relative w-full max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search users, trips..." className="pl-10 bg-gray-800 border-gray-700 h-10" />
          </div>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                <Filter className="mr-2 h-4 w-4" /> Date Range <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Last Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Users" value="1,248" icon={Users} />
        <KpiCard title="Trips Created" value="3,962" icon={Plane} />
        <KpiCard title="Active Users (7 days)" value="312" icon={Activity} />
        <KpiCard title="Avg Trip Budget" value="₹18,500" icon={IndianRupee} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <div className="col-span-12 lg:col-span-4 space-y-4">
            <TripsChart />
            <ActivitiesChart />
        </div>
        <div className="col-span-12 lg:col-span-3">
             <CitiesChart />
        </div>
      </div>
       <div className="grid gap-4">
        <RecentTripsTable />
        <UserManagementTable />
      </div>
    </div>
  );
}

'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trips = [
  {
    name: 'Incredible India Trip',
    user: 'aswini@gmail.com',
    cities: 3,
    budget: '₹45,000',
    created: 'Feb 10, 2026',
    status: 'Active',
  },
   {
    name: 'Goa Getaway',
    user: 'rohan.sharma@example.com',
    cities: 1,
    budget: '₹20,000',
    created: 'Feb 08, 2026',
    status: 'Completed',
  },
  {
    name: 'Rajasthan Royalty',
    user: 'priya.patel@example.com',
    cities: 4,
    budget: '₹60,000',
    created: 'Feb 05, 2026',
    status: 'Active',
  },
];

export function RecentTripsTable() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Recent Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-700 border-gray-700">
              <TableHead>Trip Name</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Cities</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.name} className="hover:bg-gray-700 border-gray-700">
                <TableCell className="font-medium">{trip.name}</TableCell>
                <TableCell>{trip.user}</TableCell>
                <TableCell>{trip.cities}</TableCell>
                <TableCell>{trip.budget}</TableCell>
                <TableCell>{trip.created}</TableCell>
                <TableCell>
                  <Badge variant={trip.status === 'Active' ? 'default' : 'secondary'} className={trip.status === 'Active' ? 'bg-green-600' : 'bg-gray-500'}>
                    {trip.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

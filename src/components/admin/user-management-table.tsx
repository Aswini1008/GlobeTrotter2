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
import { Button } from '../ui/button';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';

const users = [
  { name: 'Aswini S M', email: 'aswini.sm@example.com', trips: 5, status: 'Active' },
  { name: 'Rohan Sharma', email: 'rohan.sharma@example.com', trips: 2, status: 'Active' },
  { name: 'Virat Kumar', email: 'virat.kumar@example.com', trips: 8, status: 'Active' },
  { name: 'Priya Patel', email: 'priya.patel@example.com', trips: 1, status: 'Disabled' },
  { name: 'Jeeva Shankar', email: 'jeeva.shankar@example.com', trips: 3, status: 'Active' },
];

export function UserManagementTable() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-700 border-gray-700">
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trips Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email} className="hover:bg-gray-700 border-gray-700">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.trips}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                        <DropdownMenuItem>View Trips</DropdownMenuItem>
                        <DropdownMenuItem>Disable User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Week 1', trips: 40 },
  { name: 'Week 2', trips: 30 },
  { name: 'Week 3', trips: 50 },
  { name: 'Week 4', trips: 45 },
  { name: 'Week 5', trips: 60 },
  { name: 'Week 6', trips: 55 },
  { name: 'Week 7', trips: 70 },
];

export function TripsChart() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Trips Created Over Time</CardTitle>
        <CardDescription>Weekly trend of new trips created.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Line type="monotone" dataKey="trips" stroke="#20A499" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Sightseeing', count: 450 },
  { name: 'Food Tours', count: 320 },
  { name: 'Travel', count: 280 },
  { name: 'Adventure', count: 200 },
  { name: 'Shopping', count: 150 },
];

export function ActivitiesChart() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Popular Activities</CardTitle>
        <CardDescription>Most frequently added activities by users.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
             <XAxis type="number" stroke="#888" />
            <YAxis type="category" dataKey="name" stroke="#888" width={80} />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
            <Bar dataKey="count" fill="#FF8300" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Bengaluru', value: 32 },
  { name: 'Chennai', value: 24 },
  { name: 'Hyderabad', value: 18 },
  { name: 'Delhi', value: 14 },
  { name: 'Others', value: 12 },
];

const COLORS = ['#20A499', '#FF8300', '#1c7b73', '#cc6900', '#8884d8'];

export function CitiesChart() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white h-full">
      <CardHeader>
        <CardTitle>Popular Cities</CardTitle>
        <CardDescription>Top destinations chosen by users.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

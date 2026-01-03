'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

export function KpiCard({ title, value, icon: Icon }: KpiCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

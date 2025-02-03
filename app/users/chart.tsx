'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useMemo } from 'react';
import { generations } from './generations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: 'Desktop',
//     color: '#2563eb',
//   },
//   mobile: {
//     label: 'Mobile',
//     color: '#60a5fa',
//   },
// } satisfies ChartConfig;

export function UsersChart({ keys, data }: { keys: string[]; data: any[] }) {
  const config = Object.fromEntries(
    keys.map((key, index) => [
      key,
      {
        label: key,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    ])
  ) as ChartConfig;

  const currentYear = new Date().getFullYear();

  const chartData = useMemo(
    () =>
      data
        ?.sort((a, b) => String(a?.name).localeCompare(b?.name))
        ?.map((d) => ({
          ...d,
          generation: generations.find((g) => {
            const birthYear = currentYear - d.age;
            return birthYear >= g.minYear && birthYear <= g.maxYear;
          }),
        })),
    [currentYear, data]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>User ages</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className='max-h-[300px] w-full d-flex'>
          <BarChart accessibilityLayer data={chartData}>
            {keys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key].color}
                radius={4}
              />
            ))}
            <CartesianGrid vertical={false} />
            <YAxis dataKey='age' />
            <XAxis dataKey='name' />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

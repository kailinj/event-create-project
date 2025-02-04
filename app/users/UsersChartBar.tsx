'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
import { UserGenerations } from './UserGenerations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User } from '../schema/user';

export function UsersChartBar({
  keys,
  data,
}: {
  keys: string[];
  data: User[];
}) {
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
          generation: UserGenerations.find((g) => {
            const birthYear = currentYear - Number(d.age);
            return birthYear >= g.minYear && birthYear <= g.maxYear;
          }),
        })),
    [currentYear, data]
  );

  return (
    <Card className='flex-grow'>
      <CardHeader>
        <CardTitle>User ages</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className='min-h-[300px] w-full d-flex'>
          <BarChart layout='vertical' accessibilityLayer data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {keys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill='#374c80'
                radius={4}
                stackId='a'
              >
                <LabelList dataKey={key} position='right' />
              </Bar>
            ))}
            <CartesianGrid horizontal={false} />
            <YAxis dataKey='name' type='category' width={100} />
            <XAxis dataKey='age' type='number' />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

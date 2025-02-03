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
import { generations } from './generations';
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
          generation: generations.find((g) => {
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
        <ChartContainer config={config} className='max-h-[300px] w-full d-flex'>
          <BarChart accessibilityLayer data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {keys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key].color}
                radius={4}
                style={{ color: 'white' }}
              >
                <LabelList dataKey='age' position='top' />
              </Bar>
            ))}
            <CartesianGrid vertical={false} />
            <YAxis dataKey='age' />
            <XAxis dataKey='name' interval={0} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

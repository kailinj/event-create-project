'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
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

  const chartData = useMemo(
    () => data?.sort((a, b) => String(a?.name).localeCompare(b?.name)),
    [data]
  );

  return (
    <Card className='md:col-span-3 col-span-1'>
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
                fill={'#374c80'}
                color={'#374c80'}
                radius={4}
                stackId='a'
              >
                <LabelList dataKey={key} position='right' />
              </Bar>
            ))}
            <CartesianGrid horizontal={false} />
            <YAxis dataKey='name' type='category' width={100} />
            <XAxis
              dataKey='age'
              type='number'
              axisLine={false}
              tickLine={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

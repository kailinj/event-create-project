'use client';

import * as React from 'react';
import { Label, LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { generations } from './generations';

export function UsersChartPie({ data }: { keys: string[]; data: any[] }) {
  const currentYear = new Date().getFullYear();

  const chartData = React.useMemo(
    () =>
      generations
        .map((g) => {
          const members = data?.filter((d) => {
            const birthYear = currentYear - Number(d.age);
            return birthYear >= g.minYear && birthYear <= g.maxYear;
          });
          return {
            ...g,
            members,
            value: members?.length,
            fill: g.color,
          };
        })
        .filter((g) => g.value > 0),
    [currentYear, data]
  );

  const config = React.useMemo(
    () =>
      (chartData && chartData?.length > 0
        ? Object.fromEntries(
            chartData?.map((generation, index) => [
              generation.name,
              {
                label: generation.name,
                color: `hsl(var(--chart-${index + 1}))`,
              },
            ])
          )
        : {}) as ChartConfig,
    [chartData]
  );

  const totalUsers = React.useMemo(() => data.length, [data]);

  return (
    <Card className='flex flex-col min-w-[400px]'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>User counts</CardTitle>
        <CardDescription>Total users & users per generation</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={config}
          className='mx-auto w-full max-h-[300px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              innerRadius={40}
            >
              <LabelList dataKey='value' position='top' />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 4}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className='fill-muted-foreground'
                        >
                          Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
            // layout='vertical'
            // align='right'
            // verticalAlign='middle'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

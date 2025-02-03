'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import { HeaderContext } from '@tanstack/react-table';
import { useMemo } from 'react';

const iconProps = { className: 'ml-2 h-4 w-4' };

export function DataTableHeaderSortable<TData, TValue>({
  column,
}: HeaderContext<TData, TValue>) {
  const sorting = useMemo(() => column.getIsSorted(), [column]);
  const Icon = useMemo(
    () =>
      sorting === 'asc'
        ? ArrowUpIcon
        : sorting === 'desc'
        ? ArrowDownIcon
        : ArrowsUpDownIcon,
    [sorting]
  );
  const columnName: string = useMemo(() => String(column?.id), [column?.id]);
  return columnName === 'actions' ? null : (
    <Button variant='ghost' onClick={() => column.toggleSorting()}>
      {String(columnName[0]).toLocaleUpperCase() + columnName.slice(1)}
      <Icon {...iconProps} />
    </Button>
  );
}

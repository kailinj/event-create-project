'use client';

import { Button } from '@/components/ui/button';
import { HeaderContext } from '@tanstack/react-table';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo } from 'react';

const iconSpacing = 'ml-2 h-4 w-4';
const sortedIconProps = { className: `${iconSpacing} opacity-50` };

export function DataTableHeaderSortable<TData>({
  column,
}: HeaderContext<TData, unknown>) {
  const columnName: string = useMemo(() => String(column?.id), [column?.id]);

  return columnName === 'actions' ? null : (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting()}
      className='px-0'
    >
      {String(columnName[0]).toLocaleUpperCase() + columnName.slice(1)}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp {...sortedIconProps} />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDown {...sortedIconProps} />
      ) : (
        <ArrowUpDown className={`opacity-25 ${iconSpacing}`} />
      )}
    </Button>
  );
}

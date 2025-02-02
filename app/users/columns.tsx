'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DbUser } from '../schema/user';
import ColumnHeaderSortable from '@/components/ui/column-header-sortable';

export const columns: ColumnDef<DbUser>[] = [
  {
    accessorKey: 'name',
    header: (context) => (
      <ColumnHeaderSortable {...context}>Name</ColumnHeaderSortable>
    ),
  },
  {
    accessorKey: 'email',
    header: (context) => (
      <ColumnHeaderSortable {...context}>Email</ColumnHeaderSortable>
    ),
  },
  {
    accessorKey: 'age',
    header: (context) => (
      <ColumnHeaderSortable {...context}>Age</ColumnHeaderSortable>
    ),
  },
];

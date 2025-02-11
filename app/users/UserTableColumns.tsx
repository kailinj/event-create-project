'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '../schema/user';

export const UserTableColumns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'age', header: 'Age', sortDescFirst: false },
  {
    accessorKey: 'customDisplay',
    header: 'Custom',
    sortDescFirst: false,
    sortUndefined: 'last',
  },
  { accessorKey: '', id: 'actions' },
];

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '../schema/user';

export const UserTableColumns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'age', header: 'Age' },
  {
    accessorKey: 'custom',
    header: 'Custom',
    cell: (props) => {
      const val = props.getValue();
      if (val && Object.keys(val)?.length > 0) {
        return Object.entries(val).map(([k, v]) => `${k}: ${v}`);
      } else {
        return null;
      }
    },
  },
  { accessorKey: '', id: 'actions' },
];

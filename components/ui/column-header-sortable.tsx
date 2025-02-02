'use client';

import { DbUser } from '@/app/schema/user';
import { Button } from '@/components/ui/button';
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';
import { HeaderContext } from '@tanstack/react-table';

const iconProps = { className: 'ml-2 h-4 w-4' };

interface Props extends HeaderContext<DbUser, unknown> {
  children: React.ReactNode;
}

const ColumnHeaderSortable = ({ column, children }: Props) => {
  const sorting = column.getIsSorted();
  const Icon =
    sorting === 'asc'
      ? ArrowUpIcon
      : sorting === 'desc'
      ? ArrowDownIcon
      : ArrowsUpDownIcon;
  return (
    <Button variant='ghost' onClick={() => column.toggleSorting()}>
      {children}
      <Icon {...iconProps} />
    </Button>
  );
};
export default ColumnHeaderSortable;

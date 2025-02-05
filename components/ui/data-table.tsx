'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from './data-table-pagination';
import { DataTableHeaderSortable } from '@/components/ui/data-table-header-sortable';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { CardContent, CardFooter } from './card';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleEdit,
}: DataTableProps<TData, TValue> & { handleEdit: (data: TData) => void }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <CardContent className='data-table'>
        <Table>
          <TableHeader className='bg-secondary'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.id === 'age' ? 'text-right pr-6' : ''
                      }
                    >
                      <DataTableHeaderSortable {...header.getContext()} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.columnDef.id === 'actions'
                          ? 'text-center'
                          : cell.column.columnDef.header === 'Age'
                          ? 'text-right pr-6'
                          : 'text-left'
                      }
                    >
                      {cell.column.columnDef.id === 'actions' ? (
                        <Button
                          className='text-center'
                          onClick={() => handleEdit(row.original)}
                          variant='ghost'
                          size='icon'
                        >
                          <Pencil className='text-primary' />
                        </Button>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='justify-end'>
        <DataTablePagination table={table} />
      </CardFooter>
    </>
  );
}

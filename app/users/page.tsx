'use client';

import { DataTable } from '../../components/ui/data-table';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import UserDialog from './dialog';
import { UsersChartPie } from './chart-pie';
import { UsersChartBar } from './chart-bar';
import { ActiveUser, User } from '../schema/user';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ActiveUser>(undefined);

  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (error) return <p>Error loading users</p>;

  return (
    <div className='p-6 mx-auto flex flex-col gap-4'>
      <h1 className='text-3xl'>User management</h1>
      <Card>
        <CardHeader className='flex flex-row items-center space-y-0 justify-between'>
          <h2 className='text-xl'>Users</h2>
          <UserDialog
            open={open}
            setOpen={setOpen}
            user={user}
            setUser={setUser}
          />
        </CardHeader>
        {isLoading ? (
          <Skeleton className='h-[400px] rounded-xl mx-8 mb-16' />
        ) : (
          <DataTable
            columns={columns}
            data={users}
            handleEdit={(data: User) => {
              setUser(data);
              setOpen(true);
            }}
          />
        )}
      </Card>
      {!isLoading && (
        <div className='flex md:flex-row flex-col justify-between gap-8'>
          <UsersChartPie data={users} keys={['age']} />
          <UsersChartBar data={users} keys={['age']} />
        </div>
      )}
    </div>
  );
}

'use client';

import { DataTable } from '../../components/ui/data-table';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import UserDialog from './dialog';
import { UsersChartPie } from './chart-pie';
import { UsersChart } from './chart';
import { ActiveUser, User } from '../schema/user';

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

  // Fetch users with React Query
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className='p-6 mx-auto'>
      <div className='mt-4'>
        <div className='flex flex-row justify-between items-center mb-2'>
          <h2 className='text-xl'>Users</h2>
          <UserDialog
            open={open}
            setOpen={setOpen}
            user={user}
            setUser={setUser}
          />
        </div>
        <DataTable
          columns={columns}
          data={users}
          handleEdit={(data: User) => {
            setUser(data);
            setOpen(true);
          }}
        />
        <UsersChart data={users} keys={['age']} />
        <UsersChartPie data={users} keys={['age']} />
      </div>
    </div>
  );
}

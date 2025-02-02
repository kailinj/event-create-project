'use client';

import { User } from '@prisma/client';
import UserForm from './form';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';

// Fetch users function
async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default function UsersPage() {
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
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-xl'>Users</h2>
          <UserForm />
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}

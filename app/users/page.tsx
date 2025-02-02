'use client';

import { User } from '@prisma/client';
import { FieldValues } from 'react-hook-form';
import UserForm from './form';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormUser } from '../schema/user';

// Fetch users function
async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

// Add user function
async function addUser(newUser: {
  name: string;
  email: string;
  age: number;
}): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
}

export default function UsersPage() {
  const queryClient = useQueryClient();

  // Fetch users with React Query
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Mutation for adding a user
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Handle form submission
  function handleSubmit(data: FieldValues) {
    mutation.mutate(data as FormUser);
  }

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <UserForm onSubmit={handleSubmit} />

      <div className='mt-4'>
        <h2 className='text-xl'>Users</h2>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { User, userForm } from '../schema/user';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Add user function
async function addUser(newUser: User): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
}

// Edit user function
async function updateUser(updatedUser: User): Promise<User> {
  const res = await fetch(`/api/users/${updatedUser.id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export default function UserForm({
  setOpen,
  setUser,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUser: (user: User | undefined) => void;
  user?: User;
}) {
  const queryClient = useQueryClient();

  const [withCustomField, setWithCustomField] = useState(false);
  const isEditing = !!user;

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(userForm),
    defaultValues: {
      custom: '',
      name: '',
      email: '',
      age: 0,
    },
    ...(user
      ? {
          values: {
            ...user,
            custom:
              user && user?.custom && user?.custom?.length > 0
                ? user?.custom
                : '',
          },
        }
      : {}),
  });

  const handleSuccess = (data: User) => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    setOpen(false);
    const verb = isEditing ? 'updated' : 'created';
    toast({
      title: `User ${verb}`,
      description: `${data.name} ${verb} successfully.`,
    });
    setUser(undefined);
    form.reset();
  };

  // Mutation for adding a user
  const newUser = useMutation({
    mutationFn: addUser,
    onSuccess: handleSuccess,
  });

  // Mutation for updating a user
  const existingUser = useMutation({
    mutationFn: updateUser,
    onSuccess: handleSuccess,
  });

  const onSubmit = (data: User) => {
    if (isEditing && user?.id) {
      existingUser.mutate({ ...data, id: user.id });
    } else {
      newUser.mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{`${user ? 'Update' : 'Add new'} user`}</DialogTitle>
          {!user && (
            <DialogDescription>
              Create a new user by completing this form.
            </DialogDescription>
          )}
        </DialogHeader>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Taylor Smith' {...field} />
              </FormControl>
              <FormDescription>First and last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='me@myemail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder='40' type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {withCustomField ? (
          <FormField
            control={form.control}
            name='custom'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom field</FormLabel>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Input placeholder='Custom field' {...field} />
                    <Button
                      onClick={() => {
                        setWithCustomField(false);
                        form.setValue('custom', '');
                      }}
                      variant='outline'
                      size='sm'
                    >
                      Remove
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <Button
            onClick={() => setWithCustomField(true)}
            variant='outline'
            size='sm'
          >
            Add custom field
          </Button>
        )}
        <DialogFooter>
          <Button type='submit'>{user ? 'Save' : 'Create'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { DbUser, FormUser, userForm } from '../schema/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
async function addUser(
  newUser: Omit<FormUser, 'age'> & { age: number }
): Promise<DbUser> {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
}

export default function UserForm() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [withCustomField, setWithCustomField] = useState(false);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(userForm),
    defaultValues: {
      custom: '',
      name: '',
      email: '',
      age: '',
    },
  });

  // Mutation for adding a user
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
      form.reset();
      toast({
        title: 'User created',
        description: `${data.name} created successfully.`,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add user</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit((data) => {
              mutation.mutate({ ...data, age: Number(data.age) });
            })}
          >
            <DialogHeader>
              <DialogTitle>Add new user</DialogTitle>
              <DialogDescription>
                Create a new user by completing this form.
              </DialogDescription>
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
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

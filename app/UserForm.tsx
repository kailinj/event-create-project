import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, userForm } from './schema/user';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface KnownUser extends User {
  id: number;
}

export default function UserForm() {
  const [users, setUsers] = useState<KnownUser[]>([]);
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      age: '',
    },
    resolver: zodResolver(userForm),
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    fetch('/api/users', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newUser = await res.json();
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className='p-6 max-w-lg mx-auto'>
      <Card>
        <CardContent className='p-4'>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={control}
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
                control={control}
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
                control={control}
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
              <Button type='submit'>Submit</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <div className='mt-4'>
        <h2 className='text-xl'>Users</h2>
        {users?.map((user: KnownUser) => (
          <div key={user.id} className='p-2 border-b'>
            {user.name} ({user.email})
          </div>
        ))}
      </div>
    </div>
  );
}

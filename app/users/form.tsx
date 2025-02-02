'use client';

import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { userForm } from '../schema/user';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function UserForm({
  onSubmit,
}: {
  onSubmit: (data: FieldValues) => void;
}) {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      age: '',
    },
    resolver: zodResolver(userForm),
  });

  const { control, handleSubmit } = form;

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
    </div>
  );
}

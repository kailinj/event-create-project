'use client';

import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormUser } from '../schema/user';

export default function UserFormFields({
  form,
}: {
  form: UseFormReturn<FieldValues, FormUser, undefined>;
}) {
  return (
    <>
      <FormField
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
    </>
  );
}

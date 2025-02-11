'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ActiveUser, User, userForm } from '../schema/user';
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

async function addUser(newUser: User): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
}

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
  open,
  setOpen,
  setUser,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUser: (user: ActiveUser) => void;
  user?: ActiveUser;
}) {
  const queryClient = useQueryClient();

  const [customLabel, setCustomLabel] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [isAddingCustomField, setIsAddingCustomField] = useState(false);
  const [isRemovingCustomField, setIsRemovingCustomField] = useState(false);

  const isEditing = !!user;

  const { toast } = useToast();

  const defaultValues = useMemo(
    () => ({
      custom: {},
      name: '',
      email: '',
      age: '',
    }),
    []
  );

  const hasCustomValue = useMemo(
    () => user && user?.custom && Object.keys(user.custom)?.length > 0,
    [user]
  );

  const customFieldVisible = useMemo(
    () => (hasCustomValue || isAddingCustomField) && !isRemovingCustomField,
    [hasCustomValue, isAddingCustomField, isRemovingCustomField]
  );

  const form = useForm({
    resolver: zodResolver(userForm),
    defaultValues: defaultValues,
    ...(user
      ? {
          values: {
            ...user,
            age: String(user.age),
            custom:
              user && user?.custom && Object.keys(user.custom)?.length > 0
                ? user?.custom
                : {},
          },
        }
      : {}),
  });

  const closeDialog = useCallback(() => {
    const formValues = form.getValues();
    if (
      (formValues.custom && Object.keys(formValues.custom)?.length > 0) ||
      formValues.name !== '' ||
      formValues.email !== '' ||
      formValues.age !== ''
    ) {
      setUser(undefined);
      form.reset(defaultValues);
    }
  }, [defaultValues, form, setUser]);

  useEffect(() => {
    if (open === false) {
      closeDialog();
    } else {
      if (
        hasCustomValue &&
        !isRemovingCustomField &&
        typeof user?.custom === 'object'
      ) {
        const customValues = Object.entries(Object(user.custom));
        if (customValues?.length > 0 && customValues[0]?.length > 0) {
          setCustomLabel(String(customValues[0][0]));
          setCustomValue(String(customValues[0][1]));
        }
      }
    }
  }, [
    closeDialog,
    defaultValues,
    form,
    hasCustomValue,
    isRemovingCustomField,
    open,
    setUser,
    user?.custom,
  ]);

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

  const newUser = useMutation({
    mutationFn: addUser,
    onSuccess: handleSuccess,
  });

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

        {customFieldVisible ? (
          <FormField
            control={form.control}
            name='custom'
            render={({}) => (
              <FormItem>
                <FormLabel>Custom field</FormLabel>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Input
                      placeholder='Label'
                      value={customLabel}
                      onChange={(e) => {
                        setCustomLabel(e.target.value);
                        form.setValue('custom', {
                          [e.target.value]: customValue,
                        });
                      }}
                    />
                    <Input
                      placeholder='Value'
                      value={customValue}
                      onChange={(e) => {
                        setCustomValue(e.target.value);
                        form.setValue('custom', {
                          [customLabel]: e.target.value,
                        });
                      }}
                    />
                    <Button
                      onClick={() => {
                        setIsAddingCustomField(false);
                        setCustomValue('');
                        setCustomLabel('');
                        form.setValue('custom', {});
                        if (hasCustomValue) {
                          setIsRemovingCustomField(true);
                        }
                      }}
                      variant='outline'
                      size='sm'
                      type='button'
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
            onClick={() => {
              setIsAddingCustomField(true);
              if (isRemovingCustomField) {
                setIsRemovingCustomField(false);
              }
            }}
            variant='outline'
            size='sm'
            type='button'
          >
            Add custom field
          </Button>
        )}
        <DialogFooter>
          <Button
            type='button'
            variant={'ghost'}
            onClick={() => {
              setOpen(false);
              closeDialog();
            }}
          >
            Cancel
          </Button>
          <Button type='submit'>{user ? 'Save' : 'Create'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { User } from '../schema/user';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UserForm from './form';

// // Add user function
// async function addUser(newUser: User): Promise<User> {
//   const res = await fetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify(newUser),
//     headers: { 'Content-Type': 'application/json' },
//   });
//   if (!res.ok) throw new Error('Failed to add user');
//   return res.json();
// }

// // Edit user function
// async function updateUser({ id, ...formProps }: User): Promise<User> {
//   const res = await fetch(`/api/users/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(formProps),
//     headers: { 'Content-Type': 'application/json' },
//   });
//   if (!res.ok) throw new Error('Failed to update user');
//   return res.json();
// }

export default function UserDialog({
  open,
  setOpen,
  setUser,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUser: (user: User | undefined) => void;
  user: User | undefined;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add user</Button>
      </DialogTrigger>
      <DialogContent>
        <UserForm user={user} open={open} setOpen={setOpen} setUser={setUser} />
      </DialogContent>
    </Dialog>
  );
}

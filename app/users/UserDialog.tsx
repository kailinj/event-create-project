'use client';

import { Button } from '@/components/ui/button';
import { ActiveUser } from '../schema/user';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UserForm from './UserForm';

export default function UserDialog({
  open,
  setOpen,
  setUser,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUser: (user: ActiveUser) => void;
  user: ActiveUser;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val === false) {
          setUser(undefined);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className='mt-0'>Add user</Button>
      </DialogTrigger>
      <DialogContent>
        {open && (
          <UserForm
            user={user}
            open={open}
            setOpen={setOpen}
            setUser={setUser}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

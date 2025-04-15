import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useInviteAdminMutation } from '@/store/actions/users';
import { handleError } from '@/lib/errorHandler';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  names: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

type FormValues = z.infer<typeof formSchema>;

const InviteAdminDialog = () => {
  const [open, setOpen] = useState(false);
  const [inviteAdmin, { isLoading }] = useInviteAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await inviteAdmin(data).unwrap();
      reset();
      toast({ title: 'User invited successfully' });
      setOpen(false);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="justify-end ml-auto w-fit">Invite Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <Input placeholder="Names" {...register('names')} />
            {errors.names && (
              <p className="text-sm text-red-500 mt-1">
                {errors.names.message}
              </p>
            )}
          </div>
          <div>
            <Input placeholder="Email" type="email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Inviting...' : 'Invite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteAdminDialog;

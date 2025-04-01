/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock, CheckCircle, XCircle } from 'lucide-react';
import { useResetPasswordMutation } from '@/store/actions/users';
import { useToast } from '@/hooks/use-toast';

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (!token) {
      toast({ description: 'Invalid or missing token.' });
      router.push('/forgot-password');
    }
  }, [token, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.' });
      return;
    }

    try {
      if (token) {
        await resetPassword({ newPassword, token }).unwrap();
        toast({
          title: 'Success!',
          description: 'Password updated. You can log in now.',
        });
        router.push('/login');
      }
    } catch (error) {
      toast({
        description:
          (error as any)?.data?.message || 'Something went wrong. Try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full sm:w-96 p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-gray-500" />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Lock size={20} className="absolute left-3 top-3 text-gray-500" />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          {isSuccess && (
            <div className="mt-4 text-center text-green-600">
              <CheckCircle className="w-6 h-6 mx-auto" />
              <p className="text-sm">
                Password successfully reset.
              </p>
            </div>
          )}
          {isError && (
            <div className="mt-4 text-center text-red-600">
              <XCircle className="w-6 h-6 mx-auto" />
              <p className="text-sm">
                {(error as any)?.data?.message || 'Something went wrong.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;

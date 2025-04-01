/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, CheckCircle, XCircle } from 'lucide-react';
import { useForgotPasswordMutation } from '@/store/actions/users';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast({
        description: 'Check your email for reset link.',
      });
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
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail
                size={20}
                className="absolute text-sm left-3 top-3 text-gray-500"
              />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <p className="text-sm">Check your email for the reset link.</p>
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

export default ForgotPasswordPage;

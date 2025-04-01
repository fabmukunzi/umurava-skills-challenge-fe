'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { GoogleIcon2 } from '@/lib/images';
import { signIn } from 'next-auth/react';
import { homepageRoutes } from '@/lib/routes';
import { useSignupMutation } from '@/store/actions/users';
import { useRouter } from 'next/navigation';
import { SignupRequest } from '@/lib/types/user';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const { register, handleSubmit } = useForm<SignupRequest>();
  const [error, setError] = useState<string>('');
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();
    const { toast } = useToast();
  const onSubmit = async (data: SignupRequest) => {
    setError('');
    try {
      const result = await signup(data).unwrap();
      if (result) {
        toast({
          title: 'Account created successfully',
          description: 'Please check your email to verify your account.',
        });
      }
      router.push('/login');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as { data: { message?: string } };
        setError(apiError.data.message ?? 'An unknown error occurred');
      }
    } finally {
    }
  };

  const handleOAuthSignUp = async () => {
    setError('');
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  };

  return (
    <Card className="w-full max-w-md pb-6 border border-gray-400 rounded-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Sign Up as Talent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              {...register('names')}
              type="text"
              placeholder="Enter your full name"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              required
              className="mt-1"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="pb-4 flex flex-col space-y-2">
          <Button
            onClick={handleOAuthSignUp}
            className="w-full bg-primary/20 hover:bg-primary/30 text-black rounded-full flex items-center justify-center gap-2"
          >
            <Image
              className="w-5 h-5 mr-2"
              src={GoogleIcon2}
              alt="Google Icon"
            />
            Sign up with Google
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href={homepageRoutes.login.path} className="text-primary">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

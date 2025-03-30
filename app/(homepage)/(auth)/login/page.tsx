'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleIcon2 } from '@/lib/images';
import Image from 'next/image';
import Link from 'next/link';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');
console.log(data)
console.log(router)
    try {
      // const response = await fetch('http://localhost:5000/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.message || 'Login failed');
      // }

      // localStorage.setItem('token', result.token);
      // router.push('/dashboard');
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md pb-6 border border-gray-400 rounded-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Login as Talent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              required
              className="mt-1"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="pb-4 flex flex-col space-y-2">
          <Button
            onClick={handleOAuthSignIn}
            className="w-full bg-primary/20 hover:bg-primary/30 text-black rounded-full flex items-center justify-center gap-2"
          >
            <Image
              className="w-5 h-5 mr-2"
              src={GoogleIcon2}
              alt="Google Icon"
            />
            Sign in with Google
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

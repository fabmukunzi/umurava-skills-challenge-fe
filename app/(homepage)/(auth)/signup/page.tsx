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

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const { register, handleSubmit } = useForm<SignupForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (data: SignupForm) => {
    console.log(data)
    setLoading(true);
    setError('');

    try {
    //   const response = await fetch('http://localhost:5000/api/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();
    //   if (!response.ok) {
    //     throw new Error(result.message || 'Signup failed');
    //   }

    //   window.location.href = '/login';
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async () => {
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
        <CardTitle className="text-center text-2xl font-semibold">Sign Up as Talent</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              {...register('fullName')}
              type="text"
              placeholder="Enter your full name"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Email</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              required
              className="mt-1"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
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
            <Image className="w-5 h-5 mr-2" src={GoogleIcon2} alt="Google Icon" />
            Sign up with Google
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-primary">Login</Link>
        </p>
      </CardContent>
    </Card>
  );
}

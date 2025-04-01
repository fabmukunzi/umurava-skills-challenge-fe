'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react'; // Assuming you're using icons from Lucide
import { useVerifyEmailQuery } from '@/store/actions/users';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { homepageRoutes } from '@/lib/routes';
import { Button } from '@/components/ui/button';

const VerifyEmailPage = () => {
  const router = useRouter();
  const queryParam = useSearchParams();
  const token = queryParam.get('token');

  const { error, isLoading, isSuccess, isError } = useVerifyEmailQuery(
    token as string,
    {
      skip: !token,
    }
  );

  useEffect(() => {
    if (token && !isLoading) {
      if (isSuccess) {
        router.push(homepageRoutes.login.path);
      }
    }
  }, [token, isLoading, isSuccess, isError, error, router]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full sm:w-96">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Email Verification
          </CardTitle>
          <CardDescription className="text-gray-600">
            Please wait while we verify your email address.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isLoading && (
            <div className="text-center">
              <Loader2 className="animate-spin w-12 h-12 mx-auto text-primary mb-4" />
              <p className="text-lg text-gray-600">Verifying your email...</p>
            </div>
          )}

          {isSuccess && (
            <div className="text-center text-green-600">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">Success!</h2>
              <p className="text-lg">
                Your email has been successfully verified. You can now log in to
                your account.
              </p>
            </div>
          )}

          {isError && (
            <div className="text-center text-red-600">
              <XCircle className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">Oops!</h2>
              <p className="text-lg">
                Something went wrong. Please try again later or contact support
                if the issue persists.
              </p>
            </div>
          )}

          {(isError || isSuccess) && (
            <div className="text-center">
              <Button onClick={() => router.push('/')}>Go to Home</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;

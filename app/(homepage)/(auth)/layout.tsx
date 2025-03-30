'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-100 px-6 py-12 lg:px-20">
        <div className="hidden lg:flex flex-col justify-start mt-10 w-1/2 pr-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Outsource, Hire, Work with and Manage Africa&apos;s Vetted Talents &
            Teams
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex justify-center h-fit w-full lg:w-1/2">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}

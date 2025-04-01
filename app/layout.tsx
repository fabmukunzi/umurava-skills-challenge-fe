'use client';

import '@/assets/css/globals.css';
import '@/assets/css/embla.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <html lang="en">
          <body>
            <Suspense>{children}</Suspense>
            <Toaster />
          </body>
        </html>
      </SessionProvider>
    </Provider>
  );
}
